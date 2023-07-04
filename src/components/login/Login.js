import {useEffect, useRef, useState} from 'react';
import useAuth from '../../hooks/useAuth';
import {useLocation, useNavigate} from 'react-router-dom';
import Logo from '../../assets/estacioWhiteBg.png';
import axios from '../../api/axios';
import styles from './Login.module.css';
import {toast, ToastContainer} from 'react-toastify';
import FluidAnimation from 'react-fluid-animation';
import Typewriter from 'react-typewriter-effect';

const LOGIN_URL = 'auth/authenticate';

const ROLES = {
    Professor: 1001,
    Coordenador: 1002,
    Administrador: 1003,
    Aluno: 1000,
};

const Login = () => {
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const userRef = useRef();
    const errRef = useRef();
    const texto = ['Eat', 'Sleep', 'Code', 'Repeat!'];
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [login, password]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(
                LOGIN_URL,
                {
                    login: login,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                toast.success('Acesso autorizado!');
                const user = response?.data?.user;
                const rolesName = user?.roles[0].nome;
                let token = response?.data?.access_token;
                let roleId = ROLES[rolesName];
                const accessToken = token;
                localStorage.setItem('token', token);
                setAuth({user: login, password, roles: roleId, accessToken, usuario: user});
                setLogin('');
                setPassword('');
                navigate(from, {replace: true});
            })
            .catch((err) => {
                if (!err?.response) {
                    setErrMsg('Sem resposta do servidor, tente novamente');
                } else if (err.response?.status === 400) {
                    setErrMsg('Nome de usuário ou senha incorreta');
                } else if (err.response?.status === 401) {
                    setErrMsg('Não autorizado');
                } else {
                    setErrMsg('Falha ao logar');
                }
                errRef.current.focus();
            });
    };

    return (
        <div className={styles.main}>
            <FluidAnimation style={{height: '100vh'}}/>
            <form onSubmit={handleSubmit} style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)'}}>
                <img style={{alignSelf: 'center', marginTop: '20px', marginBottom: '20px'}} src={Logo} alt="logo"
                     width="150px"/>
                <div className={styles.inputsBox}>
                    <input
                        type="text"
                        id="loginName"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setLogin(e.target.value)}
                        value={login}
                        placeholder="E-mail"
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Senha"
                        required
                    />
                </div>
                <button type="submit">Logar</button>
                <div className={styles.error}>{errMsg}</div>
                <p style={{color: '#ffffff', fontSize: '12px', textAlign: 'center'}}>
                    Não possui conta ainda? <a href="/register"
                                               style={{color: '#fff', textDecoration: 'underline'}}>Cadastre-se</a>
                </p>
            </form>
            <div style={{position: 'absolute', bottom: '0', marginTop: '20px', color: '#fff', textAlign: 'center'}}>
                <Typewriter
                    options={{
                        strings: texto,
                        autoStart: true,
                        loop: true,
                        deleteSpeed: 20,
                        color: '#fff',
                    }}
                />
                <h1>Ola</h1>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Login;
