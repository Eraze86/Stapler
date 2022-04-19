import axios from "axios";
import { useEffect, useState } from "react"
import { Bookings, Customer } from "../../modules/Bookings"
import { IBooking, ICustomer } from "../../modules/IBooking";
import { deleteBooking } from "../services/Bookings";
import { EditBooking } from "./editBooking";

export function Admin(){
    const [bookings, setBookings ] = useState<Bookings[]>([]);
    const [bookingToChange, setBookingToChange] = useState<IBooking>(Object);
    const [customerToChange, setCustomerToChange] = useState<ICustomer>(Object);
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

    function editButtonClick(clickedBooking: Bookings){
        /*axios.get<Customer[]>("https://school-restaurant-api.azurewebsites.net/customer/" + clickedBooking.customerId)
        .then(response => {
            let dataFromApi = response.data.map((customer: Customer) => {
                return new Customer(customer._id, customer.name, customer.lastname, customer.email, customer.phone)
            })
            setCustomerToChange(dataFromApi[0])
        })*/

        bookings.find((booking) => {
            if(booking._id === clickedBooking._id){
                setBookingToChange(booking)
            }
        })
        setEditorOpen(true)
    }

    //Skriver ut alla bokningar med map, skapar en avboka knapp samt ändra bokning knapp
    let lis = bookings
        .sort((a,b) => parseInt(a.date[2] + a.date[3] + a.date[5] + a.date[6] + a.date[8] + a.date[9]) - parseInt(b.date[2] + b.date[3] + b.date[5] + b.date[6] + b.date[8] + b.date[9]))
        .map((booking) => {
            return (<li key={booking._id}>
                <h3>Boknings id: {booking._id}</h3>
                <p>Datum: {booking.date}</p>
                <p>Tid: {booking.time}</p>
                <p>Antal gäster: {booking.numberOfGuests}</p>
                <button onClick={() => deleteBooking(booking._id)}>Avboka</button>
                <button onClick={() => {editButtonClick(booking)}}>Ändra</button>
            </li>)
    });

    return (<>
        <div>
            <h1>Bokningar</h1>
            {bookings.length > 0 ? <ul>{lis}</ul> : <p>Det finns tyvärr inga bokningar..</p>}
        </div>
        {editorOpen ?  <EditBooking booking={bookingToChange} customer={customerToChange} /> : <></>}
    </>)
}