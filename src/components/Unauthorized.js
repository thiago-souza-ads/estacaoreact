import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>Voce não tem permissão para acessar este conteudo.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Voltar</button>
            </div>
        </section>
    )
}

export default Unauthorized
