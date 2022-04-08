import axios from "axios";
import { useEffect, useState } from "react"
import { Bookings } from "../../modules/Bookings"

export function Admin(){
    const [bookings, setBookings ] = useState<Bookings[]>([]);

    useEffect(() => {
        //Hämtar bokningar med restaurangId från skapad restaurang
        axios.get<Bookings[]>('https://school-restaurant-api.azurewebsites.net/booking/restaurant/624e9b46796a187bc28ceaef')
            .then(response => {
                console.log(response.data);
                let dataFromApi = response.data.map((booking: Bookings) => {
                    return new Bookings(booking._id, booking.restaurantId, booking.date, booking.time, booking.numberOfGuests, booking.customerId);
                });

                //Lägger in bokningarna från API i bookings
                setBookings(dataFromApi);
            })
            .catch(error => {console.log("ERROR:", error)})
    })

    //Funktion för att radera/avboka en bokning, genom API delete och skickar med id på bokningen
    function deleteBooking(id: string){
        axios.delete<Bookings>('https://school-restaurant-api.azurewebsites.net/booking/delete/' + id)
            .then(response => {
                console.log(response.data);
                //Laddar om sidan för att bokningen ska försvinna
                window.location.reload();
            })
            .catch(error => {console.log(error);});
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
            </li>)
    });

    return (<>
        <div>
            <h1>Bokningar</h1>
            {bookings.length > 0 ? <ul>{lis}</ul> : <p>Det finns tyvärr inga bokningar..</p>}
        </div>
    </>)
}