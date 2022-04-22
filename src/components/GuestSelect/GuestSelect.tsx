//Lista med options för select, välja antal gäster
export const GuestSelect = () => {
  let minGuests = 0;
  let list: number[] = []
//Antal gäster , max 90 gäster per tid
  while (minGuests<90){
    minGuests += 1;
    list.push(minGuests)
  }

  let options = list.map((lis, i) => {
    return(<option key={i}>{lis}</option>)
  })
  return(<>{options}</>)
}