import { useState } from "react";
import { Link } from "react-router-dom";
import AccordionItem from "../molecules/AccordionItem";
import FavoriteButton from "../molecules/FavoriteButton";
import { useAuth } from "../../hooks/useAuth";
import { useFavorites } from "../../hooks/useFavorites";
import { useItemEdits } from "../../hooks/useItemEdits";

export default function ItemPanel({ item, onClose }){
    const { isLoggedIn } = useAuth();
    const { updateItem, resetItem } = useItemedits();
    const [editando, setEditando] = useState(false);
    const [borrador, setBorrador] = useState({informacion: "", atributos: ""});
    const { esFavorito, toggleFavorito} = useFavorites();
    const [ aviso, setAviso] = useState(false);

    if(!item) return null;

    const empezarEdicion = () => {
        setBorrador({ informacion: item.inforamcion, atributos: item.atributos });
        setEditando(true);
    };

const guardar = () => { updateItem(item.valor, borrador); setEditando(false); };


    const alternarFavorito = () => {
        if(!isLoggedIn) {setAviso(true); return;}
        toggleFavorito(item);
    }

    return(
        <div className="item-panel">
            <FavoriteButton
                className="fav-btn item-panel-fav"
                active={isLoggedIn && esFavorito(item.valor)}
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

            {isAdmin && !editando && (
                <button type="button" onClick={empezarEdicion}>Editar</button>
            )}

            {editando ? (
                <div className="item-edit">
                    <label htmlFor="edit-info">Información</label>
                    <textarea id="edit-info" rows={5} value={borrador.informacion} onChange={(e) => setBorrador((b) => ({ ...b, informacion: e.target.value}))} />
                    <div className="item-edit-actions">
                        <button type="button" onClick={guardar}>Guardar</button>
                        <button type="button" onClick={() => setEditando(false)}>Cancelar</button>
                        <button type="button" onClick={() => { resetItem(item.valor); setEditando(false); }}>Restaurar original</button>
                    </div>
                </div>
            ): (
                <div className="accordion">
                    <AccordionItem titulo="Información"><p>{item.informacion || "Sin información disponible."}</p></AccordionItem>
                    <AccordionItem titulo="Probabilidad"><p>{item.probabilidad ? `Probabilidad de aparición: ${item.probabilidad}` : "Sin datos de probabilidad."}</p></AccordionItem>
                    <AccordionItem titulo="Atributos"><p>{item.atributos || "Sin atributos registrados."}</p></AccordionItem>
                </div>
            )}
        </div>
    )
}