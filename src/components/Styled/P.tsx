import styled from "styled-components";

export const P = styled.p`
  font-family: 'Courier New';
  font-weight: normal;
  font-size: 1rem;
  margin: 0.5;

`
export const PCenter = styled(P)`
  text-algin: center;
  margin: 0 0 2rem;
  font-size: 1.2rem;
  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 0 0 1rem;
  }
`
export const PId = styled.p`
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  background-color:#1F2D32;
  color: white;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
`