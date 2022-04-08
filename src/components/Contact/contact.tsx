import contactImg from '../../img/contactPage.jpg'

export function Contact(){
    return (<>
        <img src={contactImg} alt="chef chopping food" />
        <section>
            <div>
                <h2>Öppettider</h2>
                    <p>Måndag - Söndag<br/> 18:00 - 23:00</p>
                </div>

                <div>
                    <h2>Adress</h2>
                    <p>Drottninggatan 2<br/> 123 45 Stockholm</p>
                </div>

                <div>
                    <h2>Kontakt</h2>
                    <p>info@stapler.com<br/>070-111 22 33</p>
                </div>
        </section>
    </>)
}
