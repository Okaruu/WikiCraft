import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import CreeperInfo from "../organisms/CreeperInfo";

export default function Mainlayout({children}){
    return(
        <div className="layout d-flex flex-column min-vh-100">
            <Header />
            <section id="content" className="parrafos container-lg my-3 py-2"> {children} </section>
            <CreeperInfo />
            <Footer />
        </div>
    )
}