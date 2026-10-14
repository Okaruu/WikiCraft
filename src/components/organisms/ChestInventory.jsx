import { useState } from "react";
import Slot from "../atoms/Slot";

const TOTAL_SLOTS = 27;

export default function ChestInventory({ items, onSelectItem, onFirstOpen }){
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen((o) => !o);
        onFirstOpen?.();
    };

    return(
        <div className="chest-container">
            <div className="chest" onClick={toggle}>
                <img src={isOpen ? "/imagenes/chest_open.webp" : "/imagenes/chest_closed.webp"} alt="cofre"/>
            </div>
            {isOpen && (
                <div className="inventory">
                    <div className="inventory-grid">
                        {Array.from({ length: TOTAL_SLOTS}, (_, i) => (
                            <Slot key={i} item={items[i]} onSelect={onSelectItem}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}