import { useState } from "react";
import { Link } from "react-router-dom";
import AccordionItem from "../molecules/AccordionItem";
import FavoriteButton from "../molecules/FavoriteButton";
import { useAuth } from "../../hooks/useAuth";
import { useFavorites } from "../../hooks/useFavorites";

export default function ItemPanel({ item, onClose }){
    const { isLoggedIn } = useAuth();
    const { esFavorito, toggleFavorito} = useFavorites();
    const [ aviso, setAviso] = useState(false);

    if(!item) return null;

    const alternarFavorito = () => {
        if(!isLoggedIn) {setAviso(true); return;}
        toggleFavorito(item);
    }

    return(
        <div className="item-panel">
            <FavoriteButton
                className="fav-btn item-panel-fav"
                active={isLoggedIn && esFacorito(item.valor)}
                onClick={alternarFavorito}
            />

            <button className="item-panel-close" onClick={onClose}>X</button>
            <div className="item-panel-header">
                <img src={item.imagen} alt={item.nombre}/>
                <span>{item.nombre}</span>
            </div>
            
            {aviso && !isLoggedIn && (
                <p className="item-panel-aviso">
                    Inicia sesión para guardar favoritos. <Link to="/login">Iniciar sesión</Link> 
                </p>
            )}

            <div className="accordion">
            <AccordionItem titulo="Información"><p>{item.informacion || "Sin información disponible."}</p></AccordionItem>
            <AccordionItem titulo="Probabilidad"><p>{item.probabilidad ? `Probabilidad de aparición: ${item.probabilidad}` : "Sin datos de probabilidad."}</p></AccordionItem>
            <AccordionItem titulo="Atributos"><p>{item.atributos || "Sin atributos registrados."}</p></AccordionItem>
            </div>
        </div>
    )
}