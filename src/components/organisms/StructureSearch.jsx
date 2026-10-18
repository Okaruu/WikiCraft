import { useState } from "react";
import Label from "../atoms/Label";
import Button from "../atoms/Button";
import AutocompleteInput from "../molecules/AutocompleteInput";
import { todasLasZonas } from "../../data/zonas";
import { normalizar } from "../../utils/normalizar";

export default function StructureSearch({onSelect}){
    const [texto, setTexto] = useState("");

    const buscar = () => {
        const t = normalizar(texto.trim());
        if(!t) return alert("Por favor escribe el nombre de una estructura.");
        const zona = todasLasZonas.find((z) => normalizar(z.nombre) === t || normalizar(z.valor) === t);
        if(!zona) return alert("No se encontró la estructura. Revise el nombre e intente de nuevo.");
        onSelect(zona.valor);
    };

    const elegir = (z) => { setTexto(z.nombre); onSelect(z.valor); }

    return (
        <div className="structure-container d-flex flex-column align-items-center gap-2">
            <Label htmlFor="text-input">Ingresa el nombre de la estructura:</Label>
            <div className="d-flex flex-column flex-sm-row align-items-center gap-3">
                <AutocompleteInput value={texto} onChange={setTexto} onPick={elegir}/>
                <Button className="search-btn btn" onClick={buscar}>Buscar</Button>
            </div>
        </div>
    )
}