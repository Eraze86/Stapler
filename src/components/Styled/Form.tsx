import styled from "styled-components";

export const Form = styled.form`
  padding: 2rem 8rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  label{
    text-align: left;
    margin-top: 0.7rem;
    font-size:1.2rem;
    color: #1f2d31;
  }

  div{
    display:flex;
    justify-content: center;
    column-gap: 0.3rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem 0rem;
    margin: 0.5rem 0rem;
  }
`

export const Input = styled.input`
  font-family: 'Raleway', sans-serif;
  font-size: 1.2rem;
  padding: 0.3rem 0.5rem;
  background-color: #fef5e6;
  border: 1.5px solid #1f2d31;
  color: #1f2d31;

  ::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`

export const InputBtn = styled.input`
  cursor:pointer;
  font-family: 'Raleway', sans-serif;
  font-size: 1.4rem;
  padding: 0.3rem 0.5rem;
  background-color: #fef5e6;
  border: 1.5px solid #1f2d31;
  color: #1f2d31;
  transition: all 0.2s;
  width: 30%;

  &:hover{
    background-color: #1f2d31;
    color: #fef5e6;
  }
`

export const Select = styled.select`
  font-family: 'Raleway', sans-serif;
  font-size: 1.4rem;
  padding: 0.3rem 0.5rem;
  background-color: #fef5e6;
  border: 1.5px solid #1f2d31;
  color: #1f2d31;
  cursor: pointer;
`