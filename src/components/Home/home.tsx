
import { CreateRestaurangService } from "../services/createRestaurangService";
import { BookBtn } from "../BookBtn/BookBtn";
import { FoodMenu } from "./foodMenu";

export function Home(){
    return (<>
        <section id="homePageTopSection">
            <h1>Stapler</h1>
            <BookBtn />
        </section>

        <div>
            <section>
                <h2>Meny</h2>
                <FoodMenu />
            </section>

            <section>
                <h2>Öppettider</h2>
                <p>Måndag - Söndag<br/>
                    18:00 - 23:00
                </p>
            </section>
        </div>
    </>
  )
}