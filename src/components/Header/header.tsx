import { Link } from "react-router-dom";

export function Header(){
    return (
    <header>
        <nav>
           <Link to="/">Hem</Link> 
           <Link to="/booking">booking</Link> 
           <Link to="/contact">contact</Link> 
        </nav>
    </header>

    )
}