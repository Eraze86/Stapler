export class Bookings{
    constructor(
        public _id: string,
        public restaurantId: string,
        public date: string,
        public time: string,
        public numberOfGuests: number,
        public customerId: string){}
}

export class Customer{
    constructor(
        public _id: string,
        public name: string,
        public lastname: string,
        public email: string,
        public phone: string
    ){}
}