import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faComments, faEnvelope, faStar } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Nav, NavLink } from 'reactstrap';

import './Footer.css'

const Footer = () => {
    return (
      <footer className=" py-3 bg-dark text-light">
        <Container>
          <Row>
            <Col md="4">
              <h5 className="mb-0">PRODUCTS</h5>
              <Nav className="flex-column">
                
                <NavLink href="/category/CLOTHES" className="text-light mb-0 ">Clothes</NavLink>
                <NavLink href="/category/BOOKS" className="text-light mb-0">Books</NavLink>
                <NavLink href="/category/FURNITURE" className="text-light mb-0">Furniture</NavLink>
                <NavLink href="/category/ELECTRONICS" className="text-light mb-0">Electronics</NavLink>
                <NavLink href="/category/ACCESSORIES" className="text-light mb-0">Accessories</NavLink>
              </Nav>
            </Col>
            <Col md="4">
              <h5 className="mb-0">YOUR ACCOUNT</h5>
              <Nav className= "flex-column">
              <NavLink href="/add-product" className="text-light mb-0">Sell</NavLink>
                <NavLink href="/my-profile" className="text-light mb-0">Profile</NavLink>
                <NavLink href="/liked-products" className="text-light mb-0">Wishlist</NavLink>
                <NavLink href="/carted-products" className="text-light mb-0">Cart</NavLink>
              </Nav>
            </Col>
            <Col md="4">
              <h5 className="mb-0">Contact & Support</h5>
              <Nav className="flex-column">
                <p className="text-light mb-0"><FontAwesomeIcon icon={faPhone} /> +91 9988776655</p>
               
              </Nav>
            </Col>
          </Row>
  
          <div className="text-center mt-4"><FontAwesomeIcon  className="text-light" /></div>
  
          <Row className="text-center mt-0">
            <Col md="0">
              <span className="copyright quick-links text-light">Copyright &copy; ThriftStyle {new Date().getFullYear()}</span>
            </Col>
            <Col md="0">
              <ul className="list-inline quick-links">
                <li className="list-inline-item">
                  <a href="#" className="text-light">Privacy Policy</a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="text-light">Terms of Use</a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
  
  export default Footer;