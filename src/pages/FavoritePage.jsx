import Text from "../components/atoms/Text";
import FavoritesGrid from "../components/organisms/FavoritesGrid";
import MainLayout from "../components/templates/MainLayout";

export default function FavoritePage() {
    const { favoritos, toggleFavorito } = useFavorites();
    return (
        <MainLayout>
            <Text variant="h2">Mis favoritos</Text>
            {favoritos.lenght === 0 ? (
                <Text>A+un no tienes ítems favoritos. Abre un cofre al inicio y toca el corazón para agregar a favoritos.</Text>
            ) : (
                <FavoritesGrid favoritos={favoritos} onRemove={toggleFavorito}/>
            )}
        </MainLayout>
    );
}