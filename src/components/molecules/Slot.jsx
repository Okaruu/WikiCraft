import Button from "../atoms/Button";
import Image from "../atoms/Image";

export default function Slot ({ item, onSelect }){
    return (
        <Button className="slot" onClick={() => item && onSelect(item)} disabled={!item}>
            {item && (
                <Image className="item-icon" src={item.imagen} alt={item.nombre} title={item.nombre}/>
            )}
        </Button>
    );
}