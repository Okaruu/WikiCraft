import Button from "../atoms/Button";
import Image from "../atoms/Image";

export default function FavoriteButton({ active, onClick, className= "fav-btn"}){
    const texto = active ? "Quitar de favoritos" : "Añadir a favoritos";
    return(
        <Button type="button" className={className} onClick={onClick} title={texto} aria-label={texto}>
            <Image src={active ? "/imagenes/full-heart.webp" : "/imagenes/empty-heart.webp"} alt="" />
        </Button>
    );
}