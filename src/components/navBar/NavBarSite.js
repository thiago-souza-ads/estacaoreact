import {Nav, Navbar} from "react-bootstrap";
import styles from "./NavBarSite.module.css";
import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Login from "../login/Login";
import {
    faChalkboardTeacher,
    faHome, faLink,
    faList,
    faMap, faNotEqual,
    faQuestion,
    faSchool, faSign, faSubscript,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const NavBarSite = () => {
    const {auth} = useAuth();
    const {usuario} = auth;

    const rotasCoordenador = [
        {to: "/", label: "Home", icone: faHome},
        {to: "/usuarios", label: "Usuários", icone: faUser },
        {to: "/mapas", label: "Mapas", icone: faMap},
        {to: "/questionarios", label: "Questionários", icone: faQuestion},
        {to: "/professores", label: "Professores", icone: faChalkboardTeacher},
        {to: "/alunos", label: "Alunos", icone: faSchool },
        {to: "/enade", label: "Enade", icone: faList},
    ];
    const rotasProfessor = [
        {to: "/", label: "Home", icone: faHome},
        {to: "/usuarios", label: "Usuários", icone: faUser},
        {to: "/mapas", label: "Mapas", icone: faMap},
        {to: "/questionarios", label: "Questionários", icone: faQuestion},
        {to: "/professores", label: "Professores", icone: faChalkboardTeacher},
        {to: "/alunos", label: "Alunos", icone: faSchool},
        {to: "/enade", label: "Enade", icone: faList},
    ];

    const rotasAlunos = [
        {to: "/", label: "Home", icone: faHome},
        {to: "/usuarios", label: "Usuários", icone: faUser},
        {to: "/mapas", label: "Mapas", icone: faMap},
        {to: "/questionarios", label: "Questionários", icone: faQuestion},
        {to: "/professores", label: "Professores", icone: faChalkboardTeacher},
    ];
    const rotasAdministrador = [
        {to: "/usuarios", label: "Usuários", icone: faUser},
        {to: "/mapas", label: "Mapas", icone: faMap},
        {to: "/questionarios", label: "Questionários", icone: faQuestion},
        {to: "/professores", label: "Professores", icone: faChalkboardTeacher},
        {to: "/alunos", label: "Alunos", icone: faSchool},
        {to: "/enade", label: "Enade", icone: faList},
    ];
    const rotasPublicas = [
        {to: "/", label: "Home", icone: faHome},
        {to: "/login", label: "Login", icone: faSign},
        {to: "/register", label: "Cadastre-se", icone: faSubscript},
        {to: "/missing", label: "Tá perdido", icone: faNotEqual},
        {to: "/linkpage", label: "Links", icone: faLink},
        {to: "/unauthorized", label: "Não autorizado", faNotEqual}
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
                        <FontAwesomeIcon icon={rota.icone} className={styles.navIcon} />
                        {rota.label}
                    </Nav.Link>
                ))}
            </Nav>
        </Navbar>
    );
};

export default NavBarSite;
