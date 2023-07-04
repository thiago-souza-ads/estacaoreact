import {useEffect, useRef, useState} from 'react';
import useAuth from '../../hooks/useAuth';
import {useLocation, useNavigate} from 'react-router-dom';
import Logo from '../../assets/estacioWhiteBg.png';
import axios from '../../api/axios';
import styles from './Login.module.css';
import {toast, ToastContainer} from 'react-toastify';
import FluidAnimation from 'react-fluid-animation';
import TypeWriterEffect from 'react-typewriter-effect';

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
    const typeWriterRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            typeWriterRef.current.typeDeleteAllText();
        }, 2000);
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
                    Não possui conta ainda? <a href="/register" style={{color: 'rgba(123,129,218,0.89)', textDecoration: 'underline'}}>Cadastre-se</a>
                </p>
            </form>
            <div style={{position: 'absolute', bottom: '40px', marginTop: '20px', color: '#fff', textAlign: 'center'}}>
                <TypeWriterEffect
                    ref={typeWriterRef}
                    textStyle={{ fontFamily: 'Arial', fontSize: '24px' }}
                    startDelay={20}
                    cursorColor="white"
                    text="Seja bem-vindo! Nosso objetivo é lhe ajudar a ir mais longe!"
                    typeSpeed={100}
                    scrollArea={window}
                    eraseDelay={2000} // Define o tempo de espera antes de apagar o texto (2 segundos)
                    eraseSpeed={100} // Define a velocidade de apagar o texto
                    eraseStyle={{ color: 'transparent' }} // Define o estilo do texto apagado (transparente)
                    loop={true}
                />
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Login;
