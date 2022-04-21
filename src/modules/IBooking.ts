export interface IBooking{
    _id: string,
    restaurantId: string,
    date: string,
    time: string,
    numberOfGuests: number,
    customerId: string
}

export interface ICustomer{
  _id: string,
  name: string,
  lastname: string,
  email: string,
  phone: string
}

export interface IMatched{
    booking: IBooking,
    customer: ICustomer
}