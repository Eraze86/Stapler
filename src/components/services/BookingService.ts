import axios from "axios";
import { Bookings} from "../../modules/Bookings";
import { BookingChanges} from "../../modules/ChangeBooking";
import { INewBooking, INewCustomer } from "../../modules/INewBooking";

const apiUrl = "https://school-restaurant-api.azurewebsites.net";

export class BookingsService{
    //Hämta bokningar
    async getBookings(){
        let response = await axios.get<Bookings[]>(`${apiUrl}/booking/restaurant/624e9b46796a187bc28ceaef`)
        let bookings = response.data
        return bookings
    }

    //Skapa ny bokning
    createBooking(newBooking: INewBooking){
        axios.post<INewBooking>(`${apiUrl}/booking/create`, newBooking)
        .then((response) => {
            console.log(response.data);
        })
        .catch(error => { console.log(error); });
    }

    //Skapa ny kund
    createCustomer(newCustomer: INewCustomer){
        axios.post<INewCustomer>(`${apiUrl}/customer/create`, newCustomer)
        .then((response) => {
            console.log(response.data);
        })
        .catch(error => { console.log(error) });
    }

    //Radera bokning
    deleteBooking(id: string){
        axios.delete<Bookings>(`${apiUrl}/booking/delete/${id}`)
        .then(response => {
            console.log(response.data);
            //Laddar om sidan för att bokningen ska försvinna
            window.location.reload();
        })
        .catch(error => {console.log(error)});
    }

    //Uppdatera bokning
    updateBooking (bookingId: string, bookingEdits: BookingChanges, customerId: string) {
        axios.put(`${apiUrl}/booking/update/${bookingId}`,
        {
            id: bookingId,
            restaurantId: "624e9b46796a187bc28ceaef",
            date: bookingEdits.date,
            time: bookingEdits.time,
            numberOfGuests: bookingEdits.numberOfGuests,
            customerId: customerId
        })
        .catch(error => {console.log(error) });
    }
}