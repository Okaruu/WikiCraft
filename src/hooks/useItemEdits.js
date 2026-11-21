import { useContext } from "react";
import { ItemsContext } from "../context/itemsContext";

export function useItemEdits() {
    const contexto = useContext(ItemsContext);
    if(!contexto) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
    return contexto;
}