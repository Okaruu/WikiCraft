import Mainlayout from "../components/templates/MainLayout";
import { Text } from "../components/atoms/Text";
import FavoriteButton from "../components/molecules/FavoriteButton";
import { useFavorites } from "../hooks/useFavorites";

export default function FavoritesPage() {
    const { favoritos, toggleFavorito } = useFavorites();
    return (
        <Mainlayout>
            <Text variant="h2">Mis favoritos</Text>
            {favoritos.length === 0 ? (
                <Text>Aún no tienes ítems favoritos. Abre un cofre en el inicio y toca el corazón del ítem que quieras agregar.</Text>
            ) : (
                <div className="fav-grid">
                    {favoritos.map((f) => (
                        <div className="fav-card" key={f.valor}>
                            <img src={f.imagen} alt={f.nombre}/>
                            <span>{f.nombre}</span>
                            <FavoriteButton active onClick={() => toggleFavorito(f)} />
                        </div>
                    ))}
                </div>
            )}
        </Mainlayout>
    );
}