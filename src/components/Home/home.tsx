
import homeImg from '../../img/homePage.jpg'
import { Section } from "../Styled/Section";
import { FoodMenu } from "./foodMenu";
import { H1 } from "../Styled/Headings";
import { H2 } from "../Styled/Headings";
import { Div, DivHome } from "../Styled/Div";
import { PCenter } from "../Styled/P";
import { Img } from '../Styled/Img';
import { LinkBookBtnHome } from '../Styled/Link';

export function Home(){
    return (<>

        <Div>
            <Img src={ homeImg } alt="Tables at restaurant. Credit: Carlos Aranda"/>
            <H1>Stapler</H1>
            <LinkBookBtnHome to="/booking">Boka bord</LinkBookBtnHome>
        </Div>

        <Section>
            <section>
                <H2>Meny</H2>
                <FoodMenu />
            </section>

            <DivHome>
                <H2>Öppettider</H2>
                <PCenter>Måndag - Söndag<br/>
                    18:00 - 23:00
                </PCenter>
            </DivHome>
        </Section>
    </>
  )
}
