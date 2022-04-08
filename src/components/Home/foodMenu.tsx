import foodMenu from '../../assets/foodMenu.json';

export const FoodMenu = () => {
  const appetizers = foodMenu.appetizers;
  const mainCourses = foodMenu.mainCourse;
  const desserts = foodMenu.desserts;

  let appetizer = appetizers.map((appet) => {
    return(
      <li>{appet.dish}</li>
    )
  });

  let mainCourse = mainCourses.map((main) => {
    return(
      <li>{main.dish}
        <p>{main.description}</p>
      </li>
    )
  });

  let dessert = desserts.map((des) => {
    return(
      <li>{des.dish}</li>
    )
  });

  return(
  <ul>
    <li>
      <h3>Smårätter</h3>
      <ul>{appetizer}</ul>
    </li>
    <li>
      <h3>Varmrätter</h3>
      <ul>{mainCourse}</ul>
    </li>
    <li>
      <h3>Efterrätter</h3>
      <ul>{dessert}</ul>
    </li>
  </ul>
  )
}