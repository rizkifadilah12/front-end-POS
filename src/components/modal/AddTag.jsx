import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddTag = ({ showModal, handleClose, handleAddTag }) => {
    const [name, setName] = useState("");

    const handleSave = () => {
        // Anda bisa melakukan validasi atau pemrosesan data lainnya sebelum menambahkannya
        handleAddTag(name);
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Data Tag</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="TagName">
                    <Form.Label>Tag Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Tag name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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

export default AddTag;
