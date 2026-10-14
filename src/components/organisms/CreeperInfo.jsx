import { useState } from "react";

export default function CreeperInfo() {
    const [visible, setVisible] = useState(false);
    return (
        <div className="imagen-creeper">
            <a href="#" onClick={(e) => {e.preventDefault(); setVisible((v) => !v); }}>
                <img src="/imagenes/logo-creeper.webp" alt="Creeper" />
            </a>
            <div className={`creeper-text ${visible ? "visible": ""}`}>
                Si dudas o no confías en nosotros, te invitamos a verificar directamente la página oficial de Mojang, donde podrás corroborar la información que nosotros te ofrecemos.
                <div className="web-minecraft"><a href="https://www.minecraft.net/es-es">Sitio oficial de Minecraft</a></div>
            </div>
        </div>
    )
}