import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import ContactSection from "../organisms/ContactSection";
import CreeperInfo from "../organisms/CreeperInfo";

export default function Mainlayout({children}){
    return(
        <>
            <Header/>
            <section id="content" className="parrafos">{children}</section>
            <CreeperInfo/>
            <ContactSection/>
            <Footer/>
        </>
    )
}