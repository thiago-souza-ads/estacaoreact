import {Card, Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import styles from "./HomeAluno.module.css";
import {Link} from "react-router-dom";

export const HomeAluno = () => {
    return (
        <>
            <Navbar className={styles.navbar}>
                <Nav className={`mr-auto ${styles.navbarNav}`}>
                    <Nav.Link as={Link} to="/usuarios">
                        Usuários
                    </Nav.Link>
                    <Nav.Link as={Link} to="/coordenadores">
                        Coordenadores
                    </Nav.Link>
                    <Nav.Link as={Link} to="/professores">
                        Professores
                    </Nav.Link>
                    <Nav.Link as={Link} to="/alunos">
                        Alunos
                    </Nav.Link>
                    <Nav.Link as={Link} to="/enade">
                        Enade
                    </Nav.Link>
                </Nav>
            </Navbar>
            
            <Container fluid>

                <Row style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px", paddingLeft: "60px" }}>
                    <Col md={2}>
                        Bem-Vindo! Juliana Marciel
                    </Col>
                    <Col md={2}>
                        <button>Configurar seu avatar</button>
                    </Col>
                    <Col md={2}>
                        <button>Iniciar jornada</button>
                    </Col>
                </Row>


                <Col md={12} className={styles.column12}>
                    <Col md={5} style={{border: "1px solid black", width: "40vw", height: "50vh", borderRadius: "10px", justifyContent: "center", alignItems: "center", display: "flex"}}>
                        <div className={styles.text}>testetestestewtessfdafsafsfafd</div>
                    </Col>
                    <Col md={5} style={{border: "1px solid black", width: "40vw", height: "50vh", borderRadius: "10px", justifyContent: "center", alignItems: "center", display: "flex"}}>
                        <div>testetestestewtesd</div>
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
