import {  useState } from "react"
import { IDinnerTime } from "../../modules/IDinnerTime"
import { InputBtn } from "../Styled/Form"

export const DinnerTime = (dinnerTime: IDinnerTime) => {
  return(
    <>
      <InputBtn type="button" value="18:00" name="time" disabled={ !dinnerTime.early }></InputBtn>
      <InputBtn type="button" value="21:00" name="time" disabled={ !dinnerTime.late }></InputBtn>
    </>
  )
}