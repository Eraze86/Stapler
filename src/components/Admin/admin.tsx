import axios from "axios";
import { useEffect, useState } from "react"
import { Bookings } from "../../modules/Bookings"
import { IBooking } from "../../modules/IBooking";
import { deleteBooking } from "../services/Bookings";
import { DivAdmin } from "../Styled/Div";
import { H1Booking } from "../Styled/Headings";
import { P } from "../Styled/P";
import { Section } from "../Styled/Section";
import { Li, Ul } from "../Styled/Ul";
import { EditBooking } from "./editBooking";

export function Admin(){
    const [bookings, setBookings ] = useState<Bookings[]>([]);
    const [bookingToChange, setBookingToChange] = useState<IBooking>(Object);
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
            return (<Li key={booking._id}>
                <h3>Boknings id: {booking._id}</h3>
                <P>Datum: {booking.date}</P>
                <P>Tid: {booking.time}</P>
                <P>Antal gäster: {booking.numberOfGuests}</P>
                <button onClick={() => deleteBooking(booking._id)}>Avboka</button>
                <button onClick={() => {editButtonClick(booking)}}>Ändra</button>
            </Li>)
    });

    return (<>
        <DivAdmin>
        <H1Booking>Bokningar</H1Booking>
        </DivAdmin>
            <Section>
           
            {bookings.length > 0 ? <Ul>{lis}</Ul> : <P>Det finns tyvärr inga bokningar..</P>}
            </Section>
           
        {editorOpen ?  <EditBooking booking={bookingToChange} /> : <></>}
    </>)
}