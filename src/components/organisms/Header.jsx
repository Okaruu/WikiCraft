import { Text } from "../atoms/Text";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Header(){
    const { user, logout } = useAuth();
    return ( 
    <header id="header"> 
        <section className="container-fluid d-flex flex-wrap justify-content-center justify-content-sm-between align-items-center gap-2 py-2"> 
            <Link to="/"><Text variant="h1">WikiCraft</Text></Link>
            <nav className="header-nav d-flex flex-wrap justify-content-center gap-2">
                {user ? (
                    <>
                        <Link to="/favoritos" className="header-login btn btn-sm">Favoritos</Link>
                        <button type="button" className="header-login btn btn-sm" onClick={logout}>Cerrar sesión</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="header-login btn btn-sm">Iniciar sesión</Link>
                        <Link to="/registro" className="header-register btn btn-sm">Registrarse</Link>
                    </>
                )}
            </nav>
        </section> 
    </header>
    );
}