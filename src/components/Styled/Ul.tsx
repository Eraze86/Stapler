import styled from "styled-components";

export const Ul = styled.ul`
  width: 100%;
  list-style-type:none;
  padding:0;
  @media (max-width: 768px){
    margin-top: 0.1rem;
  }
`

export const UlAdmin = styled(Ul)`
    max-width: 100%;
    display:grid;
    grid-template-columns: 20% 20% 15% 12% 10% 15%;
    gap: 1rem;
    justify-content:center;
    align-items:center;
    text-transform: capitalize;

    li{
      font-family: 'Helvetica', sans-serif;
      font-weight: light;
      font-size: 1rem;
      font-weight: 400;
      padding: 0.2rem;
    }

    @media (max-width: 1024px) {
      grid-template-columns: 30% 30% 30%;
      grid-template-rows: repeat(4, auto);

      li:nth-child(1){
        grid-column: 1/span 3;
        grid-row: 1;
      }
      li:nth-child(2){
        grid-column: 1/span 3;
        grid-row: 2;
      }
      li:nth-child(3, 4, 5){
        grid-row: 3;
      }
      li:nth-child(6){
        grid-column: 1/ span 3;
        grid-row: 4;
      }
    }
`

export const UlAdminHeadings = styled(UlAdmin)`
  background-color: #1F2D32;
  color: white;
  margin:0;

  li{
    font-family: 'Raleway', sans-serif;
    font-size: 1.1rem;
    padding: 0.8rem;
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
    column-gap:0.5rem;
  }

  @media (max-width: 768px) {
    margin:0.4rem;
  }
`