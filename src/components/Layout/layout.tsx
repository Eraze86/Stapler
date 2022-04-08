import { Link, Outlet } from "react-router-dom";
import { Header } from "../Header/header";



export function Layout(){
    return(<>
     <Header></Header>

        <main>
            <Outlet></Outlet>
        </main>

    <footer></footer>
    </>)
}