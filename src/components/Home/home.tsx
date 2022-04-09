
import { CreateRestaurangService } from "../services/createRestaurangService";
import homeImg from '../../img/homePage.jpg'

import { Section } from "../Styled/Section";
import { FoodMenu } from "./foodMenu";
import { BookBtn } from "../BookBtn/BookBtn";
import { H1 } from "../Styled/H1";
import { H2 } from "../Styled/H2";
import { Div } from "../Styled/Div";
import { P } from "../Styled/P";

export function Home(){
    return (<>
        <Div>
            <img src={ homeImg } alt="table at restaurant"/>
            <H1>Stapler</H1>
            <BookBtn />
        </Div>

        <Section>
            <section id="menuSection">
                <H2>Meny</H2>
                <FoodMenu />
            </section>

            <div>
                <H2>Öppettider</H2>
                <P>Måndag - Söndag<br/>
                    18:00 - 23:00
                </P>
            </div>
        </Section>
    </>
  )
}