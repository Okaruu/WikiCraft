import { Text } from "../atoms/Text";

export default function ContactSection(){
    return (
        <section>
            <div className="contacto-content">
                <Text variant="h2" className="text-contact">Contacto</Text>
                <div className="contactos">
                    <a href="https://workspace.google.com/intl/es-419/gmail/">Correo</a>
                    <a href="https://www.instagram.com/wikicraft.cl/">Instagram</a>
                </div>
            </div>
        </section>
    );
}