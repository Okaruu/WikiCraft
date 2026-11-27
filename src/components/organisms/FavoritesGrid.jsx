import FavoriteCard from "./FavoriteCard";

export default function FavoritesGrid({ favoritos, onRemove}){
    return(
        <div className="fav-grid row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
            {favoritos.map((f) => (
                <div className="col" key={f.valor}>
                    <FavoriteCard item={f} onRemove={onRemove}/>
                </div>
            ))}
        </div>
    );
}