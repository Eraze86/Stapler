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

  const [searchTimeClicked, setSearchTimeClicked] = useState(false);
  const [bookingSite, setBookingSite] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [gprdCheckBox, setGprdCheckBox] = useState(false);
  const [error, setError] = useState(false);
  const [formError, setFormError ] = useState(false);

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
    let numberSelected = parseInt(e.target.value);

    if(name !== "numberOfGuests"){
      setNewBooking({...newBooking, [name]: e.target.value});
    } else {
      setNewBooking({...newBooking, numberOfGuests: numberSelected});
    }
    setError(false);
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

  const [ dinnerTime, setDinnerTime ] = useState<IDinnerTime>({
    early: false,
    late: false,
  });

  function searchBtn() {
    if(newBooking.date !== "" && newBooking.numberOfGuests > 0){
      setBookingSite(false)
      setSearchBtnClicked(true)
      let earlyDinner = bookingService.dinnerEarly(bookings, newBooking.date, newBooking.numberOfGuests);
      let lateDinner = bookingService.dinnerLate(bookings, newBooking.date, newBooking.numberOfGuests)
      setDinnerTime({...dinnerTime, early: earlyDinner, late: lateDinner})

    } else {
      setError(true)
    }
  }

  function cancel(){
    setBookingSite(true)
    setSearchBtnClicked(false)
    setNewBooking({ ...newBooking, numberOfGuests: 1 });
    setSearchTimeClicked(false)
  }

  function checkGprd() {
    if(customer.name === "" || customer.lastname === "" || customer.email === "" || customer.phone === ""){
      setFormError(true);
      setSearchTimeClicked(true);
    } else {
    setNewBooking({ ...newBooking, customer: customer });
    setSearchTimeClicked(false)
    setGprdCheckBox(true)
    }
  }

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
            {(!dinnerTime.early && !dinnerTime.late) ? <>
              <p>Tyvärr fullbokat, prova ett annat datum</p>
              <Button onClick={cancel} type="reset">Tillbaka</Button></> :
              <><H3Bold>Vilken tid vill ni äta?</H3Bold>
              <div onClick={handleClick}>
                <DinnerTime early={dinnerTime.early} late={dinnerTime.late}/>
              </div>
              <Button onClick={cancel} type="reset">Avbryt</Button></>}
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
            {formError && <p>Vänligen fyll i samtliga uppgifter</p>}

            <Button onClick={checkGprd} type="button">Reservera</Button>
            <Button onClick={cancel} type="reset">Avbryt</Button>
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
