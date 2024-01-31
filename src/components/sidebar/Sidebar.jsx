import React, { useState } from 'react';
import './sidebar.css'
import { FaHome, FaClipboardList, FaChartBar, FaUser, FaCog, FaBox, FaTags, FaList, FaBars } from 'react-icons/fa';
import { Collapse, Container, Nav, NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axiosDriver from '../../utils/axios';

const Sidebar = () => {
    const [openSetting, setOpenSetting] = useState(false);
    const [user, setUser] = useState([]);

    useEffect(() => {
        axiosDriver.get('http://localhost:3000/auth/me')
        .then((res) => {
            setUser(res.data)
        })
    },[])

    const role = user.role;

    const toggleSetting = () => {
        setOpenSetting(!openSetting);
    };

    return (
        <div className="text-start h-100">
            <Container fluid>
                {
                    role === 'admin' ? (
                        <Nav className="flex-column">
                            <Nav.Link className='sidebar-link' style={{marginBottom:'-8px'}}><FaBars /> menu</Nav.Link>
                            <hr />
                            <Nav.Link className='sidebar-link'><Link className='none'to={`/`}><FaHome /> Home</Link></Nav.Link>
                            <Nav.Link className='sidebar-link'><Link className='none'to={`/order`}><FaClipboardList /> Order</Link></Nav.Link>
                            <Nav.Link onClick={toggleSetting} className="sidebar-link">
                                <FaCog /> Data Setting
                            </Nav.Link>
                            <Collapse in={openSetting}>
                                <div className="sidebar-submenu">
                                    <NavDropdown.Item className='navdropdown'><Link className='none'to={`/data-category`}><FaList /> Data Category</Link></NavDropdown.Item>
                                    <NavDropdown.Item className='navdropdown'><Link className='none'to={`/data-product`}><FaBox /> Data Product</Link></NavDropdown.Item>
                                    <NavDropdown.Item className='navdropdown'><Link className='none'to={`/data-tag`}><FaTags /> Data Tag</Link></NavDropdown.Item>
                                </div>
                            </Collapse>
                          
                            <Nav.Link className='sidebar-link'><Link className='none'to={`/profile`}><FaUser /> Profile</Link></Nav.Link>
                        </Nav>
                    ) : (
                        <Nav className="flex-column">
                            <Nav.Link className='sidebar-link' style={{marginBottom:'-8px'}}><FaBars /> menu</Nav.Link>
                            <hr />
                            <Nav.Link className='sidebar-link'><Link className='none'to={`/`}><FaHome /> Home</Link></Nav.Link>
                            <Nav.Link className='sidebar-link'><Link className='none'to={`/order`}><FaClipboardList /> Order</Link></Nav.Link>
                            <Nav.Link className='sidebar-link'><Link className='none'to={`/profile`}><FaUser /> Profile</Link></Nav.Link>
                        </Nav>
                    )
                }
            </Container>
        </div>
    );
}

export default Sidebar;
