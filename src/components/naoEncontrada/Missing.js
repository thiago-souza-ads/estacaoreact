import { Link } from "react-router-dom";
import "./Missing.module.css";

const Missing = () => {
    return (
        <div className="container">
            <h1 className="title">Oops!</h1>
            <p className="subtitle">404 Page Not Found</p>
            <div className="flexGrow">
                <Link className="link" to="/">
                    A pagina que voce tentou acessar não está disponivel ou não existe!
                </Link>
            </div>
        </div>
    );
};

export default Missing;
