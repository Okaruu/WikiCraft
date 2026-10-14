import { useState } from "react";
import Input from "../atoms/Input";
import { useDebounce } from "../../hooks/useDebounce";
import { normalizar } from "../../utils/normalizar";
import { todasLasZonas } from "../../data/zonas";

export default function AutocompleteInput({ value, onChange, onPick }){
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(-1);
    const texto = useDebounce(value.trim(), 150);
    const sugerencias = texto
        ? todasLasZonas.filter((z) => normalizar(z.nombre).includes(normalizar(texto))) : [];

    const elegir = (z) => { onPick(z); setOpen(false); setActive(-1);};

    const onKeyDown = (e) => {
        if(!open || sugerencias.length === 0) return;
        if(e.key === "ArrowDown") {e.preventDefault(); setActive((a) => (a + 1) % sugerencias.length); }
        else if (e.key === "ArrowUp") {e.preventDefault(); setActive((a) => (a - 1 + sugerencias.length) % sugerencias.length); }
        else if (e.key === "Enter" && active >= 0) {e.preventDefault(); elegir(sugerencias[active]); }
        else if (e.key === "Escape") setOpen(false);
    };

    return (
        <div className="autocomplete-wrapper">
            <Input
                id="text-input" className="structure-input" placeholder="Ej: Aldea"
                maxLength={30} autoComplete="off" value={value}
                onChange={(e) => { onChange(e.target.value); setOpen(true); setActive(-1); }}
                onKeyDown={onKeyDown} onBlur={() => setOpen(false)}
            />
            {open && sugerencias.length > 0 && (
                <ul className="suggestions-list">
                    {sugerencias.map((z, i)=>(
                        <li key={z.valor} className={i === active ? "active" : ""} onMouseDown={(e) => {e.preventDefault(); elegir(z); }}>
                            {z.nombre}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}