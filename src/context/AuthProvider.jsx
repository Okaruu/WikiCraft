import { useState } from "react";
import { AuthContext } from "./authContext";

const KEY = "wikicraft:sesion";

function leerSesion(){
    try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null;}
}

export function AuthProvider({ children }){
    const [user, setUser] = useState(leerSesion);

    const login = (datos) => {
        setUser(datos);
        try { localStorage.setItem(KEY, JSON.stringify(datos)); } catch {}
    };

    const logout = () => {
        setUser(null);
        try { localStorage.removeItem(KEY); } catch {}
    };

    return (
        <AuthContext.Provider value ={{ user, isLoggedIn: !!user, isAdmin: user?.role === "admin", login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}