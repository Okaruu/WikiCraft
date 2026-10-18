import SelectField from "../molecules/SelectField";
import { mundos } from "../../data/mundos";
import { zonasPorMundo } from "../../data/zonas";

export default function WorldSelectors({mundo, zona, onMundo, onZona, animKey}) {
    return (
        <div className="chest-row row g-3 justify-content-center justify-content-md-start">
            <SelectField id="world" label="Mundo" value={mundo} options={mundos}
                placeholder="Selecciona un mundo" onChange={onMundo} 
                className="world-select" wrapperClass="world-selector col-12 col-sm-6 col-md-auto" animKey={animKey} />

            <SelectField id="structure-select" label="Estructura" value={zona} options={zonasPorMundo[mundo] ?? []}
                placeholder="Selecciona una estructura" onChange={onZona} 
                className="structure-select" wrapperClass="structure-selector col-12 col-sm-6 col-md-auto" animKey={animKey} />
        </div>
    )
}