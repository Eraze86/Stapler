import styled from "styled-components";

export const StyledHeader = styled.header`
  display:flex;
  align-items: center;
  justify-content: space-between;
  padding:1.5rem 7rem;
  box-sizing:border-box;
  width:100vw;
  position:absolute;
  top:0;
  z-index:3;

  nav{
    width: 15rem;
    display: flex;
    justify-content: space-between;
    }
  }

    @media (max-width: 768px) {
      padding:1rem 1rem;
      align-items: flex-start;
      nav{
        flex-direction: column;
        width: 5rem;

        }
  }
`