import axios from "axios";
import { Bookings} from "../../modules/Bookings";
import { BookingChanges} from "../../modules/ChangeBooking";
import { INewBooking } from "../../modules/INewBooking";

const apiUrl = "https://school-restaurant-api.azurewebsites.net";

export class BookingsService{
    //Hämta bokningar
    async getBookings(){
        let response = await axios.get<Bookings[]>(`${apiUrl}/booking/restaurant/624e9b46796a187bc28ceaef`)
        let bookingList = response.data.map((booking: Bookings) => {
            return new Bookings(
                booking._id,
                booking.restaurantId,
                booking.date,
                booking.time,
                booking.numberOfGuests,
                booking.customerId
            );
        })
        return bookingList
    }

    //Skapa ny bokning
    createBooking(newBooking: INewBooking){
        axios.post<INewBooking>(`${apiUrl}/booking/create`, newBooking)
        .then((response) => {
            console.log(response.data);
        })
        .catch(error => { console.log(error); });
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

    earlyDinner: Bookings[] = [];
    lateDinner: Bookings[] = [];
    totalGuests = 0;
    chairsLeft = 0;

    dinnerEarly(bookings: Bookings[], newDate: string, newNumber: number): boolean{
        if(bookings.length !== 0){
            //Går igenom alla bokningar för restaurangen
            for (let i = 0; i < bookings.length; i++) {
                //Kollar om användarens datum matchar med någon/några av restaurangens bokningar
                if(newDate === bookings[i].date){
                    console.log(newDate);
                    //Kollar hur många av dessa datum som har tiden 18:00
                    if(bookings[i].time === "18:00"){
                        //Lägger in dessa bokningar i en ny array
                        this.earlyDinner.push(bookings[i]);
                        this.totalGuests += bookings[i].numberOfGuests;
                        this.chairsLeft = 90 - this.totalGuests;

                        //Om arrayen är mindre än 15 betyder det att det finns minst 1 bord ledigt den tiden
                        if(this.earlyDinner.length < 15 && (newNumber <= this.chairsLeft)) {
                            return true

                        } else {
                            console.log("finns ej");

                            return false
                        }
                    } else {
                        return true
                    }
                } else {
                    return true;
                }
            }
        } else {
            return true;
        }
        return true
    }

    dinnerLate(bookings: Bookings[], newDate: string, newNumber: number):boolean{
        if(bookings.length !== 0){
            for (let i = 0; i < bookings.length; i++) {
                if(newDate === bookings[i].date){
                    console.log(newDate);
                    if(bookings[i].time === "21:00"){
                        this.lateDinner.push(bookings[i]);
                        this.totalGuests += bookings[i].numberOfGuests;
                        this.chairsLeft = 90 - this.totalGuests;

                        if(this.lateDinner.length < 15 && (newNumber <= this.chairsLeft)) {
                            return true
                        } else {
                            console.log("finns ej");
                            return false
                        }
                    } else {
                    return true
                    }
                } else {
                    return true
                }
            }
        } else {
            return true
        }
        return true
    }
}