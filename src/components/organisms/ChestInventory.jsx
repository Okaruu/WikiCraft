import { useState } from "react";
import Slot from "../molecules/Slot";
import Button from "../atoms/Button";
import Image from "../atoms/Image";

const TOTAL_SLOTS = 27;

export default function ChestInventory({ items, onSelectItem, onOpen }){
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen((o) => !o);
        onOpen?.();
    };

    return(
        <div className="chest-container">
            <Button className="chest btn-reset" onClick={toggle} aria-expanded={isOpen}>
                <Image src={isOpen ? "/imagenes/chest_open.webp" : "/imagenes/chest_closed.webp"} alt="cofre" />
            </Button>
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