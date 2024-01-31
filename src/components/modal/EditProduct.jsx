import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axiosDriver from "../../utils/axios";


const EditProduct = ({ product, handleUpdate, handleClose }) => {
    const [category, setCategory] = useState([]);
 
    const [tag, setTag] = useState([]);

    const [editedProduct, setEditedProduct] = useState({
        _id: product._id,
        image: product.image,
        name: product.name,
        description: product.description,
        category: product.category.name,
        tags: product.tags.map(tag => tag.name),
        price: product.price
      
    });

    const handleTagsChange = (event) => {
        const tagId = event.target.value;
        setEditedProduct(prevProduct => {
            if (prevProduct.tags.includes(tagId)) {
               
                return {
                    ...prevProduct,
                    tags: prevProduct.tags.filter(tag => tag !== tagId)
                };
            } else {
                return {
                    ...prevProduct,
                    tags: [...prevProduct.tags, tagId]
                };
            }
        });
    };    

    const handleSubmit = () => {
        handleUpdate(editedProduct);
        console.log(editedProduct);
    };

    useEffect(() => {
        axiosDriver.get("http://localhost:3000/api/categories").then((res) => {
            setCategory(res.data)
        })
        
        axiosDriver.get("http://localhost:3000/api/tags").then((res) => {
            setTag(res.data)
        })
    },[])
    

    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                    <Form.Group controlId="ProductName" style={{marginBottom:'3%'}}>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product name"
                            value={editedProduct.name}
                            onChange={(e) => setEditedProduct({...editedProduct,
                                name: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group controlId="ProductImage" style={{marginBottom:'3%'}}>
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                setEditedProduct({
                                    ...editedProduct,
                                    image: e.target.files[0],
                                });
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="ProductDescription" style={{marginBottom:'3%'}}>
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter Product Description"
                            value={editedProduct.description}
                            onChange={(e) => setEditedProduct({...editedProduct,
                                description: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group controlId="ProductCategory" style={{marginBottom:'3%'}}>
                        <Form.Label>Product Category</Form.Label>
                        <Form.Select
                            as="select"
                            value={editedProduct.category}
                            onChange={(e) => setEditedProduct({...editedProduct,
                                category: e.target.value})}
                            name="category"
                        >
                        <option value={editedProduct.category}>{editedProduct.category}</option>
                        {
                            category?.map((categoryItem) => (
                                <option key={categoryItem._id} value={categoryItem.name}>
                                    {categoryItem.name}
                                </option>
                            ))
                        }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="ProductTag" style={{marginBottom:'3%'}}>
                        <Form.Label>Product Tag</Form.Label>
                        {tag.map((item) => (
                            <Form.Check
                                label={item.name}
                                name="group1"
                                key={item._id}
                                type='checkbox'
                                id={item._id}
                                value={item.name}
                                onChange={handleTagsChange}
                                checked={editedProduct.tags.includes(item.name)}
                            />
                        ))}
                    </Form.Group>
                    <Form.Group controlId="ProductPrice" style={{marginBottom:'3%'}}>
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product Price"
                            value={editedProduct.price}
                            onChange={(e) => setEditedProduct({...editedProduct,
                                price: e.target.value})}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditProduct;
