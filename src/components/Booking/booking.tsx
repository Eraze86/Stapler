import { ChangeEvent, useEffect, useState } from "react";
import { Bookings } from "../../modules/Bookings";
import { INewBooking, INewCustomer } from "../../modules/INewBooking";
import { BookingsService } from "../services/BookingService";
import { BookingSection } from "../Styled/Section";
import bookingImg from "../../img/bookingPage.jpg";
import { Form } from "../Styled/Form";
import { H1Booking } from "../Styled/Headings";
import { Button } from "../Styled/Link";

export function Booking() {
  let bookingService = new BookingsService();

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

  const [searchTimeClicked, setSearchTimeClicked] = useState(false);
  const [bookingSite, setBookingSite] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [gprdCheckBox, setGprdCheckBox] = useState(false);

  //hämta befintlig bokingsinformation
  useEffect(() => {
    bookingService.getBookings().then((bookings) => {
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
      setBookingSite(true)
    })
  }, []);

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

  // hämtar kundens valda datum och tid och sparar om i newBooking
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let name: string = e.target.name
    setNewBooking({ ...newBooking, [name]: e.target.value })
  }

  function handleSelect(e: ChangeEvent<HTMLSelectElement>){
    let numberSelected = parseInt(e.target.value)
    setNewBooking({...newBooking, numberOfGuests: numberSelected})
  }

   //hämtar tiden och lägger in i newBookings
   const [searchBtnClicked, setSearchBtnClicked] = useState(false);

   function handleClick(e: any) {
    let name: string = e.target.name
    console.log(e.target.value)
    setNewBooking({ ...newBooking, [name]: e.target.value })
    setSearchTimeClicked(true)
    setSearchBtnClicked(false);
  }
   // hämtar kundens information och spara i costumer
  function handlecostumer(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.name
    setCustomer({ ...customer, [name]: e.target.value })
  }

  function searchBtn() {
    setBookingSite(false)
    setSearchBtnClicked(true)
    dinnerEarly()
    dinnerLate()
  }

  let earlyDinner: Bookings[] = [];
  let lateDinner: Bookings[] = [];

  const [ eatEarly, setEatEarly ] = useState(false);

  /*checkDinnerTime()
  function checkDinnerTime(){
    let bookedOnDate = bookings.filter((booking) => {
      if(newBooking.date === booking.date)
      return booking
    });

    bookedOnDate.forEach((booking) => {
      if(booking.time === "18:00"){
        earlyDinner.push(booking)
      } else {
        lateDinner.push(booking)
      }
    });

    if(earlyDinner.length < 15){
      setEatEarly(true)
    }
    if(lateDinner.length < 15){
      setEatLate(true)
    }
  }*/

  function dinnerEarly(){
      //Går igenom alla bokningar för restaurangen
      for (let i = 0; i < bookings.length; i++) {
          //Kollar om användarens datum matchar med någon/några av restaurangens bokningar
          if(newBooking.date === bookings[i].date){
              //Kollar hur många av dessa datum som har tiden 18:00
              if(bookings[i].time === "18:00"){
                  //Lägger in dessa bokningar i en ny array
                  earlyDinner.push(bookings[i]);

                  //Om arrayen är mindre än 15 betyder det att det finns minst 1 bord ledigt den tiden
                  if(earlyDinner.length < 15) {
                      console.log("DET FINNS BORD KL 18");
                      setEatEarly(true);
                  } else {
                      console.log("DET FINNS INTE BORD KL 18");
                      setEatEarly(false);
                      return;
                  }
              }
          } else if(bookings[i].time === "18:00") {
              setEatEarly(true);
              console.log("FINNS 18");
          }
      }
  }

const [ eatLate, setEatLate ] = useState(false);
    function dinnerLate(){
        for (let i = 0; i < bookings.length; i++) {
            if(newBooking.date === bookings[i].date){
                if(bookings[i].time === "21:00"){
                    lateDinner.push(bookings[i]);
                    if(lateDinner.length < 15) {
                        console.log("DET FINNS BORD KL 21");
                        setEatLate(true);
                    } else {
                        console.log("DET FINNS INTE BORD KL 21");
                        setEatLate(false);
                        return;
                    }
                }
            } else if(bookings[i].time === "21:00") {
                setEatLate(true);
                console.log("FINNS 21");
            }
        }
    }
function cancel(){
  setBookingSite(true)
  setSearchBtnClicked(false)
  setSearchTimeClicked(true)
}

   function checkGprd() {
    setNewBooking({ ...newBooking, customer: customer });
    setSearchTimeClicked(false)
    setGprdCheckBox(true)

   }

    function reserve(){
      setGprdCheckBox(false)
      setBookingConfirmed(true)
      bookingService.createCustomer(customer)
      bookingService.createBooking(newBooking)
    }

  return (
    <>
      <H1Booking>Boka Bord</H1Booking>

      <BookingSection>
        <Form>
        <img src={bookingImg} alt="Plate with tomatoes and burrata. Credit: Pinar Kucuk" />
        {bookingSite && <>
          <label>Datum:</label>

          <input type="date" name="date" onChange={handleChange}></input>
          <br />

          Antal:
          <select name="numberOfGuests" onChange={handleSelect} value={newBooking.numberOfGuests}><NumberOptions/></select>

        <Button onClick={searchBtn}>Sök</Button></>}

      {searchBtnClicked && <div>
        <label>Tid:</label>
          <input type="button" value="18:00" name="time" onClick={handleClick}></input>
          <input type="button" value="21:00" name="time" onClick={handleClick}></input>
          <br />

        <Button onClick={cancel}>Avbryt</Button>
        </div>}

        {searchTimeClicked && <>
          <label>Förnamn</label>
          <input type="text" name="name" value={customer.name} onChange={handlecostumer}></input><br/>
          <label>Efternamn</label>
          <input type="text" name="lastname" value={customer.lastname} onChange={handlecostumer}></input><br/>
          <label>Email</label>
          <input type="text" name="email" value={customer.email} onChange={handlecostumer}></input><br/>
          <label>Telefonnr:</label>
          <input type="text" name="phone" value={customer.phone} onChange={handlecostumer}></input><br/>

        <Button onClick={checkGprd}>Reservera</Button>
        <Button onClick={cancel}>Avbryt</Button>

          </>}
          {gprdCheckBox &&  <>
            Godkänner du Gprd?<input type ="checkbox"></input>
          <Button onClick={reserve}>Godkänn</Button>
          </>}
          {bookingConfirmed && <div>Bokning genomförd</div>}

            </Form>
        </BookingSection>
    </>
  );
}
