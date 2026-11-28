import { useState, useEffect, useCallback } from "react";
import { FavoritesContext } from "./favoritesContext";
import { useAuth } from "../hooks/useAuth";
import { api } from "../utils/api";

export function FavoritesProvider({ children }) {
    const { user, logout } = useAuth();
    const userId = user?.id ?? null;
    const [favoritos, setFavoritos] = useState([]);

    const manejarNoAutorizado = useCallback((r) => {
        if (r.status === 401) {
            logout();
            return true;
        }
        return false;
    }, [logout]);

    useEffect(() => {
        if (!userId) {
            setFavoritos([]);
            return;
        }
        let cancelado = false;
        (async () => {
            const r = await api(`/api/usuarios/${userId}/favoritos`);
            if (cancelado) return;
            if (r.ok && Array.isArray(r.data)) setFavoritos(r.data);
            else manejarNoAutorizado(r);
        })();
        return () => {
            cancelado = true;
        };
    }, [userId, manejarNoAutorizado]);

    const esFavorito = (valor) => favoritos.some((f) => f.valor === valor);

    const toggleFavorito = async (item) => {
        if (!userId) return;

        const eraFavorito = esFavorito(item.valor);
        const anterior = favoritos;

        setFavoritos(
            eraFavorito
                ? favoritos.filter((f) => f.valor !== item.valor)
                : [...favoritos, { valor: item.valor, nombre: item.nombre, imagen: item.imagen }]
        );

        const r = await api(
            `/api/usuarios/${userId}/favoritos/${encodeURIComponent(item.valor)}`,
            { method: eraFavorito ? "DELETE" : "POST" }
        );

        if (!r.ok) {
            setFavoritos(anterior);
            manejarNoAutorizado(r);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favoritos, esFavorito, toggleFavorito }}>
            {children}
        </FavoritesContext.Provider>
    );
}