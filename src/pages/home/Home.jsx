import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../../components/sidebar/Sidebar";
import './home.css';
import CardProduct from "../../components/cardProduct/CardProduct";
const Home = () => {
    return(
        <div>
            <Container fluid >
                <Row style={{textAlign: 'left'}}>
                    <Col sm={2} style={{textAlign: 'center'}}>
                        <Sidebar/>
                    </Col>
                    <Col sm={10}>
                        <br />
                            <Col><CardProduct/></Col>
                        <br />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;