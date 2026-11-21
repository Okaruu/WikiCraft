import { useLayoutEffect, useRef, useState } from "react";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

export default function AccordionItem({titulo, children}){
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState(0);
    const ref = useRef(null);

    useLayoutEffect(() =>{
        setHeight(open ? ref.current.scrollHeight : 0);
    }, [open, children]);
    
    return (
        <div className="accordion-item">
            <Button 
                className={`accordion-roggle ${open ? "active" : ""}`}
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                >
                    {titulo} <Text variant="span" className="arrow">⌄</Text>
            </Button>
            <div className="accordion-content" ref={ref} style={{maxHeight: height}}>
                {children}
            </div>
        </div>
    );
}