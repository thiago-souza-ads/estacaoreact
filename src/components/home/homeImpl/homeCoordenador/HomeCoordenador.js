import {Navbar, Container, Row, Col, Nav, Card} from "react-bootstrap";
import styles from "./HomeCoordenador.module.css";
import {Link} from "react-router-dom";

export const HomeCoordenador = () => {
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
                            <Card.Title style={{color: "black",bold: true}}>TESTE Matheus</Card.Title>
                            <Card.Text style={{color: "black",bold: false, textAlign: 'justify', textJustify:'inter-word'}}>
                                O Exame Nacional de Desempenho dos Estudantes (Enade) é uma ferramenta de avaliação do Governo Federal aplicada por meio do Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira (Inep). Ele avalia o rendimento dos concluintes dos cursos de graduação em relação aos conteúdos programáticos previstos nas diretrizes curriculares dos cursos, o desenvolvimento de competências e habilidades necessárias ao aprofundamento da formação geral e profissional, e o nível de atualização dos estudantes com relação à realidade brasileira e mundial. O Enade é obrigatório para estudantes ingressantes e concluintes habilitados de cursos de bacharelado e superiores de tecnologia vinculados às áreas de avaliação da edição. A situação de regularidade do estudante é registrada no histórico escolar. O Enade tem enorme importância na avaliação das Instituições de Ensino Superior (IES) pelo Sistema Nacional de Avaliação da Educação Superior (Sinaes), principalmente pelo peso relativo que tem no cômputo dos conceitos avaliativos dos cursos e da própria IES
                            </Card.Text>
                            <Card.Link href="/usuarios">Visualizar Usuarios</Card.Link>
                        </Card.Body>
                    </Card>
                    <Card style={{width: "40%", backgroundColor: "whitesmoke", height: "32rem", borderRadius: '10px'}}>
                        <Card.Body>
                            <Card.Title style={{color: "black",bold: true}}>Como é feita a prova do Enade?</Card.Title>
                            <Card.Text style={{color: "black",bold: false, textAlign: 'justify', textJustify:'inter-word'}}>
                                A prova do Enade é composta por 10 questões de Formação Geral, sendo 8 questões de múltipla escolha e 2 questões discursivas que avaliam aspectos como clareza, coerência, coesão, estratégias argumentativas, utilização de vocabulário adequado e correção gramatical do texto. Além disso, há 30 questões da parte de formação específica da área, sendo 27 questões de múltipla escolha e 3 discursivas. A prova tem duração de 4 horas e é obrigatória para estudantes ingressantes e concluintes habilitados de cursos de bacharelado e superiores de tecnologia vinculados às áreas de avaliação da edição
                            </Card.Text>
                            <Card.Link href="/usuarios">Visualizar Usuarios</Card.Link>
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
    )
}