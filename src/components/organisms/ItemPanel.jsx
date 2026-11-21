import { useState } from "react";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import AppLink from "../atoms/AppLink";
import FavoriteButton from "../molecules/FavoriteButton";
import ItemPanelHeader from "../molecules/ItemPanelHeader";
import ItemDetails from "./ItemDetails";
import ItemEditForm from "./ItemEditForm";
import { useAuth } from "../../hooks/useAuth";
import { useFavorites } from "../../hooks/useFavorites";
import { useItemEdits } from "../../hooks/useItemEdits";

export default function ItemPanel({ item, onClose }) {
    const { isLoggedIn, isAdmin } = useAuth();
    const { updateItem, resetItem } = useItemEdits();
    const { esFavorito, toggleFavorito } = useFavorites();
    const [editando, setEditando] = useState(false);
    const [aviso, setAviso] = useState(false);

    if (!item) return null;

    const alternarFavorito = () => {
        if (!isLoggedIn) { setAviso(true); return; }
        toggleFavorito(item);
    };
    const guardar = (borrador) => { updateItem(item.valor, borrador); setEditando(false); };
    const restaurar = () => { resetItem(item.valor); setEditando(false); };

    return (
        <div className="item-panel">
            <FavoriteButton
                className="fav-btn item-panel-fav"
                active={isLoggedIn && esFavorito(item.valor)}
                onClick={alternarFavorito}
            />
            <Button className="item-panel-close" onClick={onClose}>X</Button>
            <ItemPanelHeader item={item} />

            {aviso && !isLoggedIn && (
                <Text className="item-panel-aviso">
                    Inicia sesión para guardar favoritos. <AppLink to="/login">Iniciar sesión</AppLink>
                </Text>
            )}

            {isAdmin && !editando && <Button onClick={() => setEditando(true)}>Editar</Button>}

            {editando ? (
                <ItemEditForm item={item} onSave={guardar} onCancel={() => setEditando(false)} onReset={restaurar} />
            ) : (
                <ItemDetails item={item} />
            )}
        </div>
    );
}
