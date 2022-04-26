import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import { Bookings } from "../../modules/Bookings"
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
    console.log(props.earlyBookings, props.lateBookings);

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

  let earlyDinner: Bookings[] = [];
    let lateDinner: Bookings[] = [];
    let totalGuests = 0;
    let chairsLeft = 0;

    const [ searchBtn, setSearch ] = useState(false);
    function search(){
      setSearch(true);
        dinnerEarly();
        dinnerLate();
    }

    //Funktion för att se om det finns lediga tider kl 18:00
    const [ eatEarly, setEatEarly ] = useState(false);
    function dinnerEarly(){  
      bookingService.getBookings().then((data) => {
        //Går igenom alla bokningar för restaurangen
        for (let i = 0; i < data.length; i++) {
            console.log("1", i);
            //Kollar om användarens datum matchar med någon/några av restaurangens bokningar
            console.log(bookingEdits.date);
            console.log("HEJ", data[i].date);
            
            
            if(bookingEdits.date === data[i].date){
                //Kollar hur många av dessa datum som har tiden 18:00
                if(bookingEdits.time === data[i].time){
                    //Lägger in dessa bokningar i en ny array
                    earlyDinner.push(data[i]);
                    totalGuests += data[i].numberOfGuests;
                    chairsLeft = 90 - totalGuests;
                    console.log(totalGuests);
                    console.log(chairsLeft);
                    console.log(bookingEdits.numberOfGuests);
                    
                    
                    
                    //Om arrayen är mindre än 15 betyder det att det finns minst 1 bord ledigt den tiden
                    if(earlyDinner.length < 3 && (bookingEdits.numberOfGuests <= chairsLeft)) {
                        console.log("DET FINNS BORD KL 18");
                        setEatEarly(true);
                    } else {
                        console.log("DET FINNS INTE BORD KL 18");
                        setEatEarly(false);
                        return;
                    }
                } else {
                    setEatEarly(true);
                }
            } 
        }
      })
    }

    //Funktion för att kolla om det finns lediga tider kl 21:00, samma som dinnerEarly() fast 21:00
    const [ eatLate, setEatLate ] = useState(false);
    function dinnerLate(){
      bookingService.getBookings().then((data) => {
        for (let i = 0; i < data.length; i++) {
            if(bookingEdits.date === data[i].date){
                if(bookingEdits.time === data[i].time){
                    lateDinner.push(data[i]);
                    totalGuests += data[i].numberOfGuests;
                    chairsLeft = 90 - totalGuests;
                    
                    if(lateDinner.length < 3 && (bookingEdits.numberOfGuests <= chairsLeft)) {
                        console.log("DET FINNS BORD KL 21");
                        setEatLate(true);
                    } else {
                        console.log("DET FINNS INTE BORD KL 21");
                        setEatLate(false);
                    }
                } else {
                    setEatLate(true);
                } 
            }
        }
      })
    }

  //Uppdaterar bokningen med funktionen updateBooking i tjänsten bookingService
  function saveEdits(e: MouseEvent<HTMLButtonElement>){
    bookingService.updateBooking(props.booking._id, bookingEdits, props.booking.customerId);
  }

  console.log("L", eatLate);
    console.log("E",eatEarly);

  return(<>
      <p>{props.customer.name} {props.customer.lastname}</p>
      <p>{props.customer.email} <br/> {props.customer.phone}</p>
      <FormAdmin>
        <label>Datum</label>
        <Input type="date" name="date" defaultValue={props.booking.date} onChange={handleCustomerChange}></Input>
        <label>Storlek på sällskap</label>
        <Select name="numberOfGuests" onChange={handleSelect} value={bookingEdits.numberOfGuests}><GuestSelect/></Select>

        <label>Tid</label>
        <Select name="time" defaultValue={props.booking.time} onChange={handleCustomerChange}>
          <option>18:00</option>
          <option>21:00</option>
        </Select>

        <Button onClick={search} type="button">Sök</Button>
        {!eatEarly && !eatLate && searchBtn && <p>Tyvärr fullbokat</p>}
        {(eatEarly || eatLate) && <Button onClick={saveEdits}>Spara</Button>}
      </FormAdmin>
    </>
  )
}
