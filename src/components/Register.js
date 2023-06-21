import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const NAME_REGEX = /^[A-zÀ-ÿ\s]+$/;
const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const API_URL = "https://enadejava-1685497331322.azurewebsites.net";
const REGISTER_URL = '/api/v1/auth/register';

const Register = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const pwdRef = useRef();
    const confirmPwdRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [confirmPwd, setConfirmPwd] = useState('');
    const [validConfirmPwd, setValidConfirmPwd] = useState(false);
    const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(NAME_REGEX.test(name));
    }, [name]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd]);

    useEffect(() => {
        setValidConfirmPwd(pwd === confirmPwd);
    }, [pwd, confirmPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [name, email, pwd, confirmPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValidName = NAME_REGEX.test(name);
        const isValidEmail = EMAIL_REGEX.test(email);
        const isValidPwd = PWD_REGEX.test(pwd);

        if (!isValidName || !isValidEmail || !isValidPwd || pwd !== confirmPwd) {
            setErrMsg("Entrada inválida");
            return;
        }

        try {
            const response = await axios.post(
                API_URL + REGISTER_URL,
                JSON.stringify({ nome: name, password: pwd, login: email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            toast.success("Salvo com sucesso!");
            setSuccess(true);
            setName('');
            setEmail('');
            setPwd('');
            setConfirmPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Sem resposta do servidor! Tente mais tarde!');
            } else if (err.response?.status === 409) {
                setErrMsg('Nome de usuário em uso, insira outro!');
            } else {
                setErrMsg('Erro ao cadastrar usuário');
            }
            toast.error(err);
            errRef.current.focus();
        }
    };

    return (
        <>
            <div style={{ marginTop: "20px" }}>
                {success ? (
                    <section>
                        <h1>Sucesso!</h1>
                        <p>
                            <Link to="/">Login</Link>
                        </p>
                    </section>
                ) : (
                    <section>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Registrar-se</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">
                                Nome:
                                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="text"
                                id="name"
                                ref={nameRef}
                                autoComplete="off"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="namenote"
                                onFocus={() => setNameFocus(true)}
                                onBlur={() => setNameFocus(false)}
                            />
                            <p id="namenote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                O nome deve conter apenas letras e espaços.
                            </p>

                            <label htmlFor="email">
                                Email (Login):
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="email"
                                id="email"
                                ref={emailRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emailnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                O email deve ser válido e seguir o padrão ***@alunos.estacio.br.
                            </p>

                            <label htmlFor="password">
                                Password:
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="password"
                                id="password"
                                ref={pwdRef}
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                A senha deve conter de 8 a 24 caracteres.<br />
                                Deve incluir letras maiúsculas e minúsculas, um número e um caractere especial.<br />
                                Caracteres especiais permitidos: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>

                            <label htmlFor="confirm_pwd">
                                Confirme o Password:
                                <FontAwesomeIcon icon={faCheck} className={validConfirmPwd && confirmPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validConfirmPwd || !confirmPwd ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                ref={confirmPwdRef}
                                onChange={(e) => setConfirmPwd(e.target.value)}
                                value={confirmPwd}
                                required
                                aria-invalid={validConfirmPwd ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setConfirmPwdFocus(true)}
                                onBlur={() => setConfirmPwdFocus(false)}
                            />
                            <p id="confirmnote" className={confirmPwdFocus && !validConfirmPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Deve ser igual à senha digitada anteriormente.
                            </p>

                            <button disabled={!validName || !validEmail || !validPwd || !validConfirmPwd}>Cadastrar</button>
                        </form>
                        <p>
                            Já tem cadastro?<br />
                            <span className="line">
                <Link to="/">Login</Link>
              </span>
                        </p>
                    </section>
                )}
            </div>

            <ToastContainer />
        </>
    );
}

export default Register;
