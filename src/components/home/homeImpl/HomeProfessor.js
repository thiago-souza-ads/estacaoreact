import { Navbar, Container, Row, Col } from "react-bootstrap";

export const HomeProfessor = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">APPPPPPPPPPPPPPPard</Navbar.Brand>
            </Navbar>
            <Container fluid>
                <Row>
                    <Col md={6}>
                        <h1>Column 1</h1>
                        <p>Content for column 1 goes here.</p>
                    </Col>
                    <Col md={6}>
                        <h1>Column 2</h1>
                        <p>Content for column 2 goes here.</p>
                    </Col>
                </Row>
            </Container>
            <footer className="footer mt-auto py-3 bg-light">
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            <span className="text-muted">Footer content goes here.</span>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    )
}