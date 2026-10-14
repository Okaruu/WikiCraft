import { zonasPorMundo } from "../data/zonas";

export function encontrarMundoDeZona(valorZona) {
    return Object.keys(zonasPorMundo).find((m) => zonasPorMundo[m].some((z) => z.valor === valorZaona)) ?? null;
}