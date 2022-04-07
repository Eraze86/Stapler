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

  function handleChange(e:ChangeEvent<HTMLInputElement> ){
let name = e.target.name
setBooking({...booking, [name]:e.target.value})
  }
  //hämta bokingsinformation
//   useEffect(() => {
//     axios
//       .get<Bookings[]>(
//         "https://school-restaurant-api.azurewebsites.net/booking/restaurant/:id"
//       )
//       .then((response) => {
//         console.log(response.data);
//         let bookings = response.data.map((booking: Bookings) => {
//           return new Bookings(
//             booking.id,
//             booking.restaurantId,
//             booking.date,
//             booking.time,
//             booking.numberOfGuests,
//             booking.customerId
//           );
//         });
//       });
//   }, []);

  function search() {
    console.log("nu söker vi");
  }

  return (
    <>
      <form>
        <label>Datum:</label>
        <br />
        <input type="date" ></input>
        <br />
        <label>Tid:</label>
        <select>
          <option value="option1">18:00</option>
          <option value="option2">21:00</option>
        </select>
        <br />
        <label>Antal:</label>
        <select>
          <option value={1} name="numberOfGuest" onChange={handleChange}>1</option>
          <option value={2} name="numberOfGuest" onChange={handleChange}>2</option>
          <option value={3} name="numberOfGuest" onChange={handleChange}>3</option>
          <option value={4} name="numberOfGuest" onChange={handleChange}>4</option>
          <option value={5} name="numberOfGuest" onChange={handleChange}>5</option>
          <option value={6} name="numberOfGuest" onChange={handleChange}>6</option>
        </select>
        <button onClick={search}>Sök</button>
      </form>
    </>
  );
}
