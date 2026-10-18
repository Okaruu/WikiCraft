import { useEffect, useMemo, useState } from "react";
import { items } from "../data/items";
import { itemsPorEstructura } from "../data/itemsPorEstructura";
import { encontrarMundoDeZona } from "../utils/encontrarMundoDeZona"
import { useMusic } from "../hooks/useMusic";
import { Text } from "../components/atoms/Text";
import { useItemEdits } from "../hooks/useItemEdits";
import Mainlayout from "../components/templates/MainLayout";
import StructureSearch from "../components/organisms/StructureSearch";
import WorldSelectors from "../components/organisms/WorldSelectors";
import ChestInventory from "../components/organisms/ChestInventory";
import ItemPanel from "../components/organisms/ItemPanel";

const formatear = (v) => v.replaceAll("_", " ").replace(/^./, (c) => c.toUpperCase());

export default function Home(){
    const [mundo, setMundo] = useState("");
    const [zona, setZona] = useState("");
    const [valorSeleccionado, setValorSeleccionado] = useState(null);
    const { ediciones } = useItemEdits();
    const { iniciar: iniciarMusica } = useMusic();
    const [saltos, setSaltos] = useState(0);

    useEffect(() => {
        if (!mundo) return;
        document.body.classList.add(mundo);
        return () => document.body.classList.remove(mundo);
    }, [mundo]);

    const itemsDelCofre = useMemo(
        ()=>
            (itemsPorEstructura[zona] ?? []).map((e) => {
                const base = items.find((i) => i.valor === e.valor) ?? {
                    valor : e.valor, nombre: formatear(e.valor),
                    imagen: "/imagenes/placeholder.webp", informacion: "", atributos: "",
                };
                return { ...base, ...ediciones[e.valor],probabilidad: e.probabilidad };
            }), 
        [zona, ediciones]
    );

    const itemSeleccionado = itemsDelCofre.find((i) => i.valor === valorSeleccionado) ?? null;

    const elegirMundo = (m) => { setMundo(m); setZona(""); setValorSeleccionado(null); };
    const elegirZona = (z) => { setZona(z); setValorSeleccionado(null); };
    const buscarZona = (z) => {
        if(z !== zona) setSaltos((n) => n + 1);
        setMundo(encontrarMundoDeZona(z) ?? "");
        elegirZona(z);
    };

    return (
        <Mainlayout>
            <Text variant="h2">Resumen de la página</Text>
            <Text>
                Esta página esta centrada en contener la mayoría de información acerca de la probabilidad de aparición de items
                dentro de un cofre dependiendo la estructura en la que se encuentren, mostrando su información y sus atributos.
            </Text>
            <StructureSearch onSelect={buscarZona} />
            <WorldSelectors mundo={mundo} zona={zona} onMundo={elegirMundo} onZona={elegirZona} animKey={saltos}/>
            <div className="chest-and-panel row g-4 justify-content-center justify-content-lg-start">
                <div className="col-12 col-lg-auto d-flex justify-content-center">
                    <ChestInventory items={itemsDelCofre} onSelectItem={(i) => setValorSeleccionado(i.valor)} onFirstOpen={iniciarMusica} />
                </div>
                <div className="col-12 col-lg-auto d-flex justify-content-center">
                    <ItemPanel key={itemSeleccionado?.valor} item={itemSeleccionado} onClose={() => setValorSeleccionado(null)} />
                </div>
            </div>
        </Mainlayout>
    );
}