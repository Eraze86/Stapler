export interface INewBooking {
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customer: INewCustomer;
}
export interface INewCustomer {
  name: string;
  lastname: string;
  email: string;
  phone: string;
}
