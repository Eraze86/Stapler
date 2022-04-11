import styled from "styled-components";

export const StyledHeader = styled.header`
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap');
  padding:1.5rem 7rem;
  display:flex;
  align-items: center;
  justify-content: space-between;
  width:100vw;
  position:absolute;
  top:0;
  box-sizing:border-box;
  z-index:3;

  nav{
    font-size:1.4rem;
    width:15rem;
    display:flex;
    justify-content:space-between;

      a{
        color:white;
        text-decoration: none;
        font-family: 'Raleway';
        &[class*='active'] {
        color: #FECB4B;
      }
    }
  }
`