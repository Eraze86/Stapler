import { Link, NavLink } from "react-router-dom";
import { Logotype } from "../Styled/Logotype";
import { StyledHeader } from "../Styled/Header";

export function Header(){
    return (
    <StyledHeader>
        <Logotype><Link to="/">Stapler</Link></Logotype>
        <nav>
           <NavLink to="/">Hem</NavLink>
           <NavLink to="/booking">Boka</NavLink>
           <NavLink to="/contact">Kontakt</NavLink>
        </nav>
    </StyledHeader>)
}