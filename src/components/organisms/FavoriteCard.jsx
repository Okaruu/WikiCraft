import Image from "../atoms/Image";
import Text from "../atoms/Text";
import FavoriteButton from "../molecules/FavoriteButton";

export default function FavoriteCard({item, onRemove}){
    return(
        <div className="fav-card h100">
            <Image src={item.imagen} alt={item.nombre} />
            <Text variant="span">{item.nombre}</Text>
            <FavoriteButton active onClick={() => onRemove(item)}/>
        </div>
    );
}