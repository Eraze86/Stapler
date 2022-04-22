import styled from "styled-components";

export const Button = styled.button`
  padding: 0.7rem 0.7rem;
  background-color: #1F2D32;
  color: white;
  border:none;
  border-radius: 0.3rem 0.3rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
  width: 50%;
  margin: 1.2rem auto 0rem;

  &:hover{
    background-color: #31454d;
  }
`
export const ButtonAdmin = styled(Button)`
  padding: 0.4rem 0.6rem;
  font-size: 0.9rem;
  box-sizing:border-box;
  margin:0;
`

export const ButtonClose = styled.button`
  color: #1F2D32;
  cursor: pointer;
  font-size: 1.3rem;
  background-color: transparent;
  border:none;
  align-self: flex-end;
  width: fit-content;
`