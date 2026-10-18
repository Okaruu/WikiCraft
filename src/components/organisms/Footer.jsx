import ContactSection from "./ContactSection"

export default function Footer() {
    return (
        <footer id="footer" className="row g-0 mx-0 mt-auto">
            <div className="footer-col footer-copy col-12 col-md-4">
                <p>&copy; Todos los derechos reservados por WikiCraft</p>
            </div>
            <div className="footer-col footer-contact col-12 col-md-4">
                <ContactSection />
            </div>
            <div className="footer-col footer-extra col-md-4 d-none d-md-flex" />
        </footer>
    )
}