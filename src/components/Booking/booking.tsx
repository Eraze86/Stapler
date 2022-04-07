import axios from "axios"
import { useEffect, useState } from "react"
import { INewBooking } from "../../modules/INewBooking"

export function Booking(){
    const [newBooking, setNewBooking] = useState<INewBooking>()
    function search(){
    console.log("nu söker vi")
    }
    
    return (<>
    <form>
        <label>Datum:</label><br/>
        <input type="date" ></input><br/>
        <label>Tid:</label>
        <select>
    		<option value="option1">18:00</option>
    		<option value="option2">21:00</option>
   		</select><br/>
           <label>Antal:</label>
           <select>
    		<option value="guest1">1</option>
    		<option value="guest2">2</option>
            <option value="guest3">3</option>
            <option value="guest4">4</option>
            <option value="guest5">5</option>
            <option value="guest6">6</option>
   		</select>
           <button onClick={search}>Sök</button>
    </form></>)
}