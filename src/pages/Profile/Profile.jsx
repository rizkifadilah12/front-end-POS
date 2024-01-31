import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Tab,
  Table,
} from "react-bootstrap";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import axiosDriver from "../../utils/axios";
import { FaPen, FaTrash } from "react-icons/fa";
import Navbars from "../../components/navbar/Navbar";
import kecamatanData from "../../components/addressData/kecamatan";
import kelurahanData from "../../components/addressData/kelurahan";
const Profile = () => {
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState([]);
  const [editAddress, setEditAddress] = useState(null);
  const [address, setAddress] = useState([]);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [_provinsi, setProvinsi] = useState([]);
  const [_kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [detail, setDetail] = useState("");
  const [idUser, setIdUser] = useState("")
  const handleLogout = () => {
    axiosDriver.post("http://localhost:3000/auth/logout");
    alert("Logout Successfully");
    localStorage.removeItem("token");
    navigate("/login");
  };
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleFormEdit = async (id) => {
    try {
      const res = await axiosDriver.get(
        `http://localhost:3000/api/delivery-address/${id}`
      );
      setEditAddress(res.data);
    } catch (err) {
      console.log("Error fetching address", err);
    }
  };

  useEffect(() => {
    axiosDriver.get("http://localhost:3000/auth/me").then((res) => {
      setUser(res.data);
      setIdUser(res.data._id)
    });
    getAddresUserId();
  }, []);
  const getAddresUserId = () =>{

    axiosDriver
    .get(`http://localhost:3000/api/delivery-address`)
    .then((res) => {
      setAddress(res.data);
    });
  }


  const handleDeleteAddress = (id) => {
    axiosDriver
      .delete(`http://localhost:3000/api/delivery-address/${id}`)
      .then((res) => {
        setAddress(address.filter((item) => item._id !== id));
        alert("Delete Success");
      });
  };
  const handleAddAdress = async (e) => {
    e.preventDefault();
    if (editAddress) { 
      let data = {
        name: editAddress[0].name,
        kelurahan,
        kecamatan,
        kabupaten: "Samarinda",
        provinsi: "Kalimantan Timur",
        detail: editAddress[0].detail,
      };
      try {
        await axiosDriver.put(
          `http://localhost:3000/api/delivery-address/${editAddress[0]._id}`,
          data
        );
        alert("Edit Successfully");
        window.location.reload();
      } catch (err) {
        alert("Edit Data Gagal");
      }
    } else {
      let data = {
        name,
        kelurahan,
        kecamatan,
        kabupaten: "Samarinda",
        provinsi: "Kalimantan Timur",
        detail,
      };

      axiosDriver.post("http://localhost:3000/api/delivery-address", data);
      alert("Add Successfully");
      setName("");
      setDetail("");
      setProvinsi("");
      setKabupaten("");
      setKecamatan("");
      setKelurahan("");
      window.location.reload();
    }
  };

  const token = localStorage.getItem("token");

  return (
    <div>
      <Container fluid>
        <Row>
          <Col sm={2}>
            <Sidebar />
          </Col>
          <Col>
            <Navbars />
            <br />
            <Card>
              <Card.Header>Account</Card.Header>
              <Card.Body>
                <Col>
                  <Tab.Container
                    id="list-group-tabs-example"
                    defaultActiveKey="#link1"
                  >
                    <Row>
                      <Col sm={4}>
                        <ListGroup>
                          <ListGroup.Item action href="#link1">
                            Profile
                          </ListGroup.Item>
                          <ListGroup.Item action href="#link2">
                            Alamat
                          </ListGroup.Item>
                          {token ? (
                            <ListGroup.Item action onClick={handleLogout}>
                              Logout
                            </ListGroup.Item>
                          ) : (
                            <Link
                              to={"/login"}
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              <ListGroup.Item action>Login</ListGroup.Item>
                            </Link>
                          )}
                        </ListGroup>
                      </Col>
                      <Col sm={8}>
                        <Tab.Content>
                          <Tab.Pane eventKey="#link1">
                            <Card>
                              <Card.Header>Profile</Card.Header>
                              <Card.Body>
                                <Table>
                                  <tbody>
                                    <tr>
                                      <th>Nama</th>
                                      <th>Email</th>
                                    </tr>
                                    <tr>
                                      <td>{user.fullname}</td>
                                      <td>{user.email}</td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </Card.Body>
                            </Card>
                          </Tab.Pane>
                          <Tab.Pane eventKey="#link2">
                            <Card>
                              <Card.Header>Alamat</Card.Header>
                              <Card.Body>
                                {showForm ? (
                                  <div>
                                    <Form onSubmit={handleAddAdress}>
                                      <Row>
                                        <Col>
                                          <Form.Group>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                              placeholder="Input Name"
                                              type="text"
                                              value={name}
                                              onChange={(e) =>
                                                setName(e.target.value)
                                              }
                                            />
                                          </Form.Group>
                                          <Form.Group>
                                            <Form.Label>Detail</Form.Label>
                                            <Form.Control
                                              placeholder="Detail"
                                              as="textarea"
                                              value={detail}
                                              onChange={(e) =>
                                                setDetail(e.target.value)
                                              }
                                            />
                                          </Form.Group>
                                        </Col>
                                        <Col>
                                          <Form.Group>
                                            <Form.Label>Provinsi</Form.Label>
                                            <Form.Control
                                              placeholder="Provinsi"
                                              type="text"
                                              value="Kalimantan Timur"
                                              disabled
                                            />
                                          </Form.Group>
                                          <Form.Group>
                                            <Form.Label>Kabupaten</Form.Label>
                                            <Form.Control
                                              placeholder="kabupaten"
                                              type="text"
                                              value="Samarinda"
                                              disabled
                                            />
                                          </Form.Group>
                                          <Form.Group>
                                            <Form.Label>Kecamatan</Form.Label>
                                            <Form.Select
                                              as="select"
                                              value={kecamatan}
                                              onChange={(e) =>
                                                setKecamatan(e.target.value)
                                              }
                                            >
                                              <option value="">
                                                {" "}
                                                -- Pilih Kecamatan --
                                              </option>
                                              {kecamatanData.map(
                                                (kecamatan) => (
                                                  <option
                                                    key={kecamatan.id}
                                                    value={kecamatan.name}
                                                  >
                                                    {kecamatan.name}
                                                  </option>
                                                )
                                              )}
                                            </Form.Select>
                                          </Form.Group>
                                          <Form.Group>
                                            <Form.Label>Kelurahan</Form.Label>
                                            <Form.Select
                                              as="select"
                                              value={kelurahan}
                                              onChange={(e) =>
                                                setKelurahan(e.target.value)
                                              }
                                            >
                                              <option value="">
                                                {" "}
                                                -- Pilih Kelurahan --
                                              </option>
                                              {kelurahanData
                                                .filter(
                                                  (kelurahanOption) =>
                                                    kelurahanOption.kecamatan ===
                                                    kecamatan
                                                )
                                                .map((filterKelurahan) => (
                                                  <option
                                                    value={filterKelurahan.name}
                                                    key={filterKelurahan.id}
                                                  >
                                                    {filterKelurahan.name}
                                                  </option>
                                                ))}
                                            </Form.Select>
                                          </Form.Group>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <Button
                                            variant="danger"
                                            onClick={toggleForm}
                                            style={{ width: "100%" }}
                                          >
                                            Cancel
                                          </Button>
                                        </Col>
                                        <Col>
                                          <Button
                                            style={{ width: "100%" }}
                                            variant="success"
                                            type="submit"
                                          >
                                            Save
                                          </Button>
                                        </Col>
                                      </Row>
                                    </Form>
                                  </div>
                                ) : editAddress ? (
                                  <div>
                                    <Form onSubmit={handleAddAdress}>
                                      <Row>
                                        <Col>
                                          <Form.Group>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                              placeholder="Input Name"
                                              type="text"
                                              value={editAddress.name}
                                              onChange={(e) =>
                                                setEditAddress({
                                                  ...editAddress,
                                                  name: e.target.value,
                                                })
                                              }
                                            />
                                          </Form.Group>
                                          <Form.Group>
                                            <Form.Label>Detail</Form.Label>
                                            <Form.Control
                                              placeholder="Detail"
                                              as="textarea"
                                              value={editAddress.detail}
                                              onChange={(e) =>
                                                setEditAddress({
                                                  ...editAddress,
                                                  detail: e.target.value,
                                                })
                                              }
                                            />
                                          </Form.Group>
                                        </Col>
                                        <Col>
                                          <Form.Group>
                                            <Form.Label>Provinsi</Form.Label>
                                            <Form.Control
                                              placeholder="Provinsi"
                                              type="text"
                                              value="Kalimantan Timur"
                                              disabled
                                            />
                                          </Form.Group>
                                          <Form.Group>
                                            <Form.Label>Kabupaten</Form.Label>
                                            <Form.Control
                                              placeholder="kabupaten"
                                              type="text"
                                              value="Samarinda"
                                              disabled
                                            />
                                          </Form.Group>
                                          <Form.Group>
                                            <Form.Label>Kecamatan</Form.Label>
                                            <Form.Select
                                              as="select"
                                              value={kecamatan}
                                              onChange={(e) =>
                                                setKecamatan(e.target.value)
                                              }
                                            >
                                              <option value="">
                                                {" "}
                                                --Pilih Kecamatan--{" "}
                                              </option>
                                              {kecamatanData.map(
                                                (kecamatan) => (
                                                  <option
                                                    key={kecamatan.id}
                                                    value={kecamatan.name}
                                                  >
                                                    {kecamatan.name}
                                                  </option>
                                                )
                                              )}
                                            </Form.Select>
                                          </Form.Group>
                                          <Form.Group>
                                            <Form.Label>Kelurahan</Form.Label>
                                            <Form.Select
                                              as="select"
                                              value={kelurahan}
                                              onChange={(e) =>
                                                setKelurahan(e.target.value)
                                              }
                                            >
                                              <option value="">
                                                {" "}
                                                --Pilih Kelurahan--
                                              </option>
                                              {kelurahanData
                                                .filter(
                                                  (kelurahanOption) =>
                                                    kelurahanOption.kecamatan ===
                                                    kecamatan
                                                )
                                                .map((filterKelurahan) => (
                                                  <option
                                                    value={filterKelurahan.name}
                                                    key={filterKelurahan.id}
                                                  >
                                                    {filterKelurahan.name}
                                                  </option>
                                                ))}
                                            </Form.Select>
                                          </Form.Group>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <Button
                                            variant="danger"
                                            onClick={() => setEditAddress(null)}
                                            style={{ width: "100%" }}
                                          >
                                            Cancel
                                          </Button>
                                        </Col>
                                        <Col>
                                          <Button
                                            style={{ width: "100%" }}
                                            variant="success"
                                            type="submit"
                                          >
                                            Save
                                          </Button>
                                        </Col>
                                      </Row>
                                    </Form>
                                  </div>
                                ) : (
                                 
                                  <div>
                                    <div style={{ textAlign: "right" }}>
                                      <Button
                                        variant="success"
                                        onClick={toggleForm}
                                      >
                                        Add New Address
                                      </Button>
                                    </div>
                                    <br />
                                    <Table>
                                      <thead>
                                        <tr>
                                          <th style={{ width: "25%" }}>Name</th>
                                          <th style={{ width: "60%" }}>
                                            Detail
                                          </th>
                                          <th>Action</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {address.map((item) => (
                                          <tr key={item._id}>
                                            <td>{item.name}</td>
                                            <td>
                                              {item.provinsi}, {item.kabupaten},{" "}
                                              {item.kecamatan}, {item.kelurahan}
                                              , {item.detail}
                                            </td>
                                            <td>
                                              <Button
                                                variant="warning"
                                                onClick={() =>
                                                  toggleFormEdit(item._id)
                                                }
                                              >
                                                <FaPen />
                                              </Button>{" "}
                                              <Button
                                                variant="danger"
                                                onClick={() =>
                                                  handleDeleteAddress(item._id)
                                                }
                                              >
                                                <FaTrash />
                                              </Button>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </Table>
                                  </div>
                                )}
                              </Card.Body>
                            </Card>
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
