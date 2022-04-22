import axios from "axios"
import { ICustomer } from "../../modules/IBooking"
import { INewCustomer } from "../../modules/INewBooking"

const apiUrl = "https://school-restaurant-api.azurewebsites.net";

export class CustomerService{
    async getCustomer(customerId: string){
      let response = await axios.get<ICustomer>(`${apiUrl}/customer/${customerId}`)
      let customer = response.data

    return customer
    }

  //Skapa ny kund
  createCustomer(newCustomer: INewCustomer){
    axios.post<INewCustomer>(`${apiUrl}/customer/create`, newCustomer)
    .then((response) => {
        console.log(response.data);
    })
    .catch(error => { console.log(error) });
  }
}