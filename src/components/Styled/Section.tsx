import styled from "styled-components";

export const Section = styled.section`
  background-color: #FBEDD4;
  color: #1F2D32;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0 7rem 3rem;
  padding: 3rem;
  box-sizing: border-box;
  text-align: center;
  position: relative;
  top: -7rem;
  z-index: 2;

  section{
    width:65%;
    text-align: left;
    padding-left: 3rem;
    padding-right: 1.5rem;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    top: 1rem;
    margin: 0 1rem 3rem;
    padding: 0.6rem;
    section{
      padding-left: 0rem;
      padding-right: 0rem;
      width:100%;
    }
  }
`

export const BookingSection = styled(Section)`
  margin-top: 5rem;
  padding: 0;
  box-sizing: border-box;
  top: 0;

  img{
    max-width: 50%;
  }
`