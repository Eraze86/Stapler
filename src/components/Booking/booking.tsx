import { ChangeEvent, useEffect, useState } from "react";
import { Bookings } from "../../modules/Bookings";
import { INewBooking, INewCustomer } from "../../modules/INewBooking";
import { CreateBooking, CreateCustomer, GetBookingsService } from "../services/Bookings";
import { BookingSection } from "../Styled/Section";
import bookingImg from "../../img/bookingPage.jpg";
import { Form } from "../Styled/Form";

import { H1Booking } from "../Styled/Headings";
import axios from "axios";


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

  const [searchTimeClicked, setSearchTimeClicked] = useState(false);
  const [bookingSite, setBookingSite] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [gprdCheckBox, setGprdCheckBox] = useState(false);

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
      setBookingSite(true)
    })
  }, []);

  // hämtar kundens valda datum och tid och sparar om i newBooking
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.name
    console.log(e.target.value)
    setNewBooking({ ...newBooking, [name]: e.target.value })
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
    console.log(e.target.value)
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
      CreateCustomer(customer)
      CreateBooking(newBooking)
    }

  return (
    <>
      <H1Booking>Boka Bord</H1Booking>

      <BookingSection>
        <img src={bookingImg} alt="Plate with tomatoes and burrata. Credit: Pinar Kucuk" />
        {bookingSite && <> <Form>
          <label>Datum:</label>
  
          <input type="date" name="date" onChange={handleChange}></input>
          <br />

          Antal:
          <label>1</label>
          <input type="radio" value="1" name="numberOfGuests" onChange={handleChange}></input>
          <label>2</label>
          <input type="radio" value="2" name="numberOfGuests" onChange={handleChange}></input>
          <label>3</label>
          <input type="radio" value="3" name="numberOfGuests" onChange={handleChange}></input>
          <label>4</label>
          <input type="radio" value="4" name="numberOfGuests" onChange={handleChange}></input>
          <label>5</label>
          <input type="radio" value="5" name="numberOfGuests" onChange={handleChange}></input>
          <label>6</label>
          <input type="radio" value="6" name="numberOfGuests" onChange={handleChange}></input>


        </Form>
        <button onClick={searchBtn}>Sök</button></>}

      {searchBtnClicked && <>
        <Form>
        <label>Tid:</label>
          <input type="button" value="18:00" name="time" onClick={handleClick}></input>
          <input type="button" value="21:00" name="time" onClick={handleClick}></input>
          <br />
        </Form>

        <button onClick={cancel}>Avbryt</button>
        </>}

        {searchTimeClicked && <>
          <Form>
          <label>Förnamn</label><br></br>
          <input type="text" name="name" value={customer.name} onChange={handlecostumer}></input>
          <label>Efternamn</label>
          <input type="text" name="lastname" value={customer.lastname} onChange={handlecostumer}></input>
          <label>Email</label>
          <input type="text" name="email" value={customer.email} onChange={handlecostumer}></input>
          <label>Telefonnr:</label>
          <input type="text" name="phone" value={customer.phone} onChange={handlecostumer}></input>

        </Form>

        <button onClick={checkGprd}>Reservera</button>
        <button onClick={cancel}>Avbryt</button>

          </>}
          {gprdCheckBox &&  <><p>Gprd<input type ="checkbox"></input></p>
          <button onClick={reserve}>Godkänn</button>
          </>}
          {bookingConfirmed && <div>Bokning genomförd</div>}

        </BookingSection>
    </>
  );
}
