import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Bookings } from "../../modules/Bookings";
import { INewBooking } from "../../modules/INewBooking";

export function Booking() {
    const [newBooking, setNewBooking] = useState<INewBooking>({
        restaurantId: "624e9b46796a187bc28ceaef",
        date: "",
        time: "",
        numberOfGuests: 0,
        customer: { name: "", lastname: "", email: "", phone: "" },
    });
    const [booking, setBooking] = useState<Bookings[]>([])

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let name = e.target.name
        console.log(e.target.value)
        setNewBooking({ ...newBooking, [name]: e.target.value })
    }
    function handleClick(e: any){
        let name: string = e.target.name
        console.log(e.target.value)
        setNewBooking({ ...newBooking, [name]: e.target.value })
    }    
    function search() {
        
    }

    //hämta bokingsinformation
      useEffect(() => {
        axios
          .get<Bookings[]>(
            "https://school-restaurant-api.azurewebsites.net/booking/restaurant/:id"
          )
          .then((response) => {
            console.log(response.data);
            let bookings = response.data.map((booking: Bookings) => {
              return new Bookings(
                booking._id,
                booking.restaurantId,
                booking.date,
                booking.time,
                booking.numberOfGuests,
                booking.customerId
              );
            });
            setBooking(bookings)
          });
      }, []);



    return (
        <>
            <form>
                <label>Datum:</label>
                <br />
                <input type="date" name="date" onChange={handleChange}></input>
                <br />
                <label>Tid:</label>
                <input type="button" value="18:00" name="time" onClick={handleClick}></input>
                <input type="button" value="21:00" name="time" onClick={handleClick}></input>
                <br />

                Antal:
                <label>1</label>
                <input type="radio" value={1} name="numberOfGuest" onChange={handleChange}></input>
                <label>2</label>
                <input type="radio" value={2} name="numberOfGuest" onChange={handleChange}></input>
                <label>3</label>
                <input type="radio" value={3} name="numberOfGuest" onChange={handleChange}></input>
                <label>4</label>
                <input type="radio" value={4} name="numberOfGuest" onChange={handleChange}></input>
                <label>5</label>
                <input type="radio" value={5} name="numberOfGuest" onChange={handleChange}></input>
                <label>6</label>
                <input type="radio" value={6} name="numberOfGuest" onChange={handleChange}></input>

                <button onClick={search}>Sök</button>
            </form>
        </>
    );
}
