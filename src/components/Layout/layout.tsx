import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/footer";
import { Header } from "../Header/header";

export function Layout(){
    return(<>
     <Header/>

        <main>
            <Outlet></Outlet>
        </main>

    <Footer/>
    </>)
}