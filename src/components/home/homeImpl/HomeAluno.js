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
                <Col md={12} className={styles.column12}>
                    <Card style={{width: "40%", backgroundColor: "whitesmoke", height: "32rem", borderRadius: '10px'}}>
                        <Card.Body>
                            <Card.Title style={{color: "green"}}>GEEKSFORGEEKS</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                One Stop For all CS subjects
                            </Card.Subtitle>
                            <Card.Text>
                                GeeksforGeeks provides a platform for all the students to study
                                about all the subjects in CSE.
                            </Card.Text>
                            <Card.Link href="#"> For Students</Card.Link>
                        </Card.Body>
                    </Card>
                    <Card style={{width: "40%", backgroundColor: "whitesmoke", height: "32rem", borderRadius: '10px'}}>
                        <Card.Body>
                            <Card.Title style={{color: "green"}}>GEEKSFORGEEKS</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                One Stop For all CS subjects
                            </Card.Subtitle>
                            <Card.Text>
                                GeeksforGeeks provides a platform for all the students to study
                                about all the subjects in CSE.
                            </Card.Text>
                            <Card.Link href="#"> For Students</Card.Link>
                        </Card.Body>
                    </Card>
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
