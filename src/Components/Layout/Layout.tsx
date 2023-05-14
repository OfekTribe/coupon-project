import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./Layout.css";
import Routing from "./Routing/Routing";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <header>
                <Header />
            </header>
            <main>
                <Routing />
            </main>
            <footer>
                <Footer />
            </footer>

        </div>
    );
}

export default Layout;
