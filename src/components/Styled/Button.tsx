import { Link } from "react-router-dom";
import styled from "styled-components";

export const Button = styled(Link) `
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@600&display=swap');
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 1.6rem;
  border: 5px solid #FECB4B;
  background-color: #1F2D32;
  padding:0.8rem;
  color: #FECB4B;
  text-decoration:none;
  transition: all 0.3s;

  &:hover{
    background-color: #FECB4B;
    color:#1F2D32;
  }
`