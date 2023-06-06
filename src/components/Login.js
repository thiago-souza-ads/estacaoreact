import {useEffect, useRef, useState} from 'react';
import useAuth from '../hooks/useAuth';
import {Link, useLocation, useNavigate} from 'react-router-dom';

import axios from '../api/axios';

const LOGIN_URL = 'auth/authenticate';
const ROLES = {
    'User': 2001,
    'Editor': 1984,
    'Admin': 5150
}
const Login = () => {
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [login, password])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(LOGIN_URL, {
                    'login': login,
                    'password': password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    'Content-Length': JSON.stringify({'login': login, 'password': password}).length
                })
            .then((response) => {
                console.log(JSON.stringify(response?.data));

                const user = response?.data?.user;
                const rolesName = user?.roles[0].nome;
                let token = response?.data?.access_token;
                let roleId;

                if (rolesName === 'Aluno') {
                    roleId = ROLES.User;
                } else if (rolesName === 'Coordenador' || rolesName === 'Administrador') {
                    roleId = ROLES.Admin;
                } else if (rolesName === 'Professor') {
                    roleId = ROLES.Editor;
                } else {
                    roleId = ROLES.User;
                }
                const accessToken = token;
                setAuth({ user:login, password, roles:roleId, accessToken });
                setLogin('');
                setPassword('');
                navigate(from, {replace: true});
            })
            .catch((err) => {
                if (!err?.response) {
                    setErrMsg('Sem resposta do servidor, tente novamente');
                } else if (err.response?.status === 400) {
                    setErrMsg('Nome de usuario ou senha incorreta');
                } else if (err.response?.status === 401) {
                    setErrMsg('Não autorizado');
                } else {
                    setErrMsg('Falha ao logar');
                }
                errRef.current.focus();
            });
    };
    return (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="loginName">Login:</label>
                <input
                    type="text"
                    id="loginName"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br/>
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>

    )
}

export default Login
