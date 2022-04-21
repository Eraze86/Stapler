import axios from "axios"
import { ICustomer } from "../../modules/IBooking"

export class CustomerService{
  //hämta costumerId
  getCustomer(customerId: string){
      let customer = axios.get<ICustomer[]>("https://school-restaurant-api.azurewebsites.net/customer/" + customerId)
      .then(response => {
        return response.data
      })
    return customer
  }
}