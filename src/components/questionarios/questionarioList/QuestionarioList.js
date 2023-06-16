import React, { useEffect, useState } from "react";
import axios from "axios";

const QuestionarioList = () => {
    const [questionarios, setQuestionarios] = useState([]);

    useEffect(() => {
        fetchQuestionarios();
    }, []);

    const fetchQuestionarios = async () => {
        try {
            const response = await axios.get("/api/questionarios");
            setQuestionarios(response.data);
        } catch (error) {
            console.error("Erro ao buscar questionários:", error);
        }
    };

    const deleteQuestionario = async (id) => {
        try {
            await axios.delete(`/api/questionarios/${id}`);
            fetchQuestionarios();
        } catch (error) {
            console.error("Erro ao excluir questionário:", error);
        }
    };

    return (
        <div>
            <h1>Lista de Questionários</h1>
            {questionarios.length === 0 ? (
                <p>Nenhum questionário encontrado.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tema</th>
                        <th>Etapa</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {questionarios.map((questionario) => (
                        <tr key={questionario.id}>
                            <td>{questionario.id}</td>
                            <td>{questionario.tema}</td>
                            <td>{questionario.etapa}</td>
                            <td>
                                <button onClick={() => deleteQuestionario(questionario.id)}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default QuestionarioList;
