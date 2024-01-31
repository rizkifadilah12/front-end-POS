import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  calculateShippingFee,
  getAddress,
  selectAddress,
} from "../../app/action/addressAction";
import { connect, useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar";

const CheckoutPage = ({ getAddress }) => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.address.address);
  const selectedAddress = useSelector((state) => state.address.selectedAddress);
  const getAddressItems = () => async () => {
    try {
      getAddress();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getAddressItems());
  }, [dispatch]);

  const handleSelectedAddress = (address) => {
    dispatch(selectAddress(address));
    dispatch(calculateShippingFee(address.kecamatan));
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col sm={2}>
            <Sidebar />
          </Col>
          <Col sm={10}>
            <Card>
              <Card.Header>Checkout</Card.Header>
              <Card.Body>
                <h4>Pilih Alamat Pengiriman</h4>
                <br />
                <Table>
                  <thead>
                    <tr>
                      <th style={{ width: "10%" }}>Option</th>
                      <th style={{ width: "30%" }}>Name</th>
                      <th style={{ width: "60%" }}>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {address?.map((item, id) => (
                      <tr key={id}>
                        <td>
                          <Form.Check
                            type="radio"
                            name="selectedAddress"
                            onClick={() => handleSelectedAddress(item)}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>
                          {item.provinsi}, {item.kabupaten}, {item.kecamatan},{" "}
                          {item.kelurahan}, {item.detail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <br />
                <Link
                  className="d-flex justify-content-end"
                  style={{ margin: "30px", textDecoration: "none" }}
                  to={`/confirm`}
                >
                  <Button
                    variant="dark"
                    onClick={() => handleSelectedAddress(selectedAddress)}
                  >
                    Next
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  address: state.address,
});

export default connect(mapStateToProps, { getAddress })(CheckoutPage);
