import { useContext } from "react";
import { FavoritesContext } from "../context/favoritesContext" 

export function useFavorites(){
    const contexto = useContext(FavoritesContext);
    if (!contexto) throw new Error("useFavorites debe usarse dentro de <FavoritesProvider>");
    return contexto;
}