import foodMenu from '../../assets/foodMenu.json';
import { P } from '../Styled/P';
import { Ul } from '../Styled/Ul';

export const FoodMenu = () => {
  const appetizers = foodMenu.appetizers;
  const mainCourses = foodMenu.mainCourse;
  const desserts = foodMenu.desserts;

  let appetizer = appetizers.map((appet) => {
    return(
      <li key={appet.id}>{appet.dish}</li>
    )
  });

  let mainCourse = mainCourses.map((main) => {
    return(
      <li key={main.id}>{main.dish}
        <p>{main.description}</p>
      </li>
    )
  });

  let dessert = desserts.map((des) => {
    return(
      <li key={des.id}>{des.dish}</li>
    )
  });

  return(
    <section>
      <div>
        <h3>Smårätter</h3>
        <Ul>{appetizer}</Ul>
      </div>
      <div>
        <h3>Varmrätter</h3>
        <Ul>{mainCourse}</Ul>
      </div>
      <div>
        <h3>Efterrätter</h3>
        <Ul>{dessert}</Ul>
      </div>
    </section>
  )
}