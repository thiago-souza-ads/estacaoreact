import {Navbar, Container, Row, Col, Nav} from "react-bootstrap";
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
                <Row className={styles.container}>
                    <Col md={6} className={styles.column}>
                        <h1>CAAAAAAAAAAAAAAAAAAn 1</h1>
                        <p>ContenAAAAAAAAAAAAAAAAAAAAAAAAAx goes here.</p>
                    </Col>
                    <Col md={6} className={styles.column}>
                        <h1>Column 2</h1>
                        <p>CoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhgfs  s here.</p>
                    </Col>
                </Row>
            </Container>
            <footer className={`footer mt-auto py-3 bg-light ${styles.footer}`}>
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            <span className="text-muted">Footer content goes here.</span>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
};
