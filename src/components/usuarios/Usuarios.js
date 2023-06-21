import React, {useEffect, useState} from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash, faUndo} from "@fortawesome/free-solid-svg-icons";
import "./Usuarios.module.css";
import style from "../home/Home.module.css";

const Usuarios = () => {
    const [users, setUsers] = useState([]);
    const API_URL = "https://enadejava-1685497331322.azurewebsites.net";
    // const API_URL = "http://localhost:8080";
    const USERS_URL = "/api/v1/usuarios";
    const {auth} = useAuth();
    const {accessToken} = auth;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            axios
                .get(
                    API_URL + USERS_URL,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${accessToken}`,
                        },
                    }
                )
                .then((response) => {
                    setUsers(response.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Erro ao buscar a lista de usuários:", err);
                    setLoading(false);
                });
        };
        fetchUsers();
        setLoading(false);

    }, [accessToken]);

    if (loading) {
        return <div>Carregando...</div>;
    }
    const criarUsuario = async () => {
        // Lógica para criar um novo usuário
        try {
            const response = await axios.post(
                API_URL + USERS_URL,
                {
                    // Dados do novo usuário
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                }
            );
            setUsers([...users, response.data]); // Adiciona o novo usuário à lista
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
        }
    };

    const editarUsuario = async (userId) => {
        // Lógica para editar um usuário existente
        try {
            // Obtenha os detalhes do usuário pelo ID, se necessário
            const user = users.find((user) => user.id === userId);
            if (!user) {
                console.error("Usuário não encontrado");
                return;
            }

            // Faça as alterações necessárias nos dados do usuário

            const response = await axios.put(
                `${API_URL}${USERS_URL}/${userId}`,
                user,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                }
            );

            // Atualize a lista de usuários com os dados atualizados
            const updatedUsers = users.map((u) => (u.id === userId ? response.data : u));
            setUsers(updatedUsers);
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
        }
    };

    const excluirUsuario = async (userId) => {
        // Lógica para excluir um usuário
        try {
            await axios.delete(`${API_URL}${USERS_URL}/${userId}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            });

            // Remova o usuário excluído da lista
            const updatedUsers = users.filter((u) => u.id !== userId);
            setUsers(updatedUsers);
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
        }
    };

    function roleChange(user, value) {
        user.role.name = value;
    }

    return (
       <div className={style.fullScreen}>
           <div className="container mt-5 justify-content-center text-center justify-content-center" style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
               <h1 className="text-center" style={{color: "#010303", fontSize: "40px", textAlign:  "center"}}>Lista de Usuários</h1>
               {loading ? (
                   <div>Carregando...</div>
               ) : (
                   <table className="table table-striped table-bordered table-width"style={{ color: "#010303", fontSize: "20px", textAlign:  "center", width:  "80%", borderRadius:  "10px", backgroundColor: "#E5E5E5"}}>
                       <thead className="table-header">
                       <tr>
                           <th className="column-id" style={{ color: "#010303", fontSize: "20px", textAlign:  "center"}}>ID</th>
                           <th className="column-nome" style={{ color: "#010303", fontSize: "20px", textAlign:  "center"}}>Nome</th>
                           <th className="column-login" style={{ color: "#010303", fontSize: "20px", textAlign:  "center"}}>Login</th>
                           <th className="column-role" style={{ color: "#010303", fontSize: "20px", textAlign:  "center"}}>Perfil</th>
                           <th className="column-situacao" style={{ color: "#010303", fontSize: "20px", textAlign:  "center"}}>Situação</th>
                           <th className="column-editar" style={{ color: "#010303", fontSize: "20px", textAlign:  "center"}}>Editar</th>
                           <th className="column-excluir" style={{ color: "#010303", fontSize: "20px", textAlign:  "center"}}>Excluir</th>
                       </tr>
                       </thead>
                       <tbody>
                       {users.length > 0 ? (
                           users.map((user) => (
                               <tr key={user.id}>
                                   <td className="column-id text-right">{user.id}</td>
                                   <td className="column-nome text-left">{user.nome}</td>
                                   <td className="column-login text-left">{user.login}</td>
                                   <td className="column-role">
                                       <select
                                           className="form-select"
                                           value={user.roles[0]?.nome}
                                           onChange={(e) => roleChange(user, e.target.value)}
                                       >
                                           <option value="">Selecionar</option>
                                           <option value="Administrador">Administrador</option>
                                           <option value="Coordenador">Coordenador</option>
                                           <option value="Professor">Professor</option>
                                           <option value="Aluno">Aluno</option>
                                       </select>
                                   </td>
                                   <td className="column-situacao text-center">
                                       {user.ativo ? "Ativo" : <span className="text-danger">Inativo</span>}
                                   </td>
                                   <td className="column-editar">
                                       <FontAwesomeIcon
                                           icon={faEdit}
                                           onClick={() => editarUsuario(user.id)}
                                       />
                                   </td>
                                   <td className="column-excluir" style={{color: "#f50909", fontSize: "20px", textAlign:  "center"}}>
                                       <FontAwesomeIcon
                                           icon={user.ativo ? faTrash : faUndo}
                                           onClick={() => excluirUsuario(user.id)}
                                           className={user.ativo ? "" : "text-danger"}
                                       />
                                   </td>
                               </tr>
                           ))
                       ) : (
                           <tr>
                               <td colSpan="7">Nenhum usuário encontrado.</td>
                           </tr>
                       )}
                       </tbody>
                       <tfoot className="table-footer">
                       <tr>
                           <td colSpan="7">Total de Usuários: {users.length}</td>
                       </tr>
                       </tfoot>
                   </table>
               )}

               <button className="btn btn-primary" onClick={criarUsuario}>
                   Adicionar Usuário
               </button>
           </div>
        </div>

    );


};

export default Usuarios;
