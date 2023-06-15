import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUndo } from "@fortawesome/free-solid-svg-icons";
import "./Alunos.module.css";

const Alunos = () => {
    const [alunos, setAlunos] = useState([]);
    const API_URL = "https://enadejava-1685497331322.azurewebsites.net";
    // const API_URL = "http://localhost:8080";
    const ALUNOS_URL = "/api/v1/alunos";
    const { auth } = useAuth();
    const { accessToken } = auth;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlunos = async () => {
            axios
                .get(API_URL + ALUNOS_URL, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((response) => {
                    setAlunos(response.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Erro ao buscar a lista de alunos:", err);
                    setLoading(false);
                });
        };
        fetchAlunos();
        setLoading(false);
    }, [accessToken]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    const criarAluno = async () => {
        // Lógica para criar um novo aluno
        try {
            const response = await axios.post(
                API_URL + ALUNOS_URL,
                {
                    // Dados do novo aluno
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setAlunos([...alunos, response.data]); // Adiciona o novo aluno à lista
        } catch (error) {
            console.error("Erro ao criar aluno:", error);
        }
    };

    const editarAluno = async (alunoId) => {
        // Lógica para editar um aluno existente
        try {
            // Obtenha os detalhes do aluno pelo ID, se necessário
            const aluno = alunos.find((aluno) => aluno.id === alunoId);
            if (!aluno) {
                console.error("Aluno não encontrado");
                return;
            }

            // Faça as alterações necessárias nos dados do aluno

            const response = await axios.put(
                `${API_URL}${ALUNOS_URL}/${alunoId}`,
                aluno,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            // Atualize a lista de alunos com os dados atualizados
            const updatedAlunos = alunos.map((a) =>
                a.id === alunoId ? response.data : a
            );
            setAlunos(updatedAlunos);
        } catch (error) {
            console.error("Erro ao editar aluno:", error);
        }
    };

    const excluirAluno = async (alunoId) => {
        // Lógica para excluir um aluno
        try {
            await axios.delete(`${API_URL}${ALUNOS_URL}/${alunoId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Remova o aluno excluído da lista
            const updatedAlunos = alunos.filter((a) => a.id !== alunoId);
            setAlunos(updatedAlunos);
        } catch (error) {
            console.error("Erro ao excluir aluno:", error);
        }
    };

    function roleChange(aluno, value) {
        aluno.role.name = value;
    }

    return (
        <div className="container mt-5 justify-content-center text-center">
            <h1 className="text-center">Lista de Alunos</h1>
            {loading ? (
                <div>Carregando...</div>
            ) : (
                <table className="table table-striped table-bordered table-width">
                    <thead className="table-header">
                    <tr>
                        <th className="column-id">ID</th>
                        <th className="column-nome">Nome</th>
                        <th className="column-login">Login</th>
                        <th className="column-role">Perfil</th>
                        <th className="column-situacao">Situação</th>
                        <th className="column-editar">Editar</th>
                        <th className="column-excluir">Excluir</th>
                    </tr>
                    </thead>
                    <tbody>
                    {alunos.length > 0 ? (
                        alunos.map((aluno) => (
                            <tr key={aluno.id}>
                                <td className="column-id text-right">{aluno.id}</td>
                                <td className="column-nome text-left">{aluno.nome}</td>
                                <td className="column-login text-left">{aluno.login}</td>
                                <td className="column-role">
                                    <select
                                        className="form-select"
                                        value={aluno.roles[0]?.nome}
                                        onChange={(e) => roleChange(aluno, e.target.value)}
                                    >
                                        <option value="">Selecionar</option>
                                        <option value="Administrador">Administrador</option>
                                        <option value="Coordenador">Coordenador</option>
                                        <option value="Professor">Professor</option>
                                        <option value="Aluno">Aluno</option>
                                    </select>
                                </td>
                                <td className="column-situacao text-center">
                                    {aluno.ativo ? (
                                        "Ativo"
                                    ) : (
                                        <span className="text-danger">Inativo</span>
                                    )}
                                </td>
                                <td className="column-editar">
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        onClick={() => editarAluno(aluno.id)}
                                    />
                                </td>
                                <td className="column-excluir">
                                    <FontAwesomeIcon
                                        icon={aluno.ativo ? faTrash : faUndo}
                                        onClick={() => excluirAluno(aluno.id)}
                                        className={aluno.ativo ? "" : "text-danger"}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">Nenhum aluno encontrado.</td>
                        </tr>
                    )}
                    </tbody>
                    <tfoot className="table-footer">
                    <tr>
                        <td colSpan="7">Total de Alunos: {alunos.length}</td>
                    </tr>
                    </tfoot>
                </table>
            )}

            <button className="btn btn-primary" onClick={criarAluno}>
                Adicionar Aluno
            </button>
        </div>
    );
};

export default Alunos;
