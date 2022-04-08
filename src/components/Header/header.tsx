import { Link, NavLink } from "react-router-dom";

import "./header.css";

export function Header(){
    return (
    <header>
        <Link className="logo" to="/">Stapler</Link>
        <nav>
           <NavLink to="/" className={({isActive}) => (isActive ? "active" : "notActive")}>Hem</NavLink> 
           <NavLink to="/booking" className={({isActive}) => (isActive ? "active" : "notActive")}>Boka</NavLink> 
           <NavLink to="/contact" className={({isActive}) => (isActive ? "active" : "notActive")}>Kontakt</NavLink> 
        </nav>
    </header>)
}