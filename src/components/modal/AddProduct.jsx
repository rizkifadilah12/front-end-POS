import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axiosDriver from "../../utils/axios";

const AddProduct = ({ showModal, handleClose, handleAddProduct }) => {
    const [name, setName] = useState("");
    const [image_url, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [tag, setTag] = useState([]);
    const [newtag, setNewTag] = useState("");
    const [price, setPrice] = useState("");

    const handleSave = () => {
        handleAddProduct(name, image_url, description, newCategory, newtag, price);
        handleClose();
    };

    const onCheck = (e) => {
        let tags = [...newtag];
        if(e.target.checked) {
            tags.push(e.target.value)
        } else {
            tags = tags.filter(tag => tag !== e.target.value)
        }

        setNewTag(tags);
    }

    useEffect(() => {
        axiosDriver.get('http://localhost:3000/api/category')
        .then((res) => {
            setCategory(res.data);
        });
    },[])

    useEffect(() => {
        axiosDriver.get('http://localhost:3000/api/tags')
        .then((res) => {
            setTag(res.data)
        })
    },[])

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Data Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="ProductName" style={{marginBottom:'3%'}}>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="ProductImage" style={{marginBottom:'3%'}}>
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control
                            type="File"
                            placeholder="Chose Image File"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </Form.Group>
                    <Form.Group controlId="ProductDescription" style={{marginBottom:'3%'}}>
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter Product Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="ProductCategory" style={{marginBottom:'3%'}}>
                        <Form.Label>Product Category</Form.Label>
                        <Form.Select
                            as="select"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        >
                        <option value="">-- Chose Category --</option>
                        {
                            category.map((categoryItem) => (
                                <option key={categoryItem._id} value={categoryItem.name}>
                                    {categoryItem.name}
                                </option>
                            ))
                        }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="ProductTag" style={{marginBottom:'3%'}}>
                        <Form.Label>Product Tag</Form.Label>
                        {tag.map((item,id) => (
                            <Form.Check
                                key={id}
                                label={item.name}
                                name="group1"
                                type='checkbox'
                                id={item._id}
                                value={item.name}
                                onChange={onCheck}
                            />
                        ))}
                    </Form.Group>
                    <Form.Group controlId="ProductPrice" style={{marginBottom:'3%'}}>
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddProduct;
