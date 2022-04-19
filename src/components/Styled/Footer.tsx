import styled from "styled-components";

export const StyledFooter = styled.footer`
  background-color: black;
  color: #FBEDD4;
  padding: 1.5rem;
  display: flex;
  justify-content: space-around;
  text-align: center;

  div{
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    div{
      h2{
        font-size: 0.8rem;
      }
    }
  }
`