import AccordionItem from "../molecules/AccordionItem";
export default function ItemPanel({ item, onClose }){
    if(!item) return null;
    return(
        <div className="item-panel">
            <button className="item-panel-close" onClick={onClose}>X</button>
            <div className="item-panel-header">
                <img src={item.imagen} alt={item.nombre}/>
                <span>{item.nombre}</span>
            </div>
            <div className="accordion">
            <AccordionItem titulo="Información"><p>{item.informacion || "Sin información disponible."}</p></AccordionItem>
            <AccordionItem titulo="Probabilidad"><p>{item.probabilidad ? `Probabilidad de aparición: ${item.probabilidad}` : "Sin datos de probabilidad."}</p></AccordionItem>
            <AccordionItem titulo="Atributos"><p>{item.atributos || "Sin atributos registrados."}</p></AccordionItem>
            </div>
        </div>
    )
}