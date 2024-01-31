import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import axiosDriver from "../../utils/axios";
import { useToasts } from "react-toast-notifications";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import AddProduct from "../../components/modal/AddProduct";
import EditProduct from "../../components/modal/EditProduct";

const DataProduct = () => {
  const [data, setdata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const { addToast } = useToasts();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
  };

  const handleUpdate = async (updateProduct) => {
    const formData = new FormData();
    formData.append("name", updateProduct.name);
    formData.append("description", updateProduct.description);
    formData.append("category", updateProduct.category);
    updateProduct.tags.forEach((tagId) => {
      formData.append("tags[]", tagId);
    });
    formData.append("price", updateProduct.price);
    formData.append("image", updateProduct.image);

    try {
      await axiosDriver.put(
        `http://localhost:3000/api/Products/${updateProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const response = await axiosDriver.get(
        "http://localhost:3000/api/Products"
      );
      setdata(response.data.data);
      setEditProduct(null);
      addToast("Update Successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddProduct = async (
    ProductName,
    ProductImage,
    ProductDescription,
    ProductCategory,
    ProductTag,
    ProductPrice
  ) => {
    let formData = new FormData();
    formData.append("name", ProductName);
    formData.append("image_url", ProductImage);
    formData.append("description", ProductDescription);
    formData.append("category", ProductCategory);
    ProductTag.forEach((item) => {
      formData.append("tags[]", item);
    });
    formData.append("price", ProductPrice);
    await axiosDriver.post("http://localhost:3000/api/Products", formData);
    addToast("Add Successfully", { appearance: "success", autoDismiss: true });
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  };

  const handleDeleteProduct = (id) => {
    axiosDriver
      .delete(`http://localhost:3000/api/Products/${id}`)
      .then((res) => {
        setdata(data.filter((item) => item._id !== id));
      });
    addToast("Delete Successfully", { appearance: "error", autoDismiss: true });
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  };

  const handlePageChange = (pageNumber) => {
    const newSkip = (pageNumber - 1) * perPage;
    setPage(pageNumber);
    setSkip(newSkip);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/Products?skip=${skip}&limit=${perPage}`)
      .then((res) => {
        setdata(res.data.data);
        setTotalPages(Math.ceil(res.data.count / perPage));
      });
  }, [skip, perPage]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col sm={2}>
            <Sidebar />
          </Col>
          <Col>
            <Navbar />
            <br />
            <h2>Product Data</h2>
            <br />
            <div style={{ textAlign: "right" }}>
              <Button
                style={{ marginBottom: "10px" }}
                onClick={handleShowModal}
              >
                Add Data Product
              </Button>
            </div>
            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th style={{ width: "15%" }}>ID</th>
                  <th style={{ width: "15%" }}>Image</th>
                  <th style={{ width: "10%" }}>Name</th>
                  <th style={{ width: "15%" }}>Description</th>
                  <th style={{ width: "10%" }}>Category</th>
                  <th style={{ width: "15%" }}>Tags</th>
                  <th style={{ width: "10%" }}>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, id) => (
                  <tr key={id}>
                    <td>{item._id}</td>
                    <td>
                      <img
                        src={`http://localhost:3000/images/product/${item.image_url}`}
                        alt=""
                        style={{ height: "100px", width: "100%" }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.category && item.category.name}</td>
                    <td>
                      {Array.isArray(item.tags)
                        ? item.tags.map((tag) => tag.name).join(", ")
                        : item.tags.name}
                    </td>
                    <td>{item.price}</td>
                    <td className="text-center">
                      <Button
                        variant="warning"
                        onClick={() => handleEditClick(item)}
                      >
                        <FaEdit />
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are You sure to delete this record?"
                            )
                          ) {
                            handleDeleteProduct(item._id);
                          }
                        }}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                />
                {Array.from({ length: totalPages }, (_, index) => (
                  <Pagination.Item
                    key={index}
                    active={index + 1 === page}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  disabled={page === totalPages}
                  onClick={() => handlePageChange(page + 1)}
                />
              </Pagination>
            </div>
            <AddProduct
              showModal={showModal}
              handleClose={handleCloseModal}
              handleAddProduct={handleAddProduct}
            />
            {editProduct && (
              <EditProduct
                product={editProduct}
                handleUpdate={handleUpdate}
                handleClose={() => setEditProduct(null)}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DataProduct;
