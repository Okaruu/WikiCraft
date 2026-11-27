import Image from "../atoms/Image";
import Text from "../atoms/Text";

export default function ItemPanelHeader({item}){
    return (
        <div className="item-panel-header">
            <Image src={item.imagen} alt={item.nombre} />
            <Text variant="span">{item.nombre}</Text>
        </div>
    );
}