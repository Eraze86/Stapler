import styled, { keyframes } from "styled-components";
//animation till startsidans H!logga
const fadeIn = keyframes`
  
    from { opacity: 0;
      animation-delay: 1s;}
    to { opacity: 1;
      }
`
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

  @media (max-width: 768px) {
  display: none;
  }
`

export const H1Logo = styled(H1)`
animation: ${fadeIn} 2s ease-in;
`

export const H1Booking = styled(H1)`
  font-size: 4.5rem;
  position: relative;
  text-shadow: none;
  margin-bottom: 0;
`

export const H1Error = styled.h1`
  font-size: 12rem;
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`

export const H2 = styled.h2`
  font-family: 'Raleway';
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 0.3rem;
}
`
export const H3 = styled.h3`
  font-family: 'Raleway';
  font-size: 1.5rem;
  font-weight: 300;
  margin: 2.5rem 0 0;
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 0.3rem;
  }
`

export const H3Bold = styled(H3)`
  font-weight: 500;
  margin: 2.5rem 0 1.3rem;
`

export const H4 = styled.h4`
  font-size: 1rem;
  margin: 0.8rem 0 0.2rem;
`