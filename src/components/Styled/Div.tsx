import styled from "styled-components";

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
  width:100vw;

  a{
    bottom:13rem;
    position:absolute;
    z-index:6;
  }

  img{
    max-width:100vw;
  }
`