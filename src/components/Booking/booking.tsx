import { ChangeEvent, useEffect, useState } from "react";
import { Bookings } from "../../modules/Bookings";
import { INewBooking, INewCustomer } from "../../modules/INewBooking";
import { BookingsService } from "../services/BookingService";
import { BookingSection } from "../Styled/Section";
import bookingImg from "../../img/bookingPage.jpg";
import { Form, Input, InputBtn, Select } from "../Styled/Form";
import { H1Booking, H3, H3Bold } from "../Styled/Headings";
import { Button } from "../Styled/Button";
import { DivBooking } from "../Styled/Div";
import { GuestSelect } from "../GuestSelect/GuestSelect";

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
  const [error, setError] = useState(false);

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

  // hämtar kundens valda datum och tid och sparar om i newBooking
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    let name: string = e.target.name;
    let numberSelected = parseInt(e.target.value)

    if(name != "numberOfGuests"){
      setNewBooking({...newBooking, [name]: e.target.value})
    } else {
      setNewBooking({...newBooking, numberOfGuests: numberSelected})
    }
    setError(false)
  }

   //hämtar tiden och lägger in i newBookings
   const [searchBtnClicked, setSearchBtnClicked] = useState(false);

   function handleClick(e: any) {
    let name: string = e.target.name
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
    if(newBooking.date !== "" && newBooking.numberOfGuests >= 1){
      setBookingSite(false)
      setSearchBtnClicked(true)
      dinnerEarly()
      dinnerLate()
    } else {
      setError(true)
    }
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
  setNewBooking({ ...newBooking, numberOfGuests: 1 });
  setSearchTimeClicked(false)
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
        <img src={bookingImg} alt="Plate with tomatoes and burrata. Credit: Pinar Kucuk" />
        <DivBooking>
          <Form>
          {bookingSite && <>
            <H3Bold>När vill ni äta?</H3Bold>
            <Input type="date" name="date" onChange={handleChange}></Input>

            <H3Bold>Hur många är ni?</H3Bold>
            <Select name="numberOfGuests" onChange={handleChange} value={newBooking.numberOfGuests}><GuestSelect/></Select>

          <Button onClick={searchBtn} type="button">Sök</Button></>}

          {error && <>Vänligen välj datum och antal personer</>}

        {searchBtnClicked && <>
          <H3Bold>Vilken tid vill ni äta?</H3Bold>
          <div>
            <InputBtn type="button" value="18:00" name="time" onClick={handleClick}></InputBtn>
            <InputBtn type="button" value="21:00" name="time" onClick={handleClick}></InputBtn>
          </div>

          <Button onClick={cancel} type="reset">Avbryt</Button>
          </>}

          {searchTimeClicked && <>
            <H3Bold>Ange kontaktuppgifter</H3Bold>
            <label>Förnamn</label>
            <Input type="text" name="name" value={customer.name} onChange={handlecostumer} placeholder="John"></Input>
            <label>Efternamn</label>
            <Input type="text" name="lastname" value={customer.lastname} onChange={handlecostumer} placeholder="Doe"></Input>
            <label>E-mail</label>
            <Input type="text" name="email" value={customer.email} onChange={handlecostumer} placeholder="john.doe@email.com"></Input>
            <label>Telefon</label>
            <Input type="text" name="phone" value={customer.phone} onChange={handlecostumer} placeholder="070-343 43 43"></Input>

            <div>
              <Button onClick={checkGprd}>Reservera</Button>
              <Button onClick={cancel} type="reset">Avbryt</Button>
            </div>

            </>}
            {gprdCheckBox &&  <>
              <H3Bold>Godkänner du GDPR?</H3Bold>
              <input type ="checkbox"></input>
              <Button onClick={reserve}>Godkänn</Button>
            </>}
            {bookingConfirmed && <div>Bokning genomförd</div>}

            </Form>
          </DivBooking>
        </BookingSection>
    </>
  );
}
