import { Navbar, Container, Row, Col } from "react-bootstrap";
import styles from "./HomeAdministrador.module.css";

export const HomeAdministrador = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark" className={styles.header}>
                <Navbar.Brand href="#home">Home</Navbar.Brand>
                <Navbar.Brand href="#home">Usuarios</Navbar.Brand>
                <Navbar.Brand href="#home">Coordenadores</Navbar.Brand>
                <Navbar.Brand href="#home">Professores</Navbar.Brand>
                <Navbar.Brand href="#home">Alunos</Navbar.Brand>
                <Navbar.Brand href="#home">Enade</Navbar.Brand>
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
