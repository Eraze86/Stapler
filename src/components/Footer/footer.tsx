import { Link } from "react-router-dom"
import { SmallBookBtn } from "../Styled/Button"
import { StyledFooter } from "../Styled/Footer"
import { P } from "../Styled/P"

export const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <h4>Adress</h4>
        <P>Drottningvägen 12<br/>
          123 45 Stockholm
        </P>
      </div>
      <div>
        <h4>Öppettider</h4>
        <P>Måndag - Söndag<br/>
          18 - 23
        </P>
        <SmallBookBtn to="/booking">Boka bord</SmallBookBtn>
      </div>

      <div>
        <h4>Kontakt</h4>
        <P>
          info@stapler.com<br/>
          070 - 111 22 33
        </P>
        <Link to="/admin" className="adminLink">Admin</Link>
      </div>
    </StyledFooter>
  )
}