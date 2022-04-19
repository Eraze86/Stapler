import axios from "axios"
import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import { Customer } from "../../modules/Bookings"
import { IBooking, ICustomer } from "../../modules/IBooking"
import { IBookingProps } from "../../modules/IBookingsProps"

export const EditBooking = (props: IBookingProps) => {
  const [customer, setCustomer] = useState<ICustomer>(Object);

  console.log("gäst", customer);
  useEffect(() => {
    axios.get<Customer[]>("https://school-restaurant-api.azurewebsites.net/customer/" + props.booking.customerId)
      .then(response => {
          let dataFromApi = response.data.map((customer: Customer) => {
              return new Customer(customer._id, customer.name, customer.lastname, customer.email, customer.phone)
      })
      setCustomer(dataFromApi[0])
    })
  }, [])

  const [bookingEdits, setBookingEdits] = useState<IBooking>({
    _id: props.booking._id,
    restaurantId: props.booking.restaurantId,
    date: props.booking.date,
    time: props.booking.time,
    numberOfGuests: props.booking.numberOfGuests,
    customerId: props.booking.customerId
  })

  function handleCustomerChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
    let name = e.target.name
    setCustomer({...customer, [name]: e.target.value})
    setBookingEdits({...bookingEdits, [name]: e.target.value})
  }

  function saveEdits(e: MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    saveChangedBooking()
    saveChangedCustomer()
  }

  //Ändra existerande bokning med axios.update
function saveChangedBooking(){
  axios.put('https://school-restaurant-api.azurewebsites.net/booking/update/' + bookingEdits._id, {bookingEdits}, {headers:{'Content-Type': 'application/json'}})
  .then((response) => {
      console.log(response.data);
      //window.location.reload();
  })
  .catch(error => { console.log(error)}
  );
}

function saveChangedCustomer(){
  axios.put('https://school-restaurant-api.azurewebsites.net/customer/update/' + customer._id, {customer}, {headers:{'Content-Type': 'application/json'}})
  .then((response) => {
      console.log(response.data);
  })
  .catch(error => { console.log(error)}
  );
}
  return(
    <form>
      <label>Datum</label>
      <input type="date" name="date" defaultValue={props.booking.date} onChange={handleCustomerChange}></input>
      <label>Tid</label>
      <select defaultValue={props.booking.time} onChange={handleCustomerChange}>
        <option>18:00</option>
        <option>21:00</option>
      </select>
      <label>Storlek på sällskap</label>
      <input type="number" name="numberOfGuests" defaultValue={props.booking.numberOfGuests} onChange={handleCustomerChange}></input>

      <label>Förnamn</label>
      <input type="text" name="name" defaultValue={customer.name} onChange={handleCustomerChange}></input>
      <label>Efternamn</label>
      <input type="text" name="lastname" defaultValue={customer.lastname} onChange={handleCustomerChange}></input>
      <label>Email</label>
      <input type="text" name="email" defaultValue={customer.email} onChange={handleCustomerChange}></input>
      <label>Telefonnr:</label>
      <input type="text" name="phone" defaultValue={customer.phone} onChange={handleCustomerChange}></input>

      <button onClick={saveEdits}>Spara</button>
    </form>
  )
}
