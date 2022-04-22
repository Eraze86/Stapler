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
    early: false,
    late: false,
  });

  //Hämtar värden på input som användaren väljer
  function handleCustomerChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
    let name: string = e.target.name;
    let numberSelected = parseInt(e.target.value)

    if(name !== "numberOfGuests"){
      setBookingEdits({...bookingEdits, [name]: e.target.value})
    } else {
      setBookingEdits({...bookingEdits, numberOfGuests: numberSelected})
    }
  }

  useEffect(() => {
    let earlyDinner = bookingService.dinnerEarly(props.bookings, bookingEdits.date, bookingEdits.numberOfGuests);
    let lateDinner = bookingService.dinnerLate(props.bookings, bookingEdits.date, bookingEdits.numberOfGuests);
    setDinnerTime({...dinnerTime, early: earlyDinner, late: lateDinner})

  }, [bookingEdits, bookingEdits.numberOfGuests])

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
        <Select name="numberOfGuests" onChange={handleCustomerChange} value={bookingEdits.numberOfGuests}><GuestSelect/></Select>

        <label>Tid</label>
        <div onClick={(e: any) => setBookingEdits({...bookingEdits, time: e.target.value})}>
          <DinnerTime early={dinnerTime.early} late={dinnerTime.late}/>
        </div>

        <Button onClick={saveEdits}>Spara</Button>
      </FormAdmin>
    </>
  )
}
