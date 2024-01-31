import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import axiosDriver from "../../utils/axios";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbars from "../../components/navbar/Navbar";
import AddTag from "../../components/modal/AddTag";

const DataTag = () => {
  const [data, setdata] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleAddTag = (TagName) => {
    axiosDriver.post("http://localhost:3000/api/tags", {
      name: TagName,
    });
    window.location.reload();
  };

  const handleDeleteTag = (id) => {
    axiosDriver.delete(`http://localhost:3000/api/tags/${id}`).then((res) => {
      setdata(data.filter((item) => item._id !== id));
    });
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/tags").then((res) => {
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
            <h2>Tag Data</h2>
            <br />
            <div style={{ textAlign: "right" }}>
              <Button
                style={{ marginBottom: "10px" }}
                onClick={handleShowModal}
              >
                Add Data Tag
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
                        onClick={() => handleDeleteTag(item._id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <AddTag
              showModal={showModal}
              handleClose={handleCloseModal}
              handleAddTag={handleAddTag}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DataTag;
