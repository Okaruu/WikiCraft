import { useEffect, useMemo, useState } from "react";
import { items } from "../data/items";
import { itemsPorEstructura } from "../data/itemsPorEstructura";
import { encontrarMundoDeZona } from "../utils/encontrarMundoDeZona"

export default function Home(){
    const [mundo, setMundo] = useState("");
    const [zona, setZona] = useState("");
    const [itemSeleccionado, setItemSeleccionado] = useState(null);

    useEffect(() =>{
        document.body.classList.remove("overworld", "nether", "end");
        if (mundo) document.body.classList.add(mundo);
    }, [mundo]);

    const itemsDelCofre = useMemo(
        ()=>
        (itemsPorEstructura[zona] ?? [])
        .map((e) => {
            const info = items.find((i) => i.valor === e.valor);
            return info ? { ...info, probabilidad: e.probabilidad } : null;
        })
        .filter(Boolean),
        [zona]
    );

    const elegirMundo = (m) => { setMundo(m); setZona(""); setItemSeleccionado(null); };
    const elegirZona = (z) => { setMundo(encontrarMundoDeZona(z) ?? ""); setZona(z); setItemSeleccionado(null); };
}