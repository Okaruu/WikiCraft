import Text from "../components/atoms/Text";
import FavoritesGrid from "../components/organisms/FavoritesGrid";
import MainLayout from "../components/templates/MainLayout";
import { useFavorites } from "../hooks/useFavorites";

export default function FavoritePage() {
    const { favoritos, toggleFavorito } = useFavorites();
    return (
        <MainLayout>
            <Text variant="h2">Mis favoritos</Text>
            {favoritos.length === 0 ? (
                <Text>Aún no tienes ítems favoritos. Abre un cofre al inicio y toca el corazón para agregar a favoritos.</Text>
            ) : (
                <FavoritesGrid favoritos={favoritos} onRemove={toggleFavorito}/>
            )}
        </MainLayout>
    );
}