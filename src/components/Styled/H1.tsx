import styled from "styled-components";

export const H1 = styled.h1`
  @import url('https://fonts.googleapis.com/css2?family=Carattere&display=swap');
  color:white;
  font-family: 'Carattere';
  text-shadow: 8px 7px 35px black;
  font-weight: bold;
  font-size: 8rem;
  text-align: center;
  width: 100vw;
  position: absolute;
  top: 4rem;
  z-index:5;
`

export const H1Booking = styled(H1)`
  font-size: 4.5rem;
  position:relative;
  text-shadow:none;
  margin-bottom:0;
`