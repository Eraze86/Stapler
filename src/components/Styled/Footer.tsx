import styled from "styled-components";

export const StyledFooter = styled.footer`
  background-color: black;
  color: #FBEDD4;
  padding: 3rem;

  display: flex;
  justify-content: space-around;
  text-align: center;

  div{
    display: flex;
    flex-direction: column;
  }

  a.adminLink{
    font-family: 'Courier New';
    font-size: 1.2rem;
    color: #FBEDD4;

    &:hover{
      color:white;
    }
  }

  h4{
    font-size: 1.3rem;
    margin: 0 0 1rem;
  }
`