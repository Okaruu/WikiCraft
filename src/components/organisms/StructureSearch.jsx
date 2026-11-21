import { useState } from "react";
import Label from "../atoms/Label";
import Button from "../atoms/Button";
import AutocompleteInput from "../molecules/AutocompleteInput";
import { todasLasZonas } from "../../data/zonas";
import { normalizar } from "../../utils/normalizar";
import Text from "../atoms/Text";

export default function StructureSearch({onSelect}){
    const [texto, setTexto] = useState("");
    const [error, setError] = useState("");

    const buscar = () => {
        const t = normalizar(texto.trim());
        if(!t) { setError("Escribe el nombre de la estructura."); return; }
        const zona = todasLasZonas.find((z) => normalizar(z.nombre) === t || normalizar(z.valor) === t);
        if(!zona) { setError("No se encontró la estructura. Revise el nombre e intente de nuevo."); return; }
        setError("");
        onSelect(zona.valor);
    };

    const elegir = (z) => { setTexto(z.nombre); onSelect(z.valor); }

    return (
        <div className="structure-container d-flex flex-column align-items-center gap-2">
            <Label htmlFor="text-input">Ingresa el nombre de la estructura:</Label>
            <div className="d-flex flex-column flex-sm-row align-items-center gap-3">
                <AutocompleteInput id="text-input" placeholder="Ej: Aldea" opciones={todasLasZonas} value={texto} onChange={setTexto} onPick={elegir}/>
                <Button className="search-btn btn" onClick={buscar}>Buscar</Button>
            </div>
            {error && <Text className="search-error">{error}</Text>}
        </div>
    )
}