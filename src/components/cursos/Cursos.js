import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { Col, Row } from 'react-bootstrap';

const Cursos = () => {
    // const API_URL = 'http://localhost:8080';
    const API_URL = "https://enadejava-1685497331322.azurewebsites.net";
    const CURSOS_API_URL = `${API_URL}/api/v1/cursos`;
    const COORDENADORES_API_URL = `${API_URL}/api/v1/coordenadores`;
    const CURSOS_SEM_COORDENADORES_API_URL = `${API_URL}/api/v1/cursos/semcoordenacao`;

    const { auth } = useAuth();
    const { accessToken } = auth;

    const [cursos, setCursos] = useState([]);
    const [cursosSemCoordenador, setCursosSemCoordenador] = useState([]);
    const [nome, setNome] = useState('');
    const [coordenadorId, setCoordenadorId] = useState('');
    const [coordenadores, setCoordenadores] = useState([]);

    useEffect(() => {
        fetchCursos();
        fetchCursosSemCoordenador();
        fetchCoordenadores();
    }, []);

    const fetchCursos = async () => {
        try {
            const response = await axios.get(CURSOS_API_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            let cursos = response.data.filter(item=> item.coordenador !== null);
            setCursos(cursos);
            toast.success('Coordenações obtidas!');
        } catch (error) {
            toast.error('Erro ao obter as coordenações');
        }
    };

    const fetchCursosSemCoordenador = async () => {
        try {
            const response = await axios.get(CURSOS_SEM_COORDENADORES_API_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setCursosSemCoordenador(response.data);
            toast.success('Cursos sem coordenador obtidos!');
        } catch (error) {
            toast.error('Erro ao obter os cursos sem coordenador');
        }
    };

    const fetchCoordenadores = async () => {
        try {
            const response = await axios.get(COORDENADORES_API_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setCoordenadores(response.data);
            toast.success('Coordenadores carregados!');
        } catch (error) {
            toast.error('Erro ao obter coordenadores');
        }
    };

    const handleNomeChange = (event) => {
        setNome(event.target.value);
    };

    const handleCoordenadorIdChange = (event) => {
        setCoordenadorId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newCurso = {
            nome,
            coordenadorId,
        };

        try {
            await axios.post(CURSOS_API_URL, newCurso, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setNome('');
            setCoordenadorId('');
            toast.success('Novo curso criado!');
            fetchCursos();
            fetchCursosSemCoordenador();
        } catch (error) {
            toast.error('Erro ao criar o curso');
            console.log(error);
        }
    };

    return (
        <>
            <div>
                <h1>Cursos</h1>
                <Row style={{ marginTop: '20px',  marginBottom: '20px',  marginLeft: '20px', marginRight: '20px', display: 'flex', justifyContent: 'center'}}>
                    <Col md={4} style={{ border: '1px solid #ccc',  padding: '20px', borderRadius: '5px'}}>
                        <h2>Cadastrar Curso</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="nome">Nome:</label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    value={nome}
                                    onChange={handleNomeChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="coordenadorId">Coordenador:</label>
                                <select
                                    id="coordenadorId"
                                    name="coordenadorId"
                                    value={coordenadorId}
                                    onChange={handleCoordenadorIdChange}
                                >
                                    <option value="">Selecione um coordenador</option>
                                    {coordenadores.map((coordenador) => (
                                        <option key={coordenador.id} value={coordenador.id}>
                                            {coordenador.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit">Criar novo curso</button>
                        </form>
                    </Col>
                    <Col md={4} style={{ border: '1px solid #ccc',  padding: '20px', borderRadius: '5px'}}>
                        <h2>Coordenadores Cadastrados</h2>
                        <ul>
                            {coordenadores.map((coordenador) => (
                                <li key={coordenador.id}>
                                    Coordenador: {coordenador.nome}
                                </li>
                            ))}
                        </ul>
                        <h2>Cursos com Coordenação Disponível</h2>
                        <ul>
                            {cursosSemCoordenador.map((curso) => (
                                <li key={curso.id}>Curso: {curso.nome}</li>
                            ))}
                        </ul>
                    </Col>
                    <Col md={4} style={{ border: '1px solid #ccc',  padding: '20px', borderRadius: '5px'}}>
                        <h2>Coordenações</h2>
                        <ul>
                            {cursos.map((curso) => (
                                <li key={curso.id}>
                                    {curso.coordenador.usuario.nome} - {curso.nome}
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            </div>
            <ToastContainer />
        </>
    );
};

export default Cursos;
