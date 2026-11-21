import { useMemo } from "react";
import { items } from "../data/items";
import { itemsPorEstructura } from "../data/itemsPorEstructura";
import { useItemEdits } from "../hooks/useItemEdits";
import { formatearNombre } from "./formatearNombre";

const IMAGEN_POR_DEFECTO = "/imagenes/placeholder.webp";

export function useChestItem(zona) {
    const { ediciones } = useItemEdits();

    return useMemo (
        () => 
        (itemsPorEstructura[zona] ?? []).map((e) => {
            const base = items.find((i) => i.valor === e.valor) ?? {
                valor: e.valor,
                nombre: formatearNombre(e.valor),
                imagen: IMAGEN_POR_DEFECTO,
                informacion: "",
                atributos: "",
            };
            return {...base, ...ediciones[e.valor], probabilidad: e.probabilidad };
        }),
        [zona, ediciones]
    );
}