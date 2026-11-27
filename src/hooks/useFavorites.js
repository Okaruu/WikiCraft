import { useContext } from "react";
import { FavoritesContext } from "../context/favoritesContext" 

export function useFavorites(){
    const contexto = useContext(FavoritesContext);
    if(!contexto) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
    return contexto;
}