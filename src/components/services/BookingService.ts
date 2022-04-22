import axios from "axios";
import { Bookings} from "../../modules/Bookings";
import { BookingChanges} from "../../modules/ChangeBooking";
import { IDinnerTime } from "../../modules/IDinnerTime";
import { INewBooking } from "../../modules/INewBooking";

const apiUrl = "https://school-restaurant-api.azurewebsites.net";

export class BookingsService{
    //Funktion för att hämta bokningar från API med vårt restaurang ID
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

    tablesTaken = 0;
    totalTables = 15;
    neededTables = 0;
    //Räknar ut om det finns bord tillgängliga baserat på användarens val
    countGuests(bookings: Bookings[], guests: number): boolean{
        bookings.forEach((booking) => {
            if(booking.numberOfGuests <= 6){
                this.tablesTaken += 1;
            }
            //Räknar ut hur många bord en bokning håller
            if(booking.numberOfGuests > 6){
                let table = Math.ceil(booking.numberOfGuests / 6)
                this.tablesTaken += table
            }
        })
        let tablesLeft = this.totalTables - this.tablesTaken;

        if(bookings.length >= 0){
            return true
        }

        if(tablesLeft <= 0){
            return false
        } else {
            //Bokar endast ett bord
            if(guests <= 6){
                this.neededTables += 1;
            //Bokar 1 bord per 6 personer
            } else if(guests > 6) {
                let table = Math.ceil(guests / 6);
                this.neededTables = table;

                if(this.neededTables <= tablesLeft){
                    return true
                }else {
                    return false
                }
            }
        return true
        }
    }

    dinnerTime: IDinnerTime = {
        early: true,
        late: true
    }

    //Funktion som returnerar om det finns bord tillgängliga på någon av tiderna
    checkTables(lateBookings: Bookings[], earlyBookings: Bookings[], date: string, guests: number): IDinnerTime{
        let earlyOnDate = earlyBookings.filter(b => { return b.date === date })
        let lateOnDate = lateBookings.filter(b => { return b.date === date })

        this.dinnerTime.early = this.countGuests(earlyOnDate, guests);
        this.dinnerTime.late = this.countGuests(lateOnDate, guests);

        return this.dinnerTime
    }
}
