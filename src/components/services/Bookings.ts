import axios from "axios";
import { Bookings } from "../../modules/Bookings";
import { INewBooking, INewCustomer } from "../../modules/INewBooking";

export class GetBookingsService{
    async getBookings(){
        let response = await axios.get<Bookings[]>("https://school-restaurant-api.azurewebsites.net/booking/restaurant/624e9b46796a187bc28ceaef")
        let bookings = response.data
        return bookings
    }
}

export const createBooking = (newBooking: INewBooking) =>{
    axios.post<INewBooking>("https://school-restaurant-api.azurewebsites.net/booking/create", newBooking)
    .then((response) => {
        console.log(response.data);
    })
    .catch(error => { console.log(error); });
}

export const createCustomer = (newCustomer: INewCustomer) =>{
    axios.post<INewCustomer>("https://school-restaurant-api.azurewebsites.net/customer/create", newCustomer)
    .then((response) => {
        console.log(response.data);
    })
    .catch(error => { console.log(error); });
}

//Funktion för att radera/avboka en bokning, genom API delete och skickar med id på bokningen
export const deleteBooking = (id: string) => {
    axios.delete<Bookings>("https://school-restaurant-api.azurewebsites.net/booking/delete/" + id)
    .then(response => {
        console.log(response.data);
        //Laddar om sidan för att bokningen ska försvinna
        window.location.reload();
    })
    .catch(error => {console.log(error);});
}
