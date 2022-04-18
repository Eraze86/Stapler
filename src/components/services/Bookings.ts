import axios from "axios";

import { Bookings } from "../../modules/Bookings";
import { INewBooking, INewCustomer } from "../../modules/INewBooking";

export class GetBookingsService{
    async getBookings(){
        let response = await axios.get<Bookings[]>("https://school-restaurant-api.azurewebsites.net/booking/restaurant/624e9b46796a187bc28ceaef")
        let bookings = response.data
        console.log(bookings);

        return bookings
    }
}

export const CreateBooking = (newBooking: INewBooking) =>{
    axios.post<INewBooking>("https://school-restaurant-api.azurewebsites.net/booking/create", newBooking)
    .then((response) => {
        console.log(response.data);
    })
    .catch(error => { console.log(error); });
}

export const CreateCustomer = (newCustomer: INewCustomer) =>{
    axios.post<INewCustomer>("https://school-restaurant-api.azurewebsites.net/customer/create", newCustomer)
    .then((response) => {
        console.log(response.data);
    })
    .catch(error => { console.log(error); });
}