import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import {toast, ToastContainer} from "react-toastify";

const PerfilEdit = () => {
    const {setAuth, auth} = useContext(AuthContext);
    const {usuario} = auth;
    const navigate = useNavigate();
    const {accessToken} = auth;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [access, setAccess] = useState("");
    const [relatedEntity, setRelatedEntity] = useState(null);

    const BASE_URL_API = "http://localhost:8080";
    const ALUNOS_URL = "/api/v1/alunos/";
    const PROFESSORES_URL = "/api/v1/professores/";
    const COORDENADORES_URL = "/api/v1/coordenadores/";
    const ADMINISTRADORES_URL = "/api/v1/administradores/";

    useEffect(() => {
        loadUserData();
        loadRelatedEntity();
    }, []);

    const loadUserData = () => {
        setName(usuario.nome);
        setEmail(usuario.login);
        setAccess(usuario.roles[0].nome);
    };

    const loadRelatedEntity = async () => {
        let endpoint = getUrl();
        axios
            .get(
                endpoint,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                }
            )
            .then((response) => {
                setRelatedEntity(response.data);
                toast.success("Perfil identificado!");
            })
            .catch((err) => {
                toast.error("Erro ao identificar o perfil!");
            });
    };
    const getUrl = () => {
        switch (usuario.authorities[0].authority) {
            case "Administrador":
                return BASE_URL_API + ADMINISTRADORES_URL + usuario.id;
            case "Coordenador":
                return BASE_URL_API + COORDENADORES_URL + usuario.id;
            case "Professor":
                return BASE_URL_API + PROFESSORES_URL + usuario.id;
            default:
                return BASE_URL_API + ALUNOS_URL + usuario.id;
        }
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.put(`${BASE_URL_API}/api/v1/usuarios/${usuario.id}/`, {usuario}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
        });
        const updatedUserData = {
            ...usuario,
            nome: name,
            login: email,
        };

        try {
            const response = await axios.put("/api/update-profile", updatedUserData);
            // Atualizar os dados de usuário no contexto ou fazer outras ações necessárias
            console.log("Dados do perfil atualizados:", response.data);
            // Reiniciar os campos após a submissão
            setName("");
            setEmail("");
        } catch (error) {
            console.log("Erro ao atualizar o perfil:", error);
        }
    };

    return (
        <div>
            <h2>Editar Perfil</h2>
            <div>
                <p>Variáveis do Usuário</p>
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Login/Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div>
                    <label>Acesso:</label>
                    <span>{access}</span>
                </div>
            </div>
            {relatedEntity && (
                <div>
                    <p>Variáveis da Classe</p>
                    {access === 'Aluno' && (
                        <div>
                            <label>Curso:</label>
                            <span>{relatedEntity.curso?.nome}</span>
                        </div>
                    )}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <button type="submit">Salvar</button>
            </form>
            <ToastContainer/>
        </div>

    );
};

export default PerfilEdit;
