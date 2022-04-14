import { Link } from "react-router-dom"
import { LinkBookBtn } from "../Styled/Link"

export const BookBtn = () => {
  return(
    <LinkBookBtn to="/booking">
      Boka bord
    </LinkBookBtn>
  )
}