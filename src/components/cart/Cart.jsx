import './cart.css';
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Cart = () => {

    return(
        <div className="h-100">
            <Container fluid>
                <h2 style={{marginLeft: '50px', marginTop: '8px'}}><b>Cart</b></h2>
                <hr />
                <Row className="row">
                    <Col sm={3} style={{textAlign: 'center'}}>
                        <img className="h-100 w-100" src="" alt="" />
                    </Col>
                    <Col sm={5}>
                        <p>nama produk</p>
                        <h4>Price</h4>
                    </Col>
                    <Col style={{marginTop: '20px'}}>
                        <tr>
                            <td><Button variant="outline-dark">+</Button></td>
                            <td><span style={{marginRight: '5px', marginLeft: '5px'}}>qty</span></td>
                            <td><Button variant="outline-dark">-</Button></td>
                        </tr>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '20px' }}>
                    <Col sm={3} style={{textAlign: 'center'}}>
                        <img className='h-100 w-100' src="" alt="" />
                    </Col>
                    <Col sm={5}>
                        <p>nama produk</p>
                        <h4>Price</h4>
                    </Col>
                    <Col style={{marginTop: '20px'}}>
                        <tr>
                            <td><Button variant="outline-dark">+</Button></td>
                            <td><span style={{marginRight: '5px', marginLeft: '5px'}}>qty</span></td>
                            <td><Button variant="outline-dark">-</Button></td>
                        </tr>
                    </Col>
                </Row>
                <footer className="text-center">
                    <Row className="row d-flex justify-content-center" >
                        <Card style={{ width: '60%', height:'30%' }}>
                            <Card.Body>
                                <Card.Title>Total :</Card.Title>
                                <Card.Text> <br />
                                Rp. 2000
                                </Card.Text>
                                <br />
                                <div className="text-center">
                                    <Button variant="dark">Checkout</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Row>
                </footer>
            </Container>
        </div>
    )
}

export default Cart;