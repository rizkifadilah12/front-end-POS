import React, { useState } from "react";
import Validator from "validatorjs";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axiosDriver from "../../utils/axios";

const ShowError = ({ error }) => {
    return (
      <Alert variant="danger">
        <ul style={{ padding: "20" }}>
          {error.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      </Alert>
    );
  };

const RegisterUser = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = { fullname, email, password }
        let rules = {
            fullname: "required|min:8",
            email: "required|email",
            password: "required|min:8"
        }

        let validation = new Validator(data, rules);
        if(validation.passes() === true) {
            axiosDriver.post('http://localhost:3000/auth/register', data);
            alert("Register Successfully");
            navigate('/login');
        } else {
            setError([
                ...validation.errors.get("fullname"),
                ...validation.errors.get("email"),
                ...validation.errors.get("password"),
            ]);
        }
    }

    return(
        <Container className="d-flex justify-content-center" style={{marginTop: '100px'}}>
            <Card style={{ width: "28rem", padding: "30px" }}>
                <h3 className="center">Register Account</h3>
                {error.length > 0 && <ShowError error={error} />}
                <Form onSubmit={handleSubmit}>
                    <Form.Group style={{ marginBottom: "20px" }}>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="name" 
                            value={fullname} 
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group style={{ marginBottom: "20px" }}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group style={{ marginBottom: "20px" }}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            name="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button style={{width: '100%', marginBottom:'5px'}} type="submit">Register</Button>
                    Sudah Punya Akun? <span className="text-primary">
                        <Link to='/login' style={{textDecoration:'none'}}>Login</Link>
                    </span>
                </Form>
            </Card>
        </Container>
    )
}

export default RegisterUser;