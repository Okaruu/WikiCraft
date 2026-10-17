import { useState } from "react";
import { ItemsContext } from "./itemsContext";

const KEY = `wikicraft:items-editados`;

function leer(){
    try { return JSON.parse(localStorage.getItem(KEY)) ?? {}; } catch { return {}; }
}

export function ItemsProvider({ children }) {
    const [ediciones, setEdiciones] = useState(leer);

    const guardar = (nuevo) => {
        setEdiciones(nuevo);
        try { localStorage.setItem(KEY, JSON.stringify(nuevo)); } catch {}
    };

    const updateItem = (valor, {informacion, atributos}) =>
        guardar({ ...ediciones, [valor]: { informacion, atributos} });

    const resetItem = (valor) => {
        const resto = { ...ediciones };
        delete resto[valor];
        guardar(resto);
    };

    return (
        <ItemsContext.Provider value = {{ediciones, updateItem, resetItem}}>
            {children}
        </ItemsContext.Provider>
    )
}