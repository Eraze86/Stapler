import axios from "axios";

import { Bookings } from "../../modules/Bookings";

export class GetBookingsService{
    async getBookings(){       
         let response = await axios.get<Bookings[]>("https://school-restaurant-api.azurewebsites.net/booking/restaurant/:id")
        let bookings = response.data
        return bookings
        } 
}