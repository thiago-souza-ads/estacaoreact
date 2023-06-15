import { useNavigate } from "react-router-dom";
import "./Unauthorized.module.css";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div className="container">
            <h1 className="title">Acesso não autorizado</h1>
            <br />
            <p className="subtitle">Você não tem permissão para acessar este conteúdo.</p>
            <div className="flexGrow">
                <button className="button" onClick={goBack}>Voltar</button>
            </div>
        </div>
    );
};

export default Unauthorized;
