import axios from "axios";

import { Bookings } from "../../modules/Bookings";

export class GetBookingsService{
    async getBookings(){       
         let response = await axios.get<Bookings[]>("https://school-restaurant-api.azurewebsites.net/booking/restaurant/24e9b46796a187bc28ceaef")
        let bookings = response.data
        return bookings
        } 
}