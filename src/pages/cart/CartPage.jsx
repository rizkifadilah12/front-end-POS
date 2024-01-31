import React from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  decQuantity,
  deleteProductCart,
  getCart,
  incQuantity,
} from "../../app/action/cartAction";
import { FaTrash } from "react-icons/fa";
import Sidebar from "../../components/sidebar/Sidebar";

const CartPage = ({ getCart, incQuantity, decQuantity }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const subTotalPrice = useSelector((state) => state.cart.subTotalPrice);

  const getCartItems = () => async () => {
    try {
      getCart();
    } catch (error) {
      console.log(error);
    }
  };


  const handleIncQty = async (productId) => {
    try {
      incQuantity(productId);
      window.location.reload();

    } catch (error) {}
  };

  const handleDecQty = async (productId) => {
    try {
      decQuantity(productId);
      window.location.reload();
    } catch (error) {}
  };

  const handleDelete = (productId) => {
    dispatch(deleteProductCart(productId));
    window.location.reload();
  };

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col sm={2}>
            <Sidebar />
          </Col>
          <Col sm={10}>
            <Card>
              <Card.Header as="h5">Cart</Card.Header>
              <Card.Body>
                {cart.map((item, id) => (
                  <Table style={{ textAlign: "center" }} key={id}>
                    <thead>
                      <tr>
                        <th style={{ width: "30%" }}>Product</th>
                        <th style={{ width: "20%" }}>Name</th>
                        <th style={{ width: "20%" }}>Price</th>
                        <th style={{ width: "20%" }}>Quantity</th>
                        <th style={{ width: "10%" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <img
                            src={`http://localhost:3000/images/product/${item.image_url}`}
                            alt=""
                            style={{ width: "40%", height: "100px" }}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price * item.qty}</td>
                        <td>
                          <Button
                            variant="outline-dark"
                            onClick={() => handleIncQty(item.product._id)}
                          >
                            +
                          </Button>
                          <span> {item.qty} </span>
                          <Button
                            variant="outline-dark"
                            onClick={() => handleDecQty(item.product._id)}
                          >
                            -
                          </Button>
                        </td>
                        <td>
                          <Button
                            onClick={() => handleDelete(item.product._id)}
                            variant="danger"
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                ))}
                <div className="d-flex justify-content-end mb-4">
                  <Card style={{ width: "30%" }}>
                    <Card.Header as="h5">Total : </Card.Header>
                    <Card.Body
                      style={{
                        textAlign: "center",
                        color: "red",
                        width: "100%",
                      }}
                    >
                      <h1>Rp. {subTotalPrice}</h1>
                    </Card.Body>
                    <Link to={`/checkout`}>
                      <Button variant="outline-dark" className="w-100">
                        Checkout
                      </Button>
                    </Link>
                  </Card>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default connect(null, {
  getCart,
  incQuantity,
  decQuantity,
  deleteProductCart,
})(CartPage);
