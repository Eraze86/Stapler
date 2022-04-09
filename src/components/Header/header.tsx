import { Link, NavLink } from "react-router-dom";
import { Logotype } from "../Styled/Logotype";

import "./header.css";

export function Header(){
    return (
    <header>
        <Logotype><Link className="logo" to="/">Stapler</Link></Logotype>
        <nav>
           <NavLink to="/" className={({isActive}) => (isActive ? "active" : "notActive")}>Hem</NavLink>
           <NavLink to="/booking" className={({isActive}) => (isActive ? "active" : "notActive")}>Boka</NavLink>
           <NavLink to="/contact" className={({isActive}) => (isActive ? "active" : "notActive")}>Kontakt</NavLink>
        </nav>
    </header>)
}