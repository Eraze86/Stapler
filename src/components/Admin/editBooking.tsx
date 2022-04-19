import axios from "axios"
import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import { IBooking } from "../../modules/IBooking"
import { IBookingProps } from "../../modules/IBookingsProps"

export const EditBooking = (props: IBookingProps) => {
  const [booking, setBooking] = useState<IBooking>({
    _id: props.booking._id,
    restaurantId: props.booking.restaurantId,
    date: props.booking.date,
    time: props.booking.time,
    numberOfGuests: props.booking.numberOfGuests,
    customerId: props.booking.customerId
  })

  const [bookingEdits, setBookingEdits] = useState<Object>({
    date: props.booking.date,
    time: props.booking.time,
    numberOfGuests: props.booking.numberOfGuests,
  })

  function handleCustomerChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
    let name = e.target.name
    setBookingEdits({...bookingEdits, [name]: e.target.value})
  }

  function saveEdits(e: MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    saveChangedBooking()
  }

  //Ändra existerande bokning med axios.update
  function saveChangedBooking(){
    axios.put('https://school-restaurant-api.azurewebsites.net/booking/update/' + booking._id, {bookingEdits}, {headers:{'Content-Type': 'application/json'}})
    .then((response) => {
        console.log(response.data);
        //window.location.reload();
    })
    .catch(error => { console.log(error)}
    );
  }

  return(
    <form>
      <label>Datum</label>
      <input type="date" name="date" defaultValue={props.booking.date} onChange={handleCustomerChange}></input>
      <label>Tid</label>
      <select defaultValue={props.booking.time} onChange={handleCustomerChange}>
        <option>18:00</option>
        <option>21:00</option>
      </select>
      <label>Storlek på sällskap</label>
      <input type="number" name="numberOfGuests" defaultValue={props.booking.numberOfGuests} onChange={handleCustomerChange}></input>

      <button onClick={saveEdits}>Spara</button>
    </form>
  )
}
