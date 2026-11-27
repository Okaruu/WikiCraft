import AccordionItem from "../molecules/AccordionItem";
import Text from "../atoms/Text";

export default function ItemDetails({ item }) {
    return (
        <div className="accordion">
            <AccordionItem titulo="Información">
                <Text>{item.informacion || "Sin información disponible."}</Text>
            </AccordionItem>
            <AccordionItem titulo="Probabilidad">
                <Text>{item.probabilidad ? `Probabilidad de aparición: ${item.probabilidad}` : "Sin datos de probabilidad."}</Text>
            </AccordionItem>
            <AccordionItem titulo="Atributos">
                <Text>{item.atributos || "Sin atributos registrados."}</Text>
            </AccordionItem>
        </div>
    );
}