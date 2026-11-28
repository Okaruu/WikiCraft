import { useEffect, useState } from "react";
import { ItemsContext } from "./itemsContext";
import { items as originales } from "../data/items";
import { api } from "../utils/api";

function porValor(lista) {
    return Object.fromEntries(lista.map((item) => [item.valor, item]));
}

export function ItemsProvider({ children }) {
    const [remotos, setRemotos] = useState({});

    useEffect(() => {
        let activo = true;
        api("/api/items").then((r) => {
            if (activo && r.ok && Array.isArray(r.data)) setRemotos(porValor(r.data));
        });
        return () => { activo = false; };
    }, []);

    const ediciones = {};
    for (const original of originales) {
        const remoto = remotos[original.valor];
        if (!remoto) continue;
        const informacion = remoto.informacion ?? "";
        const atributos = remoto.atributos ?? "";
        if (informacion !== (original.informacion ?? "") || atributos !== (original.atributos ?? "")) {
            ediciones[original.valor] = { informacion, atributos };
        }
    }

    const avisar = (mensaje) => {
        window.alert(mensaje);
        return { ok: false, mensaje };
    };

    const updateItem = async (valor, { informacion, atributos }) => {
        const item = remotos[valor];
        if (!item) return avisar("No se pudo guardar: los ítems no han cargado o este no está en la base de datos. Recarga la página.");

        const r = await api(`/api/items/${item.id}`, {
            method: "PUT",
            body: {
                valor: item.valor,
                nombre: item.nombre,
                imagen: item.imagen,
                informacion,
                atributos,
            },
        });

        if (!r.ok) {
            if (r.status === 401) return avisar("No se guardó: tu sesión no es válida o expiró. Vuelve a iniciar sesión.");
            if (r.status === 403) return avisar("No se guardó: tu cuenta no tiene permiso de administrador.");
            return avisar(r.data?.mensaje || "No se pudo guardar el ítem.");
        }

        setRemotos((actuales) => ({ ...actuales, [valor]: r.data }));
        return { ok: true };
    };

    const resetItem = async (valor) => {
        const original = originales.find((item) => item.valor === valor);
        if (!original) return avisar("No se encontró el texto original de este ítem.");
        return updateItem(valor, {
            informacion: original.informacion ?? "",
            atributos: original.atributos ?? "",
        });
    };

    return (
        <ItemsContext.Provider value={{ ediciones, updateItem, resetItem }}>
            {children}
        </ItemsContext.Provider>
    );
}