export default function Slot ({ item, onSelect }){
    return (
        <div className="slot">
            {item && (
                <img
                    className="item-icon"
                    src={item.imagen}
                    alt={item.nombre}
                    title={item.nombre}
                    onClick={() => onSelect(item)}
                />
            )}
        </div>
    );
}