import {Col, Container, ListGroup, Nav, Navbar, Row} from "react-bootstrap";
import styles from "./HomeAdministrador.module.css";

const items = [
    { title: 'Alunos', link: '/alunos' },
    { title: 'Cursos', link: '/cursos' },
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Mapas', link: '/mapas' },
    { title: 'Unidades', link: '/unidades' },
    { title: 'Usuários', link: '/usuarios' },
];

function Card({ title, link }) {
    return (
        <a href={link} className="card">
            <div className="card-content">
                <h2>{title}</h2>
            </div>
        </a>
    );
}

export const HomeAdministrador = () => {
    return (
        <>
            <Container className={styles.container}>
                <Row style={{display: 'flex', justifyContent: 'center'}}>
                    {items.map((item, index) => (
                        <Col md={6} style={{height: '50vh', width: '50vh', margin: '10px'}} className={styles.column6} key={index}>
                            <Card style={{ width: '18rem', height: '18rem', backgroundColor: '#000000', margin: '10px'}} title={item.title}  key={index} link={item.link}>
                                <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                                <Card.Body>
                                    <Card.Title>Teste</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                    <Card.Link href="#">Card Link</Card.Link>
                                    <Card.Link href="#">Another Link</Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row style={{display: 'flex', justifyContent: 'center'}}>

                </Row>

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
