import React from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../app/action/orderAction";
import Navbars from "../../components/navbar/Navbar";

const ConfirmPage = () => {
    const {selectedAddress, deliveryFee} = useSelector((state) => state.address);
    const {subTotalPrice} = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const totalPrice = subTotalPrice + deliveryFee;

    const handleOrder = async() => {
        let orderData = {
            delivery_fee: totalPrice,
            delivery_address: selectedAddress
        }

        const newOrder = await dispatch(createOrder(orderData));
        alert('Order Success');
        navigate(`/invoice/${newOrder._id}`)
    }

    return(
        <div>
            <Container fluid>
                <Navbars/><br />
                <Container>
                    <Card>
                        <Card.Header>Checkout</Card.Header>
                        <Card.Body>
                            <h4>Konfirmasi Pembayaran</h4><br />
                            <Table>
                                <thead>
                                    <tr>
                                        <th style={{width:"50%"}}></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>
                                            {selectedAddress.name},{' '}
                                            {selectedAddress.provinsi},{' '}
                                            {selectedAddress.kabupaten},{' '}
                                            {selectedAddress.kecamatan},{' '}
                                            {selectedAddress.kelurahan},{' '}
                                            {selectedAddress.detail}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sub Total</td>
                                        <td>Rp. {subTotalPrice}</td>
                                    </tr>
                                    <tr>
                                        <td>Ongkir</td>
                                        <td>Rp. {deliveryFee}</td>
                                    </tr>
                                    <tr>
                                        <td><h5>Total</h5></td>
                                        <td><h5>Rp. {totalPrice}</h5></td>
                                    </tr>
                                </tbody><br /><br />
                                    <tr>
                                        <td>
                                            <Link to={`/checkout`}>
                                                <Button variant="danger">Previous</Button>
                                            </Link>
                                        </td>
                                        <td style={{textAlign:'right'}}>
                                            {/* <Link to={`/invoice`} > */}
                                                <Button variant="success" onClick={handleOrder}>
                                                    Next
                                                </Button>
                                            {/* </Link> */}
                                        </td>
                                    </tr>
                            </Table>
                        </Card.Body>
                    </Card>
                </Container>
            </Container>
        </div>
    )
}

export default ConfirmPage;