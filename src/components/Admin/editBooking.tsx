import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import { BookingChanges } from "../../modules/ChangeBooking"
import { IBookingProps } from "../../modules/IBookingsProps"
import { IDinnerTime } from "../../modules/IDinnerTime"
import { DinnerTime } from "../DinnerTime/DinnerTime"
import { GuestSelect } from "../GuestSelect/GuestSelect"
import { BookingsService } from "../services/BookingService"
import { Button } from "../Styled/Button"
import { FormAdmin, Input, Select } from "../Styled/Form"

export const EditBooking = (props: IBookingProps) => {
  let bookingService = new BookingsService();

  const standardProps = new BookingChanges(
    props.booking.date,
    props.booking.time,
    props.booking.numberOfGuests,
  )

  const [bookingEdits, setBookingEdits] = useState<BookingChanges>(standardProps);

  const [dinnerTime, setDinnerTime] = useState<IDinnerTime>({
    early: props.dinnerTime.early,
    late: props.dinnerTime.late
  });

  useEffect(() => {
    let dinner = bookingService.checkTables(props.earlyBookings, props.lateBookings, bookingEdits.date, bookingEdits.numberOfGuests)
    setDinnerTime({...dinnerTime, early: dinner.early, late: dinner.late})
  },[bookingEdits])

  //Hämtar värden på input som användaren väljer
  function handleCustomerChange(e: ChangeEvent<HTMLInputElement>){
    let name: string = e.target.name;
    setBookingEdits({...bookingEdits, [name]: e.target.value})
  }

  function handleSelect(e: ChangeEvent<HTMLSelectElement>){
    let numberSelected = parseInt(e.target.value)
    setBookingEdits({...bookingEdits, numberOfGuests: numberSelected})
  }

  //Uppdaterar bokningen med funktionen updateBooking i tjänsten bookingService
  function saveEdits(e: MouseEvent<HTMLButtonElement>){
    bookingService.updateBooking(props.booking._id, bookingEdits, props.booking.customerId);
  }

  return(<>
      <p>{props.customer.name} {props.customer.lastname}</p>
      <p>{props.customer.email} <br/> {props.customer.phone}</p>
      <FormAdmin>
        <label>Datum</label>
        <Input type="date" name="date" defaultValue={props.booking.date} onChange={handleCustomerChange}></Input>
        <label>Storlek på sällskap</label>
        <Select name="numberOfGuests" onChange={handleSelect} value={bookingEdits.numberOfGuests}><GuestSelect/></Select>

        <label>Tid</label>
        <div onClick={(e: any) => setBookingEdits({...bookingEdits, time: e.target.value})}>
          <DinnerTime early={dinnerTime.early} late={dinnerTime.late}/>
        </div>

        <Button onClick={saveEdits}>Spara</Button>
      </FormAdmin>
    </>
  )
}
