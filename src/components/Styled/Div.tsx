import styled from "styled-components";

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100vw;

  @media (max-width: 768px) {
      height: 7rem;
  }
`
export const DivHome = styled(Div)`
  width: 35%;
  justify-content: start;

  @media (max-width: 768px) {
    display: none;
  }
`

export const DivContact = styled.div`
  width:33%;
  margin-bottom: 1rem;
    @media (max-width: 768px) {
    width: 90%;
  }
`
export const DivAdmin = styled.div`
  width: 90%;
  margin-bottom: 12rem;
  display: block;
  margin-top: 2rem;
    @media (max-width: 768px) {
    width: 90%;
    margin-bottom: 7rem;
  }
`