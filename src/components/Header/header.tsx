import { Link, NavLink } from "react-router-dom";
import { Logotype } from "../Styled/Logotype";
import { StyledHeader } from "../Styled/Header";
import { LinkNav } from "../Styled/Link";

export function Header(){
    return (
    <StyledHeader>
        <Logotype><Link to="/">Stapler</Link></Logotype>
        <nav>
           <LinkNav to="/">Hem</LinkNav>
           <LinkNav to="/booking">Boka</LinkNav>
           <LinkNav to="/contact">Kontakt</LinkNav>
        </nav>
    </StyledHeader>)
}