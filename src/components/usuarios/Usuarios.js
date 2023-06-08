import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Usuarios = () => {
    const [users, setUsers] = useState([]);
    const API_URL = "http://enadejava-1685497331322.azurewebsites.net";
    // const API_URL = "http://localhost:8080";
    const USERS_URL = "/api/v1/usuarios/";
    const { auth } = useAuth();
    const { accessToken } = auth;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            axios
                .get(
                    API_URL +  USERS_URL,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${accessToken}`,
                        },
                    }
                )
                .then((response) => {
                    console.log(JSON.stringify(response?.data));
                    setUsers(response.data);
                })
                .catch((err) => {
                    console.error("Erro ao buscar a lista de usuários:", err);
                });
                setLoading(false);
        };
        fetchUsers();
    }, [accessToken]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h1>Lista de Usuários</h1>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            ) : (
                <div>Nenhum usuário encontrado.</div>
            )}
        </div>
    );
};

export default Usuarios;
