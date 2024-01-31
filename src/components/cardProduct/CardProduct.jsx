import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Dropdown, Form, Nav, Navbar, Pagination, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { FaCartPlus, FaSearch } from "react-icons/fa";
import axiosDriver from "../../utils/axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { addToCart, getCart } from "../../app/action/cartAction";
import { connect, useDispatch, useSelector } from "react-redux";


const CardProduct = ({addToCart, getCart}) => {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, _setPerPage] = useState(12);
  const [totalPage, setTotalPage] = useState(0);
  const [skip, setSkip] = useState(0);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tag, setTag] = useState([]);
  const [user, setUser] = useState('')
  const [selectedTag, setSelectTag] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    let apiUrl = `http://localhost:3000/api/Products?skip=${skip}&limit=${perPage}`
    if(selectedCategory){
      apiUrl += `&category=${selectedCategory}`
    }

    if(selectedTag.length > 0){
      apiUrl += selectedTag.map((tag) => `&tag[]=${tag}`).join('')
    }

    axiosDriver.get(apiUrl)
    .then((res) => {
      setProduct(res.data.data);
      setTotalPage(Math.ceil(res.data.count / perPage))
    })
  },[skip, perPage, selectedCategory, selectedTag]);

  useEffect(() => {
    axiosDriver.get("http://localhost:3000/api/category")
    .then((res) => {
      setCategory(res.data);
    })
  },[]);
  useEffect(() => {
    axiosDriver.get('http://localhost:3000/auth/me')
    .then((res) => {
        setUser(res.data)
    })
},[])

  useEffect(() => {
    axiosDriver.get(`http://localhost:3000/api/tags`)
    .then((res) => {
      setTag(res.data);
    })
  },[])

  const getCartItems = () => async(dispatch) => {
    if (user) {
      try {
        dispatch(getCart());
      } catch (error) {
        
      }  
    }
  }

  useEffect(() => {
    dispatch(getCartItems());
  },[dispatch])

  const totalQty = cart.reduce((total, item) => total + item.qty, 0 );
  
  const handlePageChange = (pageNumber) => {
    const newSkip = (pageNumber - 1) * perPage
    setPage(pageNumber);
    setSkip(newSkip);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    axiosDriver.get(`http://localhost:3000/api/Products?skip=${skip}&limit=${perPage}&q=${search}`)
    .then((res) => {
      setProduct(res.data.data)
    })
  }

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  }

  const handleAddToCart = (product) => {
      addToCart(product);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
        didClose: () => {
          window.location.reload();
        },
      });
      Toast.fire({
        icon: "success",
        title: "Adding cart  successfully",
      });

    }

  const renderCards = () => {
    return product?.map((item, id) => (
      <Col key={id} md={2} lg={2} className="d-flex justify-content-center">
        <Card style={{ width: '16rem', marginBottom: '20px', height:"350px" }}>
          <div style={{textAlign:'center'}}>
            <Card.Img 
              variant="top" 
              src={`http://localhost:3000/images/product/${item.image_url}`} 
              style={{height: '150px', width: '160px', margin:'5px', borderRadius:'5px'}}
            />
          </div>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              {item.description}
            </Card.Text>
        
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col><Card.Title>Rp.{item.price}</Card.Title></Col>
              <Col>
                <div style={{textAlign: 'right'}}>
                  <Button variant="outline-dark"
                    style={{textAlign: 'right'}}
                    onClick={() => handleAddToCart(item)}
                  ><FaCartPlus/></Button>
                </div>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
    ));
  };

  return(
    <div>
      <Navbar >
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
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 "
                aria-label="Search"
                style={{width: '300px'}}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Button type="submit" variant="dark"><FaSearch/></Button>
            </Form>
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                Category
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {
                  category?.map((item, id) => (
                    <Dropdown.Item 
                      key={id}
                      onClick={() => handleCategoryChange(item.name)}
                    >
                      {item.name}
                    </Dropdown.Item>
                  ))
                }
              </Dropdown.Menu>
            </Dropdown>
            <Link to={`/cart`}>
              <Button variant="outline-dark"><FaCartPlus/>
                <span className="notification-badge">
                  {totalQty}
                </span>
              </Button>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <div >
        {
          tag.map((item, id) => (
            <ToggleButtonGroup
              type="checkbox"
              key={id}
              value={selectedTag}
              onChange={setSelectTag}
              className="mt-3"
            >
              <ToggleButton 
                id={`tbg-btn-${id}`} 
                value={item.name} 
                style={{marginLeft:'5px'}}
                variant={selectedTag.includes(item.name)?"dark":"outline-dark"}
              >
                  {item.name} 
              </ToggleButton>
            </ToggleButtonGroup>
          ))
        }
      </div><br />

      <Row style={{textAlign:'center'}}>
        {renderCards()}
      </Row><br /><br />
      <Row>
        <div className="d-flex justify-content-start" style={{marginLeft:"200px"}}>
          <Pagination>
            <Pagination.Prev
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            />
            {
              Array.from({ length: totalPage }, (_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === page}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))
            }
            <Pagination.Next
              disabled={page === totalPage}
              onClick={() => handlePageChange(page + 1)}
            />
            </Pagination>
        </div>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => ({
  selectedProduct: state.cart
});

export default connect(mapStateToProps, {addToCart, getCart})(CardProduct);