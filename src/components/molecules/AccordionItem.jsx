import { useLayoutEffect, useRef, useState } from "react";

export default function AccordionItem({titulo, children}){
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState(0);
    const ref = useRef(null);

    useLayoutEffect(() =>{
        setHeight(open ? ref.current.scrollHeight : 0);
    }, [open, children]);

    return (
        <div className="accordion-item">
            <button className={`accordion-toggle ${open ? "active" : ""}`} onClick={() => setOpen((o) => !o)}>
                {titulo} <span className="arrow">⌄</span>
            </button>
            <div className="accordion-content" ref={ref} style={{maxHeight: height}}>
                {children}
            </div>
        </div>
    );
}