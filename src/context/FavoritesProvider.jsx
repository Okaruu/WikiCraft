import { useState } from "react";
import { FavoritesContext } from "./favoritesContext";
import { useAuth } from "../hooks/useAuth";

const clave = (email) => 'wikicraft:favoritos:${email}'

function leer(email){
    if(!email) return[];
    try { return JSON.parse(localStorage.getItem(clave(email))) ?? []; } catch { return []; }
}

export function FavoritesProvider({ children }){
    const { user } = useAuth();
    const email = user?.email ?? null;
    const [favoritos, setFavoritos] = useState(() => leer(email));
    const [emailCargado, setEmailCargado] = useState(email);

    if (email !== emailCargado){
        setEmailCargado(email);
        setFavoritos(leer(email));
    }

    const guardar = (lista) => {
        setFavoritos(lista);
        try { localStorage.setItem(clave(email), JSON.stringify(lista)); } catch {}
    }

    const esFavorito = (valor) => favoritos.some((f) => f.valor === valor);

    const toggleFavorito = (item) => {
        if(!email) return;
        guardar(
            esFavorito(item.valor) ? favoritos.filter((f) => f.valor !== item.valor)
            : [...favoritos, {valor: item.valor, nombre: item.nombre, imagen:item.imagen}]
        );
    };

    return (
        <FavoritesContext.Provider value={{ favoritos, esFavorito, toggleFavorito }}>
            {children}
        </FavoritesContext.Provider>
    )
}