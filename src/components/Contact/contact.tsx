import contactImg from '../../img/contactPage.jpg'
import { BookBtn } from '../BookBtn/BookBtn'
import { Div, DivContact } from '../Styled/Div'
import { H1 } from '../Styled/Headings'
import { H2 } from '../Styled/Headings'
import { Img } from '../Styled/Img'
import { PCenter } from '../Styled/P'
import { Section } from '../Styled/Section'

export function Contact(){
    return (<>
        <Div>
            <H1>Kontakt</H1>
            <Img src={contactImg} alt="chef chopping food" />
        </Div>
        <Section>
                <DivContact className="contactInfo">
                    <H2>Öppettider</H2>
                    <PCenter>Måndag - Söndag<br/> 18:00 - 23:00</PCenter>
                </DivContact>

                <DivContact className="contactInfo">
                    <H2>Adress</H2>
                    <PCenter>Drottninggatan 2<br/> 123 45 Stockholm</PCenter>
                </DivContact>

                <DivContact className="contactInfo">
                    <H2>Kontakt</H2>
                    <PCenter>info@stapler.com<br/>070-111 22 33</PCenter>
                </DivContact>
                <BookBtn />
        </Section>
    </>
    )
}
