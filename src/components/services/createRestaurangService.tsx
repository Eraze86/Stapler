import axios from "axios";
import { useEffect } from "react";

export function CreateRestaurangService(){

    //const restaurantId = "624e9b46796a187bc28ceaef"
    //hämta rastaurang Id
    useEffect(()=>{
        axios.post("https://school-restaurant-api.azurewebsites.net/restaurant/create", {
        name: "Stapler",
        address: {
          street: "Drottninggatan 2",
          zip: "123 45",
          city: "Stockholm"}})
        .then((response)=>{console.log(response.data)
            localStorage.setItem("id", response.data)
        })
    },[])
    return (<></>)
}
