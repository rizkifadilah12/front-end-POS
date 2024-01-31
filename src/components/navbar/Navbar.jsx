import React, { useEffect, useState } from "react";

import { Button, Container, Dropdown, Form, Nav, Navbar } from "react-bootstrap";
import { FaCartPlus, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosDriver from "../../utils/axios";

const Navbars = () => {
    const [data, setdata] = useState([]);
    const [_product, setProduct] = useState([]);
    const [search, setsearch] = useState('');

    useEffect(() => {
        axiosDriver.get('http://localhost:3000/api/category').then((res) => {
            setdata(res.data);
        })
    },[search])

    function getDataBySearch(e){
        e.preventDefault();
        var url = `http://localhost:3000/api/products?q=${search}`;
    
        axiosDriver.get(url).then((res) => {
            setProduct(res.data);
        })
    }

    return(
        <div>
            <Navbar expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">MyStore</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                    </Nav>
                    <Form className="d-flex" onSubmit={getDataBySearch}>
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2 "
                        aria-label="Search"
                        style={{width: '300px'}}
                        value={search}
                        onChange={e => setsearch(e.target.value)}
                        />
                        <Button type="submit" variant="dark"><FaSearch/></Button>
                    </Form>
                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            Category
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        {
                            data.map((item, id) => (
                                <Dropdown.Item key={id}>
                                    {item.name}
                                </Dropdown.Item>
                            ))
                        }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Link to={`/cart`}>
                            <Button variant="outline-dark"><FaCartPlus/></Button>
                    </Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navbars;