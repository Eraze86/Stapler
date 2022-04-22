import styled from "styled-components";

export const Ul = styled.ul`
  list-style-type:none;
  padding:0;
`

export const UlAdmin = styled(Ul)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 3rem;
  row-gap: 2rem;


  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    row-gap: 1rem;
    padding: 0rem;

  }

  @media (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 1rem;
  }
`

export const Li = styled.li`
  font-family: 'Courier New';
  font-weight:bold;
  font-size: 1.1rem;
  margin:0.2rem 0;
  box-sizing: border-box;

  div{
    display:flex;
    column-gap:1rem;
  }

  @media (max-width: 768px) {
    margin:1rem;
  }
`