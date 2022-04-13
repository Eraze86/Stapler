import foodMenu from '../../assets/foodMenu.json';
import { H3, H4 } from '../Styled/Headings';
import { P } from '../Styled/P';
import { Li, Ul } from '../Styled/Ul';

export const FoodMenu = () => {
  const appetizers = foodMenu.appetizers;
  const mainCourses = foodMenu.mainCourse;
  const desserts = foodMenu.desserts;

  let appetizer = appetizers.map((appet) => {
    return(
      <Li key={appet.id}>
        <H4>{appet.dish}</H4>
      </Li>
    )
  });

  let mainCourse = mainCourses.map((main) => {
    return(
      <Li key={main.id}>
        <H4>{main.dish}</H4>
        <P>{main.description}</P>
      </Li>
    )
  });

  let dessert = desserts.map((des) => {
    return(
      <Li key={des.id}>
        <H4>{des.dish}</H4>
      </Li>
    )
  });

  return(
    <>
      <div>
        <H3>Smårätter</H3>
        <Ul>{appetizer}</Ul>
      </div>
      <div>
        <H3>Varmrätter</H3>
        <Ul>{mainCourse}</Ul>
      </div>
      <div>
        <H3>Efterrätter</H3>
        <Ul>{dessert}</Ul>
      </div>
    </>
  )
}