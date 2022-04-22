import { LinkAdmin, LinkSmallBookBtn } from "../Styled/Link"
import { StyledFooter } from "../Styled/Footer"
import { H2 } from "../Styled/Headings"
import { PCenter } from "../Styled/P"

export const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <H2>Adress</H2>
        <PCenter>Drottningvägen 12<br/>
          123 45 Stockholm
        </PCenter>
      </div>
      <div>
        <H2>Öppettider</H2>
        <PCenter>Måndag - Söndag<br/>
          18 - 23
        </PCenter>
        <LinkSmallBookBtn to="/booking">Boka bord</LinkSmallBookBtn>
      </div>

      <div>
        <H2>Kontakt</H2>
        <PCenter>
          info@stapler.com<br/>
          070 - 111 22 33
        </PCenter>
        <LinkAdmin to="/admin" className="adminLink">Admin</LinkAdmin>
      </div>
    </StyledFooter>
  )
}