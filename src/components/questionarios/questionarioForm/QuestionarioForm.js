import React, { useState } from "react";
import axios from "axios";

const QuestionarioForm = () => {
    const [tema, setTema] = useState("");
    const [etapa, setEtapa] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post("/api/questionarios", { tema, etapa });
            setTema("");
            setEtapa("");
        } catch (error) {
            console.error("Erro ao criar questionário:", error);
        }
    };

    return (
        <div>
            <h2>Criar Questionário</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="tema">Tema:</label>
                <input
                    type="text"
                    id="tema"
                    value={tema}
                    onChange={(event) => setTema(event.target.value)}
                />
                <br />
                <label htmlFor="etapa">Etapa:</label>
                <input
                    type="text"
                    id="etapa"
                    value={etapa}
                    onChange={(event) => setEtapa(event.target.value)}
                />
                <br />
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default QuestionarioForm;
