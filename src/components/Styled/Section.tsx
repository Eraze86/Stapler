import styled from "styled-components";

export const Section = styled.section`
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap');
  background-color: #FBEDD4;
  color:#1F2D32;
  display:flex;
  justify-content: space-around;
  flex-wrap:wrap;
  margin:0 7rem 3rem;
  box-sizing:border-box;
  text-align:center;
  position:relative;
  padding:2rem;
  top:-7rem;
  z-index:2;

  #menuSection{
    width:55%;

    div{
      text-align:left;
    }
  }

  .contactInfo{
    width:33%;
    margin-bottom: 3rem;
  }
`

export const BookingSection = styled(Section)`
  margin-top:5rem;
  padding:0;
  box-sizing:border-box;
  top:0;

  img{
    max-width:50%;
  }
`