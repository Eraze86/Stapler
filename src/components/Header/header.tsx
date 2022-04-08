import { Link, NavLink } from "react-router-dom";
import { Logo } from "../Styled/Div";

import "./header.css";

export function Header(){
    return (
    <header>
        <Logo id="logotype"><Link className="logo" to="/">Stapler</Link></Logo>
        <nav>
           <NavLink to="/" className={({isActive}) => (isActive ? "active" : "notActive")}>Hem</NavLink>
           <NavLink to="/booking" className={({isActive}) => (isActive ? "active" : "notActive")}>Boka</NavLink>
           <NavLink to="/contact" className={({isActive}) => (isActive ? "active" : "notActive")}>Kontakt</NavLink>
        </nav>
    </header>)
}