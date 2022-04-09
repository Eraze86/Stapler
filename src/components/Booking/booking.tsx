
import { ChangeEvent, useEffect, useState } from "react";
import { Bookings } from "../../modules/Bookings";
import { INewBooking, INewCustomer } from "../../modules/INewBooking";
import { GetBookingsService } from "../services/getBookings";

export function Booking() {

  const [customer, setCustomer] = useState<INewCustomer>({
    name: "",
    lastname: "",
    email: "",
    phone: ""
});
    const [newBooking, setNewBooking] = useState<INewBooking>({
        restaurantId: "624e9b46796a187bc28ceaef",
        date: "",
        time: "",
        numberOfGuests: 0,
        customer: customer,
    });

    const [bookings, setBookings] = useState<Bookings[]>([])

        //hämta befintlig bokingsinformation
        useEffect(() => {
          let service = new GetBookingsService();
          service.getBookings().then((bookings) => {
            let data = bookings.map((booking: Bookings) => {
              return new Bookings(
                booking._id,
                booking.restaurantId,
                booking.date,
                booking.time,
                booking.numberOfGuests,
                booking.customerId
              );
            });
            setBookings(data)
          })  
        }, []);
   
// hämtar kundens valda datum och tid och sparar om i newBooking
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let name = e.target.name
        console.log(e.target.value)
        setNewBooking({ ...newBooking, [name]: e.target.value })
        console.log("ny bookning",newBooking)
    }
    // hämtar kundens valda antal gäster och sparar om i newBooking
    function handleClick(e: any){
        let name: string = e.target.name
        console.log(e.target.value)
        setNewBooking({ ...newBooking, [name]: e.target.value })
    }  

    let booker: Bookings[] = [];
    //vid sökning jämför kundens val med befintliga bookingar  
    function search() {
      console.log("wiii")
      for (let i = 0; i < bookings.length; i++) {
        console.log(bookings[i])
        //om datumet finns i bokning redan
        if(newBooking.date === bookings[i].date){
             //om tiden finns i bokning redan
        if(newBooking.time === bookings[i].time){ 
          booker.push(bookings[i])
          console.log(bookings[i])
         } else{
          console.log("funkade ej")
          }
          // if(bookings.length > 15){
          // }else{
          // }
        }
      }   
    }

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
         <div>{booker}</div>
        </>
    );
}
