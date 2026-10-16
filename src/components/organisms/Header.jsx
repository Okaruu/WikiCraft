import { Text } from "../atoms/Text";
import { Link } from "react-router-dom";

export default function Header(){
    return ( 
    <header id="header"> 
        <section> 
            <Text variant="h1">WikiCraft</Text>
            <Link to="/login" className="header-login">
                Iniciar Sesion
                </Link> 
        </section> 
    </header>
    )
}