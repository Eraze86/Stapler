import { ChangeEvent, MouseEvent, useState } from "react"
import { BookingChanges } from "../../modules/ChangeBooking"
import { IBookingProps } from "../../modules/IBookingsProps"
import { GuestSelect } from "../GuestSelect/GuestSelect"
import { BookingsService } from "../services/BookingService"
import { Button } from "../Styled/Button"
import { Form, Input, Select } from "../Styled/Form"

export const EditBooking = (props: IBookingProps) => {
  let bookingService = new BookingsService();

  const [bookingEdits, setBookingEdits] = useState<BookingChanges>({
    date: props.booking.date,
    time: props.booking.time,
    numberOfGuests: props.booking.numberOfGuests,
  });

  function handleCustomerChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
    let name: string = e.target.name;
    let numberSelected = parseInt(e.target.value)

    if(name != "numberOfGuests"){
      setBookingEdits({...bookingEdits, [name]: e.target.value})
    } else {
      setBookingEdits({...bookingEdits, numberOfGuests: numberSelected})
    }
  }

  function saveEdits(e: MouseEvent<HTMLButtonElement>){
    bookingService.updateBooking(props.booking._id, bookingEdits, props.booking.customerId);
  }

  return(
      <Form>
        <label>Datum</label>
        <Input type="date" name="date" defaultValue={props.booking.date} onChange={handleCustomerChange}></Input>
        <label>Tid</label>
        <Select name="time" defaultValue={props.booking.time} onChange={handleCustomerChange}>
          <option>18:00</option>
          <option>21:00</option>
        </Select>
        <label>Storlek på sällskap</label>
        <Select name="numberOfGuests" onChange={handleCustomerChange} value={bookingEdits.numberOfGuests}><GuestSelect/></Select>

        <Button onClick={saveEdits}>Spara</Button>
      </Form>
  )
}
