import axios from "axios"
import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import { BookingChanges } from "../../modules/ChangeBooking"
import { IBookingProps } from "../../modules/IBookingsProps"
import { BookingsService } from "../services/BookingService"

export const EditBooking = (props: IBookingProps) => {
  let bookingService = new BookingsService();
  const [bookingEdits, setBookingEdits] = useState<BookingChanges>({
    date: props.booking.date,
    time: props.booking.time,
    numberOfGuests: props.booking.numberOfGuests,
  });

   //select-lista med nummer
   const NumberOptions = () => {
    let minGuests = 0;
    let list: number[] = []

    while (minGuests<90){
      minGuests += 1;
      list.push(minGuests)
    }

    let options = list.map((lis, i) => {
      return(<option key={i}>{lis}</option>)
    })

    return(<>{options}</>)
  }

  function handleSelect(e: ChangeEvent<HTMLSelectElement>){
    let numberSelected = parseInt(e.target.value)
    setBookingEdits({...bookingEdits, numberOfGuests: numberSelected})
  }

  function handleCustomerChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
    let name: string | number = e.target.name;
    setBookingEdits({...bookingEdits, [name]: e.target.value})
  }

  function saveEdits(e: MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    bookingService.updateBooking(props.booking._id, bookingEdits, props.booking.customerId);
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
      <select onChange={handleSelect} value={bookingEdits.numberOfGuests}><NumberOptions/></select>

      <button onClick={saveEdits}>Spara</button>
    </form>
  )
}
