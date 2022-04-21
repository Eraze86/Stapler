import axios from "axios";
import { useEffect, useState } from "react"
import { Bookings, Customer } from "../../modules/Bookings"
import { IBooking, ICustomer } from "../../modules/IBooking";
import { BookingsService } from "../services/BookingService";
import { CustomerService } from "../services/CustomerService";
import { Button, ButtonClose } from "../Styled/Button";
import { DivAdmin, DivBlur, DivBlurParent } from "../Styled/Div";
import { H1Booking } from "../Styled/Headings";
import { P } from "../Styled/P";
import { Section, SectionEditBooking } from "../Styled/Section";
import { Li, Ul } from "../Styled/Ul";
import { EditBooking } from "./editBooking";

export function Admin(){
    let bookingService = new BookingsService();
    let customerService = new CustomerService();
    let customerArray: Customer[] = [];

    const [bookings, setBookings ] = useState<IBooking[]>([]);
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const [bookingToChange, setBookingToChange] = useState<IBooking>(Object);
    const [customerToChange, setCustomerToChange] = useState<ICustomer>(Object)
    const [editorOpen, setEditorOpen] = useState<boolean>(false)

    useEffect(() => {
        //Hämtar bokningar med restaurangId från skapad restaurang
        axios.get<Bookings[]>('https://school-restaurant-api.azurewebsites.net/booking/restaurant/624e9b46796a187bc28ceaef')
            .then(response => {
                let dataFromApi = response.data.map((booking: Bookings) => {
                    return new Bookings(booking._id, booking.restaurantId, booking.date, booking.time, booking.numberOfGuests, booking.customerId);
                });

                //Lägger in bokningarna från API i bookings
                setBookings(dataFromApi);
            })
            .catch(error => {console.log("ERROR:", error)})
    },[])

    useEffect(() => {
        bookings.forEach((booking) => {
            customerService.getCustomer(booking.customerId)
            .then(response => {
                response.map((res) => {
                    customerArray.push(res)
                    setCustomers(customerArray)
                })
            })
        })
    }, [])


    function editButtonClick(clickedBooking: Bookings){
        bookings.find((booking) => {
            if(booking._id === clickedBooking._id){
                setBookingToChange(booking);

                customers.find((customer) => {
                    if(customer._id === bookingToChange.customerId){
                        setCustomerToChange(customer)
                    }
                })
            }
        })
        setEditorOpen(true)
    }


    //Skriver ut alla bokningar med map, skapar en avboka knapp samt ändra bokning knapp
    let lis = bookings
        .sort((a,b) => parseInt(a.date[2] + a.date[3] + a.date[5] + a.date[6] + a.date[8] + a.date[9]) - parseInt(b.date[2] + b.date[3] + b.date[5] + b.date[6] + b.date[8] + b.date[9]))
        .map((booking) => {
            return (<Li key={booking._id}>
                <h3>Boknings id: {booking._id}</h3>
                <P>Datum: {booking.date}</P>
                <P>Tid: {booking.time}</P>
                <P>Antal gäster: {booking.numberOfGuests}</P>
                <div>
                    <Button onClick={() => bookingService.deleteBooking(booking._id)}>Avboka</Button>
                    <Button onClick={() => {editButtonClick(booking)}}>Ändra</Button>
                </div>
            </Li>)
    });

    function closeEditSection(){
        setEditorOpen(false)
    }

    return (<DivBlurParent>
        <DivAdmin>
        <H1Booking>Bokningar</H1Booking>
        </DivAdmin>
        <Section>
            {bookings.length > 0 ? <Ul>{lis}</Ul> : <P>Det finns tyvärr inga bokningar..</P>}
        </Section>

        {editorOpen &&
        <DivBlur>
            <SectionEditBooking>
                <ButtonClose onClick={closeEditSection}>X</ButtonClose>
                <EditBooking booking={bookingToChange} customer={customerToChange} />
            </SectionEditBooking>
        </DivBlur>  }
    </DivBlurParent>)
}