import { Bookings } from "./Bookings";
import { IBooking, ICustomer } from "./IBooking";
import { IDinnerTime } from "./IDinnerTime";

export interface IBookingProps{
  booking: IBooking,
  customer: ICustomer,
  dinnerTime: IDinnerTime,
  lateBookings: Bookings[],
  earlyBookings: Bookings[]
}
