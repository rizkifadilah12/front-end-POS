import React, { useEffect,useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceOrder, getOrder, toggleOpenItems } from "../../app/action/orderAction";
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbars from "../../components/navbar/Navbar";
import axiosDriver from "../../utils/axios";
const Orders = () => {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order.items);
    const listItems = useSelector((state) => state.order.openItems);
    const [user,setUser] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        axiosDriver.get('http://localhost:3000/auth/me')
        .then((res) => {
            setUser(res.data)
        })
    },[])
 
    if (user.error === 1) {
        navigate('/login')
    }
    useEffect(() => {
        dispatch(getOrder())
    },[dispatch]);
   
    
    return(
        <div>
            <Container fluid>
                <Row>
                    <Col sm={2}><Sidebar/></Col>
                    <Col>
                        <Navbars/><br />
                        <Card>
                            <Card.Header>Orders</Card.Header>
                                    <Card.Body>
                                        <Table style={{textAlign:'center'}} aria-label="collapsible table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell />
                                                    <TableCell>Order ID</TableCell>
                                                    <TableCell>Total</TableCell>
                                                    <TableCell>Status</TableCell>
                                                    <TableCell>Invoice</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {
                                                order.map((item, id) => (
                                                    <TableBody key={id}>
                                                        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                            <TableCell>
                                                                <IconButton
                                                                    aria-label="expand row"
                                                                    size="small"
                                                                    onClick={() => dispatch(toggleOpenItems(item._id))}
                                                                >
                                                                    {toggleOpenItems ? <FaAngleDown /> : <FaAngleUp/>}
                                                                </IconButton>
                                                            </TableCell>
                                                            <TableCell>{item.order_number}</TableCell>
                                                            <TableCell>Rp. {item.delivery_fee}</TableCell>
                                                            <TableCell>{item.status}</TableCell>
                                                            <TableCell>
                                                                <Link to={`/invoice/${item._id}`}>
                                                                    <Button variant="success">
                                                                        Invoice
                                                                    </Button>
                                                                </Link>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                                <Collapse in={listItems[item._id]} timeout="auto" unmountOnExit>
                                                                    <Box sx={{ margin: 1 }}>
                                                                        <Table size="small" aria-label="purchases">
                                                                            <TableHead>
                                                                                <TableRow>
                                                                                    <TableCell>Name Item</TableCell>
                                                                                    <TableCell>Quantity</TableCell>
                                                                                    <TableCell>Price</TableCell>
                                                                                    <TableCell>Total</TableCell>
                                                                                </TableRow>
                                                                            </TableHead>
                                                                            <TableBody>
                                                                                {
                                                                                    item.order_items.map((orderItem, index) => (
                                                                                        <TableRow key={index}>
                                                                                            <TableCell>{orderItem.name}</TableCell>
                                                                                            <TableCell>{orderItem.qty}</TableCell>
                                                                                            <TableCell>{orderItem.price}</TableCell>
                                                                                            <TableCell>{orderItem.price * orderItem.qty}</TableCell>
                                                                                        </TableRow>
                                                                                    ))
                                                                                }
                                                                            </TableBody>
                                                                        </Table>
                                                                    </Box>
                                                                </Collapse>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                ))
                                            }
                                        </Table>
                                    </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Orders;