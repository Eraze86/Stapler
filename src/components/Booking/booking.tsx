import { ChangeEvent, useEffect, useState } from "react";
import { Bookings } from "../../modules/Bookings";
import { INewBooking, INewCustomer } from "../../modules/INewBooking";
import { GetBookingsService } from "../services/getBookings";
import { BookingSection } from "../Styled/Section";
import bookingImg from "../../img/bookingPage.jpg";
import { Form } from "../Styled/Form";
import { H1Booking } from "../Styled/H1";
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
  const [searchBtnClicked, setSearchBtnClicked] = useState(false);
  const [searchTimeClicked, setSearchTimeClicked] = useState(false);
  const [bookingSite, setBookingSite] = useState(false);
  
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
    console.log("ny bookning", newBooking)
  }
   // hämtar kundens valda antal gäster och sparar om i newBooking
   function handleClick(e: any) {
    let name: string = e.target.name
    console.log(e.target.value)
    setNewBooking({ ...newBooking, [name]: e.target.value })
  }
   // hämtar kundens information och spara i costumer
  function handlecostumer(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.name
    console.log(e.target.value)
    setCustomer({ ...customer, [name]: e.target.value })
    console.log("Ny kund", customer)
  }
let booker: Bookings []= []
  //vid sökning jämför kundens val med befintliga bookingar
  function searchBtn() {
    setBookingSite(false)
    setSearchBtnClicked(true)

      for (let i = 0; i < bookings.length; i++) {
        //om datumet finns i bokning redan
        if (newBooking.date === bookings[i].date) {
          console.log("finns inte ledig tid")
          //om tiden finns i bokning redan
        }else if(bookings.length === 0){
          // booker.push(bookings.)
          console.log("finns tid")
        }
        //   if (newBooking.time === bookings[i].time) {
           
        //     console.log("det finns ingen tid")
        //   } else {
            
        //     setSearchBtnClicked(true)
        //     console.log("det finns tid ")
        //   }
        // }
      }
  }
 
function searchTime(){
  setSearchBtnClicked(false)
  setSearchTimeClicked(true)
}
function cancel(){
  setBookingSite(true)
  setSearchBtnClicked(false)
  setSearchTimeClicked(false)
}

   async function reserve() {
    setNewBooking({ ...newBooking, customer: customer });
    console.log(newBooking)
    await axios.post<INewCustomer>("https://school-restaurant-api.azurewebsites.net/api-doc/customer/create", { customer })
      .then((response) => {
        // console.log("gäst" , response.data)
      })
      .catch(error => { console.log(error); })
    await axios.post<INewBooking>("https://school-restaurant-api.azurewebsites.net/api-doc/booking/create", { newBooking })
      .then((response) => {
        // console.log("datum" ,response.data)
      })
      .catch(error => { console.log(error); })
      
  }

  return (
    <>
      <H1Booking>Boka Bord</H1Booking>

      <BookingSection>
        <img src={bookingImg} />
        {bookingSite && <><Form>
          <label>Datum:</label>
          <br />
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
        <button onClick={searchTime}>Sök ledig tid</button>
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
        <button onClick={reserve}>Reservera</button>
        <button onClick={cancel}>Avbryt</button>

          </>}
        
      
          </BookingSection>
    </>
  );
}
