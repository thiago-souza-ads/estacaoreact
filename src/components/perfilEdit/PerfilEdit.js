import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import {toast, ToastContainer} from "react-toastify";
import style from "../home/Home.module.css";

const PerfilEdit = () => {
    const {setAuth, auth} = useContext(AuthContext);
    const {usuario} = auth;
    const navigate = useNavigate();
    const {accessToken} = auth;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [access, setAccess] = useState("");
    const [relatedEntity, setRelatedEntity] = useState(null);

    const BASE_URL_API = "https://enadejava-1685497331322.azurewebsites.net";
    const ALUNOS_URL = "/api/v1/alunos/";
    const PROFESSORES_URL = "/api/v1/professores/";
    const COORDENADORES_URL = "/api/v1/coordenadores/";
    const ADMINISTRADORES_URL = "/api/v1/administradores/";
    let nomeDoCurso = '';

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
                let data = response.data;
                console.log("Data:", data);
                setRelatedEntity(data);
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
        <>
            <div className={style.fullScreen}>
                <div style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column", marginTop: "20px", marginBottom: "20px", marginLeft: "20px", marginRight: "20px"}}>
                    <h2 style={{color: "#050505"}}>Editar Perfil</h2>
                    <div>
                        <p>Variáveis do Usuário</p>
                        <div>
                            <label htmlFor="name" style={{color: "#050505"}}>Nome:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={handleNameChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" style={{color: "#050505"}}>Login/Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <div>
                            <label style={{color: "#050505"}}>Acesso:</label>
                            <span style={{color: "#050505"}}>{access}</span>
                        </div>
                    </div>
                    {relatedEntity && (
                        <>
                            <p style={{color: "#050505"}}>Nivel de autorização: </p>
                            {access === 'Aluno' && (
                                <>
                                    <label style={{color: "#050505"}}>Curso:</label>
                                    <span style={{color: "#050505"}}>{ relatedEntity.curso.nome }</span>
                                    <label style={{color: "#050505"}}>Coordenador:</label>
                                    <span style={{color: "#050505"}}>{ relatedEntity.curso.coordenador.usuario.nome }</span>
                                </>
                            )}
                        </>
                    )}
                    <form onSubmit={handleSubmit}>
                        <button type="submit">Salvar</button>
                    </form>
                </div>

                <ToastContainer/>
            </div>
        </>


    );
};

export default PerfilEdit;
