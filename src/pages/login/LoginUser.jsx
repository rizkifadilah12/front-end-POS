import React, { useState } from "react";
import Validator from "validatorjs";
import { Form, Button, Container, Row, Col, Alert, Card } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Input = ({ label, type, name, value, onChange }) => {
  return (
    <Form.Group as={Col}>
      <Form.Label>{label}:</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Form.Group>
  );
};

const ShowErrors = ({ errors }) => {
  return (
    <Alert variant="danger">
      <ul style={{ padding: "20" }}>
        {errors.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>
    </Alert>
  );
};

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { email, password };

    let rules = {
      email: "required|email",
      password: "required",
    };

    let validation = new Validator(data, rules);
    if (validation.passes() === true) {
      try {
        const response = await axios.post("http://localhost:3000/auth/login", data);
        if (response.status === 200 && response.data.message === 'login success') {
          alert("Login successful!");
          localStorage.setItem(`token`, response.data.token);
          navigate('/');
        } else {
          alert("Email or password wrong");
          setEmail('');
          setPassword('');
          setErrors([]);
        }
      } catch (error) {
        alert("An error occurred during login");
        console.error(error);
      }
    } else {
      setErrors([
        ...validation.errors.get("email"),
        ...validation.errors.get("password"),
      ]);
    }
  };

  return (
    <Container className="d-flex justify-content-center" style={{marginTop: '100px'}}>
      <Card style={{ width: "28rem", padding: "30px" }}>
        <h3 className="center">Login Page</h3>
        {errors.length > 0 && <ShowErrors errors={errors} />}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Input
                type="email"
                name="email"
                label="Email"
                value={email}
                onChange={(value) => setEmail(value)}
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Input
                type="password"
                name="password"
                label="Password"
                value={password}
                onChange={(value) => setPassword(value)}
              />
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit" style={{ width: "100%", marginBottom: '5px' }}>
            Login
          </Button>
          Don't have an account? <span >
            <Link to='/register' style={{color:'red', textDecoration:'none'}}>Register</Link>
            </span>
        </Form>
      </Card>
    </Container>
  );
};

export default LoginUser;
