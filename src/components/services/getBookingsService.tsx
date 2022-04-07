import axios from "axios";
import { useEffect } from "react";
import { Bookings } from "../../modules/Bookings";

export function GetBookingsService(){

    useEffect(()=>{
        axios.get<Bookings[]>("https://school-restaurant-api.azurewebsites.net/booking/restaurant/:id")
        .then((response) =>{console.log(response.data)
        
            let bookings = response.data
            console.log("här har vi", bookings)
            return bookings

        })
    },[])

}
