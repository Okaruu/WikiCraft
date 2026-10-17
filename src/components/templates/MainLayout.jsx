import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import CreeperInfo from "../organisms/CreeperInfo";

export default function Mainlayout({children}){
    return(
        <div className="layout">
            <Header />
            <section id="content" className="parrafos"> {children} </section>
            <CreeperInfo />
            <Footer />
        </div>
    )
}