import { useState } from "react";
import Button from "../atoms/Button";
import TextAreaField from "../molecules/TextAreaField";

export default function ItemEditForm({item, onSave, onCancel, onReset }){
    const [borrador, setBorrador] = useState ({
        informacion: item.informacion ?? "",
        atributos: item.atributos ?? "",
    });

    const cambiar = (campo) => (e) => 
        setBorrador((b) => ({...b, [campo]: e.target.value}));

    return (
        <div className="item-edit">
            <TextAreaField id="edit-info" label="Información" rows={5}
                value={borrador.informacion} onChange={cambiar("informacion")}/>
            <TextAreaField id="edit-attr" label="Atributos" rows={5}
                value={borrador.atributos} onChange={cambiar("atributos")}/>
                <div className="item-edit-actions">
                    <Button onClick={() => onSave(borrador)}>Guardar</Button>
                    <Button onClick={onCancel}>Cancelar</Button>
                    <Button onClick={onReset}>Restaurar original</Button>
                </div>
        </div>
    )
}