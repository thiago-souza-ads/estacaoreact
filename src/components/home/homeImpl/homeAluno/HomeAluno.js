import {Card, Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import styles from "./HomeAluno.module.css";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../../../../assets/house-solid.svg"
import Logo from "../../../../assets/estacioBlackBg.png"
import useAuth from "../../../../hooks/useAuth";
import { useLocation } from "react-router-dom";

export const HomeAluno = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const location = useLocation();
    const { usuario } = auth;
    const userData = usuario;
    console.log(userData);
    return (
        <>
            <Navbar className={styles.navbar}>
                <Nav className={`mr-auto ${styles.navbarNav}`}>
                    <Nav.Link as={Link} to="/">
                        <img src={HomeIcon} width="30px" height="30px"/>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/">
                        <img src={Logo} alt="Logo" width="110px" height="30px"/>
                    </Nav.Link>
                </Nav>
            </Navbar>
            
            <Container fluid>

                <Row style={{ display: "flex", alignItems: "center", justifyContent: "space-around", padding: "20px", paddingLeft: "60px" }}>
                    <Col md={2}>
                        <h2>Bem-Vindo! {userData.nome}</h2>
                    </Col>
                    <Col md={2}>
                        <button onClick={() => navigate("/editar-avatar")} title="Configurar seu avatar">
                            Configurar seu avatar
                        </button>
                    </Col>
                    <Col md={2}>
                        <button>Iniciar jornada</button>
                    </Col>
                </Row>


                <Col md={12} className={styles.column12}>
                    <Col md={5} style={{border: "1px solid black", width: "30vw", height: "65vh", borderRadius: "10px", justifyContent: "space-between", alignItems: "center", display: "flex", flexDirection: "column", padding: "15px"}}>
                        <Col md={2}>
                            <h2>Estação ENADE 2023!</h2>
                        </Col>
                        <Col md={2}>
                            <p>É com grande satisfação que recebemos você aqui, em nossa plataforma de preparação para a prova do Exame Nacional de Desempenho de Estudantes (ENADE). Sabemos que esse é um momento importante para você e para a faculdade, por isso, estamos aqui para auxiliá-lo nessa jornada.</p>
                        </Col>
                        <Col md={2}>
                            <p>O ENADE é uma avaliação fundamental para a melhoria da qualidade do ensino superior no país. Através dele, é possível avaliar o desempenho dos estudantes e das instituições, de modo a garantir a excelência do ensino e a formação de profissionais cada vez mais capacitados e preparados para enfrentar os desafios do mercado de trabalho.</p>
                        </Col>
                        <Col md={2}>
                            <p>Aqui na Estação ENADE 2023, você terá acesso a um conjunto de questões e simulados que irão ajudá-lo a se preparar para a prova de forma eficiente e consistente. Além disso, nossa plataforma foi desenvolvida com muito cuidado e carinho, para proporcionar a você uma experiência acolhedora e confortável durante todo o processo de preparação.</p>
                        </Col>
                        <Col md={2}>
                            <p>Bons estudos!</p>
                        </Col>
                    </Col>
                    <Col md={5} style={{border: "1px solid black", width: "30vw", height: "65vh", borderRadius: "10px", justifyContent: "space-around", alignItems: "center", display: "flex", flexDirection: "column"}}>
                        <Row>
                            <h3>Etapas</h3>
                        </Row>
                        <Col md={10} style={{width: "100%", height: "85%", justifyContent: "space-around", alignItems: "center", display: "flex", flexDirection: "row"}}>
                            <Col md={6} className={styles.jorneyColumn}>
                                <Col md={3} className={styles.jorneySquare}>
                                    <div className={styles.jorneyNumber}>0</div>
                                </Col>
                                <Col md={3} className={styles.jorneySquare}>
                                    <div className={styles.jorneyNumber}>2</div>
                                </Col>
                                <Col md={3} className={styles.jorneySquare}>
                                    <div className={styles.jorneyNumber}>4</div>
                                </Col>
                            </Col>
                            <Col md={6} className={styles.jorneyColumn}>
                                <Col md={3} className={styles.jorneySquare}>
                                    <div className={styles.jorneyNumber}>1</div>
                                </Col>
                                <Col md={3} className={styles.jorneySquare}>
                                    <div className={styles.jorneyNumber}>3</div>
                                </Col>
                                <Col md={3} className={styles.jorneySquare}>
                                    <div className={styles.jorneyNumber}>5</div></Col> 
                            </Col>
                        </Col>
                    </Col>
                </Col>
                <footer className={`footer mt-auto py-3 bg-light ${styles.footer}`}>
                    <Container fluid>
                        <Row>
                            <Col md={12}>
                                <span className="text-muted">Aplicação criada pelo LTD-Estácio 2023.</span>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </Container>
        </>
    );
};
