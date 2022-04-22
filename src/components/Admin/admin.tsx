import { useEffect, useState } from "react"
import { Bookings } from "../../modules/Bookings"
import { IBooking, ICustomer } from "../../modules/IBooking";
import { IDinnerTime } from "../../modules/IDinnerTime";
import { BookingsService } from "../services/BookingService";
import { CustomerService } from "../services/CustomerService";
import { ButtonAdmin, ButtonClose } from "../Styled/Button";
import { DivAdmin, DivBlur, DivBlurParent } from "../Styled/Div";
import { H1Booking, H3 } from "../Styled/Headings";
import { P, PId } from "../Styled/P";
import { SectionAdmin, SectionEditBooking } from "../Styled/Section";
import { Li, Ul, UlAdmin, UlAdminHeadings } from "../Styled/Ul";
import { EditBooking } from "./editBooking";

export function Admin(){
    let bookingService = new BookingsService();
    let customerService = new CustomerService();
    let customerArray: ICustomer[] = [];

    const standardBToChange: IBooking = {
        _id: "",
        restaurantId: "",
        date: "",
        time: "",
        numberOfGuests: 1,
        customerId: ""
    }

    const standardCToChange: ICustomer = {
        _id: "",
        name: "",
        lastname: "",
        email: "",
        phone: ""
    }

    const [bookings, setBookings ] = useState<Bookings[]>([]);
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const [bookingToChange, setBookingToChange] = useState<IBooking>(standardBToChange);
    const [customerToChange, setCustomerToChange] = useState<ICustomer>(standardCToChange);
    const [editorOpen, setEditorOpen] = useState<boolean>(false)
    const [ dinnerTime, setDinnerTime ] = useState<IDinnerTime>({
        early: false,
        late: false,
    });

    //Hämtar bokningar med restaurangId från skapad restaurang
    useEffect(() => {
        setEditorOpen(false)
        bookingService.getBookings()
        .then(response => {
            //Lägger in bokningarna från API i bookings
            setBookings(response)
        })
        .catch(error => {console.log("ERROR:", error)})
    },[])

    //Hämtar kunder baserat på restaurangens ordrars customerIds
    useEffect(() => {
        bookings.forEach((booking) => {
            customerService.getCustomer(booking.customerId)
            .then(response => {
                customerArray.push(response)
                setCustomers(customerArray.flat())
            })
            .catch(error => {console.log("ERROR:", error)})
        })
    }, [bookings])


    //Funktion som körs när man klickar på ändra en order.
    function editButtonClick(clickedBooking: Bookings){
        setEditorOpen(true)
        setBookingToChange(clickedBooking)
        let earlyDinner = bookingService.dinnerEarly(bookings, bookingToChange.date, bookingToChange.numberOfGuests);
        let lateDinner = bookingService.dinnerLate(bookings, bookingToChange.date, bookingToChange.numberOfGuests);
        setDinnerTime({...dinnerTime, early: earlyDinner, late: lateDinner})
    }

    //Sparar kund som är kopplad till order som ska ändras
    useEffect(() => {
        customers.find((customer) => {
            if(customer._id === bookingToChange.customerId){
                setCustomerToChange(customer)
            }
        })
    }, [bookingToChange])

    //Skriver ut alla bokningar med map, skapar en avboka knapp samt ändra bokning knapp
    let lis = bookings
        .sort((a,b) => parseInt(a.date[2] + a.date[3] + a.date[5] + a.date[6] + a.date[8] + a.date[9]) - parseInt(b.date[2] + b.date[3] + b.date[5] + b.date[6] + b.date[8] + b.date[9]))
        .map((booking) => {
            let customer = customers.find((customer) => {
                if(booking.customerId === customer._id){
                    return customer
                }}
            )

            let bookingDate = new Date(booking.date).toLocaleDateString('Sv-SE', { weekday: "short", month: "short", day: "numeric" })

            return (
            <Li key={booking._id}>
                <UlAdmin>
                    <li>{booking._id}</li>
                    <li>{customer?.lastname}, {customer?.name}</li>
                    <li>{ bookingDate }</li>
                    <li>{booking.time}</li>
                    <li>{booking.numberOfGuests}</li>
                    <li><div>
                        <ButtonAdmin onClick={() => bookingService.deleteBooking(booking._id)}>Avboka</ButtonAdmin>
                        <ButtonAdmin onClick={() => {editButtonClick(booking)}}>Ändra</ButtonAdmin>
                    </div></li>
                </UlAdmin>
            </Li>
        )
    });


    //Stänger redigerings-box
    function closeEditSection(){
        setEditorOpen(false)
        setCustomerToChange(standardCToChange)
        setBookingToChange(standardBToChange)
    }

    return (<DivBlurParent>
        <DivAdmin>
        <H1Booking>Bokningar</H1Booking>
        </DivAdmin>
        <SectionAdmin>
            <UlAdminHeadings>
                <li>BokningsId</li>
                <li>Efternamn, Förnamn</li>
                <li>Datum</li>
                <li>Tid</li>
                <li>Antal</li>
            </UlAdminHeadings>
            {bookings.length > 0 ? <Ul>{lis}</Ul> : <P>Det finns tyvärr inga bokningar..</P>}
        </SectionAdmin>

        {editorOpen &&
        <DivBlur>
            <SectionEditBooking>
                <ButtonClose onClick={closeEditSection}>X</ButtonClose>
                <EditBooking booking={bookingToChange} customer={customerToChange} dinnerTime={dinnerTime} bookings={bookings} />
            </SectionEditBooking>
        </DivBlur>  }
    </DivBlurParent>)
}