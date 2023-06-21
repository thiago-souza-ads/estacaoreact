import { Nav, Navbar } from "react-bootstrap";
import styles from "./NavBarSite.module.css";
import {Link, Route} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Login from "../login/Login";
import Register from "../Register";
import LinkPage from "../LinkPage";
import Unauthorized from "../naoAutorizado/Unauthorized";
import Missing from "../naoEncontrada/Missing";

const NavBarSite = () => {
    const { auth } = useAuth();
    const { usuario } = auth;

    const rotasCoordenador = [
        { to: "/", label: "Home" },
        { to: "/usuarios", label: "Usuários" },
        { to: "/mapas", label: "Mapas" },
        { to: "/questionarios", label: "Questionários" },
        { to: "/professores", label: "Professores" },
        { to: "/alunos", label: "Alunos" },
        { to: "/enade", label: "Enade" },
    ];
    const rotasProfessor = [
        { to: "/", label: "Home" },
        { to: "/usuarios", label: "Usuários" },
        { to: "/mapas", label: "Mapas" },
        { to: "/questionarios", label: "Questionários" },
        { to: "/professores", label: "Professores" },
        { to: "/alunos", label: "Alunos" },
        { to: "/enade", label: "Enade" },
    ];

    const rotasAlunos = [
        { to: "/", label: "Home" },
        { to: "/usuarios", label: "Usuários" },
        { to: "/mapas", label: "Mapas" },
        { to: "/questionarios", label: "Questionários" },
        { to: "/professores", label: "Professores" },
    ];
    const rotasAdministrador = [
        { to: "/usuarios", label: "Usuários" },
        { to: "/mapas", label: "Mapas" },
        { to: "/questionarios", label: "Questionários" },
        { to: "/professores", label: "Professores" },
        { to: "/alunos", label: "Alunos" },
        { to: "/enade", label: "Enade" },
    ];
    const rotasPublicas = [
        { to: "/login", label: "Login" },
        { to: "/register", label: "Cadastre-se" },
        { to: "/missing", label: "Tá perdido" },
        { to: "/linkpage", label:"Links" },
        { to: "/unauthorized", label: "Não autorizado" }
    ];

    let rotas = [];

    switch (usuario.authorities[0].authority) {
        case "Coordenador":
            rotas = rotasCoordenador;
            break;
        case "Professor":
            rotas = rotasProfessor;
            break;
        case "Aluno":
            rotas = rotasAlunos;
            break;
        case "Administrador":
            rotas = rotasAdministrador;
            break;
        default:
            rotas = [];
    }

    return (
        <Navbar className={styles.navbar}>
            <Nav className={`mr-auto ${styles.navbarNav}`}>
                {rotas.map((rota, index) => (
                    <Nav.Link as={Link} to={rota.to} key={index}>
                        {rota.label}
                    </Nav.Link>
                ))}
            </Nav>
        </Navbar>
    );
};

export default NavBarSite;
