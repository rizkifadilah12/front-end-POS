import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import axiosDriver from "../../utils/axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbars from "../../components/navbar/Navbar";
import AddCategoryModal from "../../components/modal/AddCategoryModal";

const DataCategory = () => {
  const [data, setdata] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleAddCategory = async (categoryName) => {
    await axiosDriver.post("http://localhost:3000/api/category", {
      name: categoryName,
    });
    window.location.reload();
  };

  const handleDeleteCategory = (id) => {
    axiosDriver
      .delete(`http://localhost:3000/api/category/${id}`)
      .then((res) => {
        setdata(data.filter((item) => item._id !== id));
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/category").then((res) => {
      setdata(res.data);
    });
  }, []);

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
            <h2>Category Data</h2>
            <br />
            <div style={{ textAlign: "right" }}>
              <Button
                style={{ marginBottom: "10px" }}
                onClick={handleShowModal}
              >
                Add Data Category
              </Button>
            </div>
            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th style={{ width: "40%" }}>ID</th>
                  <th style={{ width: "50%" }}>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, id) => (
                  <tr key={id}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td className="text-center">
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteCategory(item._id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <AddCategoryModal
              showModal={showModal}
              handleClose={handleCloseModal}
              handleAddCategory={handleAddCategory}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DataCategory;
