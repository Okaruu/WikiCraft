import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export function useItemEdits() {
    const contexto = useContext(AuthContext);
    if(!contexto) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
    return contexto;
}