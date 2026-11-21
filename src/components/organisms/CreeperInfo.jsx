import { useState } from "react";
import Button from "../atoms/Button";
import Image from "../atoms/Image";
import Text from "../atoms/Text";
import AppLink from "../atoms/AppLink";

export default function CreeperInfo() {
    const [visible, setVisible] = useState(false);
    return (
        <div className="imagen-creeper">
            <Button className="btn-reset" onClick={() => setVisible((v) => !v)} aria-expanded={visible}>
                <Image src="/imagenes/logo-creeper.webp" alt="Creeper"/>
            </Button>
            <div className={`creeper-text ${visible ? "visible" : ""}`}>
                <Text>Si dudas o no confías en nosotros, te invitamos a verificar directamente la página oficial de Mojang, donde podrás corroborar la información que nosotros te ofrecemos.</Text>
                <div className="web-minecraft">
                    <AppLink href="https://www.minecraft.net/es-es">Sitio oficial de Minecraft</AppLink>
                </div>
            </div>
        </div>
    )
}