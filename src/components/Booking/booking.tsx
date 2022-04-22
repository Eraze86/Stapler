import { ChangeEvent, useEffect, useState } from "react";
import { Bookings } from "../../modules/Bookings";
import { INewBooking, INewCustomer } from "../../modules/INewBooking";
import { BookingsService } from "../services/BookingService";
import { BookingSection } from "../Styled/Section";
import bookingImg from "../../img/bookingPage.jpg";
import { Form, Input, Select } from "../Styled/Form";
import { H1Booking, H3Bold } from "../Styled/Headings";
import { Button } from "../Styled/Button";
import { DivBooking } from "../Styled/Div";
import { GuestSelect } from "../GuestSelect/GuestSelect";
import { CustomerService } from "../services/CustomerService";
import { DinnerTime } from "../DinnerTime/DinnerTime";
import { IDinnerTime } from "../../modules/IDinnerTime";
import { BookBtn } from "../BookBtn/BookBtn";
import { LinkSmallBookBtn } from "../Styled/Link";

export function Booking() {
  let bookingService = new BookingsService();
  let customerService = new CustomerService();

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
    numberOfGuests: 1,
    customer: customer,
  });

  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [lateBookings, setLateBookings] = useState<Bookings[]>([]);
  const [earlyBookings, setEarlyBookings] = useState<Bookings[]>([]);
  const [searchTimeClicked, setSearchTimeClicked] = useState(false);
  const [bookingSite, setBookingSite] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [gprdCheckBox, setGprdCheckBox] = useState(false);
  const [error, setError] = useState(false);
  const [formError, setFormError ] = useState(false);

  //hämtar restaurangens bokningar med funktionen getBookings i tjänsten bookingService
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
      //Lägger in bokningarna i bookings (om det finns några)
      setBookings(data)
      setBookingSite(true)
    })
  }, []);

  useEffect(() => {
    let earlyArray = bookings.filter(booking => { return booking.time === "18:00" })
    let lateArray = bookings.filter(booking => { return booking.time === "21:00" })
    setEarlyBookings(earlyArray)
    setLateBookings(lateArray)
  }, [bookings])

  // hämtar kundens valda datum och tid från input och sparar i newBooking
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    let name: string = e.target.name;
    let numberSelected = parseInt(e.target.value);

    if(name !== "numberOfGuests"){
      setNewBooking({...newBooking, [name]: e.target.value});
    } else {
      setNewBooking({...newBooking, numberOfGuests: numberSelected});
    }
    setError(false);
  }

  const [searchBtnClicked, setSearchBtnClicked] = useState(false);

  //hämtar vilken tid användaren valt och lägger in i newBooking
  function handleClick(e: any) {
    let name: string = e.target.name
    setNewBooking({ ...newBooking, [name]: e.target.value })
    setSearchTimeClicked(true)
    setSearchBtnClicked(false);
  }

  //hämtar kundinformation från input och lägger in i customer
  function handleCustomer(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.name
    setCustomer({ ...customer, [name]: e.target.value })
  }

  const [ dinnerTime, setDinnerTime ] = useState<IDinnerTime>({
    early: false,
    late: false,
  });

  //När man trycker på sök
  function searchBtn() {
    //kollar så att datum och antal gäster är ifyllt
    if(newBooking.date !== "" && newBooking.numberOfGuests > 0){
      setBookingSite(false)
      setSearchBtnClicked(true)
      //Kör funktionerna dinnerEarly och dinnerLate som finns i tjänsten bookingService
      //för att se om det finns platser ledigt
      //let dinner = bookingService.checkTables(earlyBookings, lateBookings, newBooking.date, newBooking.numberOfGuests)
      dinnerEarly();
      dinnerLate();
      //let earlyDinner = bookingService.dinnerEarly(bookings, newBooking.date, newBooking.numberOfGuests);
      //let lateDinner = bookingService.dinnerLate(bookings, newBooking.date, newBooking.numberOfGuests)
      //setDinnerTime({...dinnerTime, early: dinner.early, late: dinner.late})
    } else {
      setError(true)
    }
  }

  let earlyDinner: Bookings[] = [];
    let lateDinner: Bookings[] = [];
    let totalGuests = 0;
    let chairsLeft = 0;

    //Funktion för att se om det finns lediga tider kl 18:00
    const [ eatEarly, setEatEarly ] = useState(false);
    function dinnerEarly(){  
      if(bookings.length !== 0){
        //Går igenom alla bokningar för restaurangen
        for (let i = 0; i < bookings.length; i++) {
            console.log("1", i);
            //Kollar om användarens datum matchar med någon/några av restaurangens bokningar
            if(newBooking.date === bookings[i].date){
                //Kollar hur många av dessa datum som har tiden 18:00
                if(bookings[i].time === "18:00"){
                    //Lägger in dessa bokningar i en ny array
                    earlyDinner.push(bookings[i]);
                    totalGuests += bookings[i].numberOfGuests;
                    chairsLeft = 90 - totalGuests;
                    //Om arrayen är mindre än 15 betyder det att det finns minst 1 bord ledigt den tiden
                    if(earlyDinner.length < 3 && (newBooking.numberOfGuests <= chairsLeft)) {
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
            } else if(bookings[i].time === "18:00") {
                setEatEarly(true);
                console.log("FINNS 18");
            } else {
                setEatEarly(true);
                console.log("WHAT");
            }
        }
      } else {
        setEatEarly(true);
      }
    }

    //Funktion för att kolla om det finns lediga tider kl 21:00, samma som dinnerEarly() fast 21:00
    const [ eatLate, setEatLate ] = useState(false);
    function dinnerLate(){
      if(bookings.length !== 0){
        for (let i = 0; i < bookings.length; i++) {
            if(newBooking.date === bookings[i].date){
                if(bookings[i].time === "21:00"){
                    lateDinner.push(bookings[i]);
                    totalGuests += bookings[i].numberOfGuests;
                    chairsLeft = 90 - totalGuests;
                    if(lateDinner.length < 3 && (newBooking.numberOfGuests <= chairsLeft)) {
                        console.log("DET FINNS BORD KL 21");
                        setEatLate(true);
                    } else {
                        console.log("DET FINNS INTE BORD KL 21");
                        setEatLate(false);
                    }
                } else {
                    setEatLate(true);
                } 
            } else if(bookings[i].time === "21:00") {
                setEatLate(true);
                console.log("FINNS 21");
            } else {
                console.log("hej booking", bookings[i].date);
                setEatLate(true);
                console.log("HALLÅ");
            }
        }
      } else {
        setEatLate(true);
      }
    }

  //Funktion om man trycker på avbryt, kommer tillbaka till första bokningssidan
  function cancel(){
    setBookingSite(true)
    setSearchBtnClicked(false)
    setNewBooking({ ...newBooking, numberOfGuests: 1 });
    setSearchTimeClicked(false)
  }

  //Funktion för att kunna godkänna GDPR
  function checkGprd() {
    //Kollar så att alla uppgifter är ifyllda, är dom inte det så kommer man inte till gdpr
    if(customer.name === "" || customer.lastname === "" || customer.email === "" || customer.phone === ""){
      setFormError(true);
      setSearchTimeClicked(true);
    } else {
    setNewBooking({ ...newBooking, customer: customer });
    setSearchTimeClicked(false)
    setGprdCheckBox(true)
    }
  }

  /*Funktion för att göra en bokning, använder funktionen createBooking i
  tjänsten bookingService där man skickar bokningen till API
  och skapar även en kund på samma sätt*/
  function reserve(){
    setGprdCheckBox(false)
    setBookingConfirmed(true)
    customerService.createCustomer(customer)
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
            {(!eatEarly && !eatLate) ? <>
              <p>Tyvärr fullbokat, prova ett annat datum</p>
              <Button onClick={cancel} type="reset">Tillbaka</Button></> :
              <><H3Bold>Vilken tid vill ni äta?</H3Bold>
              <div onClick={handleClick}>
                {eatEarly && !searchTimeClicked && <Button name="time" value="18:00" onClick={handleClick}>18:00</Button>}
                {eatLate && !searchTimeClicked && <Button name="time" value="21:00" onClick={handleClick}>21:00</Button>}
              </div>
              <Button onClick={cancel} type="reset">Avbryt</Button></>}
          </>}

          {searchTimeClicked && <>
            <H3Bold>Ange kontaktuppgifter</H3Bold>
            <label>Förnamn</label>
            <Input type="text" name="name" value={customer.name} onChange={handleCustomer} placeholder="John"></Input>
            <label>Efternamn</label>
            <Input type="text" name="lastname" value={customer.lastname} onChange={handleCustomer} placeholder="Doe"></Input>
            <label>E-mail</label>
            <Input type="text" name="email" value={customer.email} onChange={handleCustomer} placeholder="john.doe@email.com"></Input>
            <label>Telefon</label>
            <Input type="text" name="phone" value={customer.phone} onChange={handleCustomer} placeholder="070-343 43 43"></Input>
            {formError && <p>Vänligen fyll i samtliga uppgifter</p>}

            <Button onClick={checkGprd} type="button">Reservera</Button>
            <Button onClick={cancel} type="reset">Avbryt</Button>
          </>}

          {gprdCheckBox &&  <>
            <H3Bold>Godkänner du GDPR?</H3Bold>
            <Input type="checkbox" className="checkbox"></Input>
            <Button onClick={reserve}>Godkänn</Button>
          </>}
          {bookingConfirmed && <div className="confirmed">
            Bokning genomförd
            <Button>Ny bokning</Button>
          </div>}
          </Form>
        </DivBooking>
      </BookingSection>
    </>
  );
}
