import AppLink from "../atoms/AppLink";
import Text from "../atoms/Text";

export default function ContactSection(){
    return (
        <section>
            <div className="contacto-content">
                <Text variant="h2" className="text-contact">Contacto</Text>
                <div className="contactos">
                    <AppLink href="https://workspace.google.com/intl/es-419/gmail/">Correo</AppLink>
                    <AppLink href="https://www.instagram.com/wikicraft.cl/">Instagram</AppLink>
                </div>
            </div>
        </section>
    );
}