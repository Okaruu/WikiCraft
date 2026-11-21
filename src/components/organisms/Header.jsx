import Text from "../atoms/Text";
import { useAuth } from "../../hooks/useAuth";
import MusicButton from "../molecules/MusicButton";
import Button from "../atoms/Button";
import AppLink from "../atoms/AppLink";

export default function Header(){
    const { user, logout } = useAuth();
    return ( 
    <header id="header"> 
        <section className="container-fluid d-flex flex-wrap justify-content-center justify-content-sm-between align-items-center gap-2 py-2"> 
            <AppLink to="/"><Text variant="h1">WikiCraft</Text></AppLink>
            <nav className="header-nav d-flex flex-wrap justify-content-center gap-2">
                <MusicButton />
                {user ? (
                    <>
                        <AppLink to="/favoritos" className="header-login btn btn-sm">Favoritos</AppLink>
                        <Button className="header-login btn btn-sm" onClick={logout}>Cerrar sesión</Button>
                    </>
                ) : (
                    <>
                        <AppLink to="/login" className="header-login btn btn-sm">Iniciar sesión</AppLink>
                        <AppLink to="/registro" className="header-register btn btn-sm">Registrarse</AppLink>
                    </>
                )}
            </nav>
        </section> 
    </header>
    );
}