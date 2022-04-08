import { Link } from "react-router-dom"
import { Button } from "../Styled/Button"

export const BookBtn = () => {
  return(
    <Link to="/booking">
      <Button>Boka bord</Button>
    </Link>
  )
}