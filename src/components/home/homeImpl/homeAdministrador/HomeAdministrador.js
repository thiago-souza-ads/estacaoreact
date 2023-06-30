import React from 'react';
import { Col, Container, Card, ListGroup, Row } from 'react-bootstrap';
import styles from './HomeAdministrador.module.css';

const items = [
    { title: 'Alunos', link: '/alunos', description: 'Lista de alunos cadastrados' },
    { title: 'Cursos', link: '/cursos', description: 'Lista de cursos cadastrados' },
    { title: 'Dashboard', link: '/dashboard', description: 'Dashboard do sistema' },
    { title: 'Mapas', link: '/mapas', description: 'Lista de mapas cadastrados'},
    { title: 'Unidades', link: '/unidades', description: 'Lista de unidades cadastradas'},
    { title: 'Usuários', link: '/usuarios', description: 'Lista de usuários cadastrados'},
];

function CardItem({ title, link, description }) {
    return (
        <Card className="custom-card" style={{borderRadius: '10px', width: '20rem', margin: '10px', boxShadow: '0px 0px 10px #000000'}}>
            <Card.Body>
                <Card.Title style={{color:  '#ffffff', backgroundColor: 'rgb(31 139 237)' , fontSize: '20px', textAlign: 'center', fontWeight: 'bold', padding: '10px', borderRadius: '10px', boxShadow: '0px 0px 10px #000000'}}><strong>{title}</strong></Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
                <Card.Link href={link}>{title}</Card.Link>
            </Card.Body>
        </Card>
    );
}

export const HomeAdministrador = () => {
    return (
        <>
            <div className="card-container" style={{width: '64%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexWrap: 'wrap', padding: '20px 20px 20px 0px'}}>
                {items.map((item, index) => (
                    <CardItem key={index} title={item.title} link={item.link} description={item.description}/>
                ))}
            </div>
            <footer className={`footer mt-auto py-3 bg-light ${styles.footer}`}>
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            <span className="text-muted">Aplicação criada pelo LTD-Estácio 2023.</span>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
};
