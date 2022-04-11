import contactImg from '../../img/contactPage.jpg'
import { BookBtn } from '../BookBtn/BookBtn'
import { Div } from '../Styled/Div'
import { H1 } from '../Styled/H1'
import { H2 } from '../Styled/H2'
import { P } from '../Styled/P'
import { Section } from '../Styled/Section'

export function Contact(){
    return (<>
        <Div>
            <H1>Kontakt</H1>
            <img src={contactImg} alt="chef chopping food" />
        </Div>
        <Section>
                <div className="contactInfo">
                    <H2>Öppettider</H2>
                    <P>Måndag - Söndag<br/> 18:00 - 23:00</P>
                </div>

                <div className="contactInfo">
                    <H2>Adress</H2>
                    <P>Drottninggatan 2<br/> 123 45 Stockholm</P>
                </div>

                <div className="contactInfo">
                    <H2>Kontakt</H2>
                    <P>info@stapler.com<br/>070-111 22 33</P>
                </div>
                <BookBtn />
        </Section>
    </>
    )
}
