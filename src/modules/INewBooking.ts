export interface INewBooking {
  restaurantId: string;
  date: String;
  time: String;
  numberOfGuests: number;
  customer: INewCustomer;
}
export interface INewCustomer {
  name: string;
  lastname: string;
  email: string;
  phone: string;
}
