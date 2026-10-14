import SelectField from "../molecules/SelectField";
import { mundos } from "../../data/mundos";
import { zonasPorMundo } from "../../data/zonas";

export default function WorldSelectors({mundo, zona, onMundo, onZona}) {
    return (
        <div className="chest-row">
            <SelectField id="world" label="Mundo" value={mundo} options={mundos}
                placeholder="Selecciona un mundo" onChange={onMundo} 
                className="world-select" wrapperClass="world-selector" />

            <SelectField id="structure-select" label="Estructura" value={zona} options={zonasPorMundo[mundo] ?? []}
                placeholder="Selecciona una estructura" onChange={onZona} 
                className="structure-select" wrapperClass="structure-selector" />
        </div>
    )
}