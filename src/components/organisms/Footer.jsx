import ContactSection from "./ContactSection"

export default function Footer() {
    return (
        <footer id="footer">
            <div className="footer-col footer-copy">
                <p>&copy; Todos los derechos reservados por WikiCraft</p>
            </div>
            <div className="footer-col footer-contact">
                <ContactSection />
            </div>
            <div className="footer-col footer-extra" />
        </footer>
    )
}