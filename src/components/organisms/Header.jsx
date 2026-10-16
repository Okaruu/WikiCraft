import { Text } from "../atoms/Text";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Header(){
    const { user, logout } = useAuth();
    return ( 
    <header id="header"> 
        <section> 
            <Link to="/"><Text variant="h1">WikiCraft</Text></Link>
            <nav className="header-nav">
                {user ? (
                    <>
                        <Link to="/favoritos" className="header-login">Favoritos</Link>
                        <button type="button" className="header-login" onClick={logout}>Cerrar sesión</button>
                    </>
                ) : (
                    <Link to="/login" className="header-login">Inciar sesión</Link>
                )}
            </nav>
        </section> 
    </header>
    );
}