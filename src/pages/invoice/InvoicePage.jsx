import React, { useEffect } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { getInvoiceOrder, getNewOrder } from "../../app/action/orderAction";
import Navbars from "../../components/navbar/Navbar";

const InvoicePage = () => {
    const { orderId } = useParams();
    const invoice = useSelector((state) => state.order.items);
    const dispatch = useDispatch();

    const items = invoice[0];
    console.log("data ITEMS",items);

    useEffect(() => {
        dispatch(getInvoiceOrder(orderId));
    },[dispatch, orderId]);

    return(
        <div>
            <Container fluid>
                <Navbars/><br />
                <Container>
                    <Card>
                        <Card.Header>Invoice</Card.Header>
                        <Card.Body>
                            <Table>
                                <thead>
                                    <tr>
                                        <th style={{width:'50%'}}></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                            <tbody>
                                    <tr>
                                        <td>Status</td>
                                        <td>{items.status}</td>
                                    </tr>
                                    <tr>
                                        <td>Order ID</td>
                                        <td>{items._id}</td>
                                    </tr>
                                    <tr>
                                        <td>Total Amount</td>
                                        <td>Rp. {items.total}</td>
                                    </tr>
                                    <tr>
                                        <td>Billed To</td>
                                        <td>
                                            {`
                                                ${items.user.fullname},
                                                ${items.user.email}
                                            `}
                                            <br />
                                            <br />
                                            {`
                                                ${items.delivery_address.provinsi}, 
                                                ${items.delivery_address.kabupaten},
                                                ${items.delivery_address.kecamatan},
                                                ${items.delivery_address.kelurahan}, 
                                                ${items.delivery_address.detail}
                                            `}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Payment to</td>
                                        <td>REK BRI: 217382309974</td>
                                    </tr>
                                            
                                </tbody>
                                <br /><br />
                                    <tr>
                                        <td style={{textAlign:'left'}}>
                                            <Link to={`/`} >
                                                <Button variant="outline-danger">Back</Button>
                                            </Link>
                                        </td>
                                        <td style={{textAlign:'right'}}>
                                            <Link to={`/order`} >
                                                <Button variant="outline-success">Paid</Button>
                                            </Link>
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

const mapStateToProps = (state) => ({
    invoice: state.order.items,
});
  
export default connect(mapStateToProps)(InvoicePage);