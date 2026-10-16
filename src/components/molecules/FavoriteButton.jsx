export default function FavoriteButton({ active, onClick, className= "fav-btn"}){
    const texto = active ? "Quitar de favoritos" : "Añadir a favoritos";
    return(
        <button type="button" className={className} onClick={onClick} title={texto} aria-label={texto}>
            <img src={active ? "/imagenes/full-heart.webp" : "/imagenes/empty-heart.webp"} alt="" />
        </button>
    );
}