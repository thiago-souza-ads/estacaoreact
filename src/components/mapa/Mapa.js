import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './Mapa.module.css';
import useAuth from "../../hooks/useAuth";

const Mapa = () => {
    const API_URL = "https://enadejava-1685497331322.azurewebsites.net";
    // const API_URL = "http://localhost:8080";
    const MAPAS_URL = "/api/v1/mapas";
    const {auth} = useAuth();
    const {accessToken} = auth;
    const [mapas, setMapas] = useState([]);
    const [anoBase, setAnoBase] = useState('');
    const [editingMapa, setEditingMapa] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMapas();
    }, []);

    const fetchMapas = async () => {
        try {
            const response = await axios.get(API_URL + MAPAS_URL, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            });
            console.log(response.data);
            setMapas(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar os mapas:', error);
            setLoading(false);
        }
    };

    const createMapa = async () => {
        try {
            const response = await axios.post('/api/mapas', { anoBase }); // Adjust the API endpoint as needed
            setMapas([...mapas, response.data]);
            setAnoBase('');
        } catch (error) {
            console.error('Erro ao criar o mapa:', error);
        }
    };

    const deleteMapa = async (mapaId) => {
        try {
            await axios.delete(`/api/mapas/${mapaId}`); // Adjust the API endpoint as needed
            setMapas(mapas.filter((mapa) => mapa.id !== mapaId));
        } catch (error) {
            console.error('Erro ao excluir o mapa:', error);
        }
    };

    const updateMapa = async () => {
        try {
            const response = await axios.put(`/api/mapas/${editingMapa.id}`, editingMapa); // Adjust the API endpoint as needed
            setMapas(mapas.map((mapa) => (mapa.id === response.data.id ? response.data : mapa)));
            cancelEdit();
        } catch (error) {
            console.error('Erro ao atualizar o mapa:', error);
        }
    };

    const editMapa = (mapa) => {
        setEditingMapa(mapa);
    };

    const cancelEdit = () => {
        setEditingMapa(null);
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className={styles.mapaContainer}>
            <h1>Mapas</h1>
            <div className={styles.formContainer}>
                <input
                    type="number"
                    placeholder="Ano Base"
                    value={anoBase}
                    onChange={(e) => setAnoBase(e.target.value)}
                />
                <button className={styles.addButton} onClick={createMapa}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <table className={styles.mapasTable}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Ano Base</th>
                    <th>Data de Cadastro</th>
                    <th>Data de Atualização</th>
                    <th>Coordenador</th>
                    <th>Aprovado</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {mapas.map((mapa) => (
                    <tr key={mapa.id}>
                        <td>{mapa.id}</td>
                        <td>{mapa.anoBase}</td>
                        <td>{mapa.dataCadastro}</td>
                        <td>{mapa.dataAtualizacao}</td>
                        <td>{mapa.coordenador}</td>
                        <td>{mapa.aprovado ? 'Sim' : 'Não'}</td>
                        <td>
                            {editingMapa && editingMapa.id === mapa.id ? (
                                <>
                                    <button className={styles.saveButton} onClick={updateMapa}>
                                        Salvar
                                    </button>
                                    <button className={styles.cancelButton} onClick={cancelEdit}>
                                        Cancelar
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className={styles.editButton} onClick={() => editMapa(mapa)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className={styles.deleteButton} onClick={() => deleteMapa(mapa.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Mapa;