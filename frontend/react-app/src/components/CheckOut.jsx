import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import './Home.css';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address1: '',
    address2: '',
    zipCode: '',
    paymentMethod: 'cash',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    setFormData({
      expiryDate: '',
      cvv: '',
    });
 }, []);

 const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
 }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Extract product IDs from your cart or wherever you store them
      const productIds = [/* ... */];
  
      // Make a request to the server to remove items
      await axios.post('/empty-cart', { productIds });
  
      // Set the orderPlaced state to true
      setOrderPlaced(true);
    } catch (error) {
      console.error('Error removing items:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleEmptyCart = async () => {
    try {
      // Make a request to the server to remove all items from the cart
      await axios.post('/empty-cart');

      // Set the orderPlaced state to true
      setOrderPlaced(true);

      // Show a success toast message
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Error removing items:', error);
      // Handle the error (e.g., show an error message to the user)
    }
 };


  return (
    <div>
    <Header />
    <Container className="d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 className="mb-4">Checkout</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name:</Label>
              <Input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required style={{ width:'400px' }} />
            </FormGroup>

            <FormGroup>
              <Label for="mobile">Mobile:</Label>
              <Input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleInputChange} required  style={{ width:'400px' }} />
            </FormGroup>

            <FormGroup>
              <Label for="email">Email:</Label>
              <Input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required  style={{ width:'400px' }}/>
            </FormGroup>

            <FormGroup>
              <Label for="address">Address Line 1:</Label>
              <Input type="text" id="address" name="address1" value={formData.address} onChange={handleInputChange} required  style={{  width:'400px' }} />
            </FormGroup>

            <FormGroup>
              <Label for="address">Address Line 2:</Label>
              <Input type="text" id="address" name="address2" value={formData.address} onChange={handleInputChange} required  style={{ width:'400px' }} />
            </FormGroup>

            <FormGroup>
              <Label for="zipCode">Pin Code:</Label>
              <Input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
            </FormGroup>

            <FormGroup>
              <Label for="paymentMethod">Payment Method:</Label>
              <Input
                type="select"
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
              </Input>
            </FormGroup>

            {formData.paymentMethod === 'card' && (
              <div>
                <FormGroup>
                  <Label for="cardNumber">Card Number:</Label>
                  <Input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="expiryDate">Expiry Date:</Label>
                  <Input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="cvv">CVV:</Label>
                  <Input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleInputChange} required />
                </FormGroup>
              </div>
            )}


<Button color="primary" type="submit" onClick={handleEmptyCart}>
 Place Order
</Button>
          </Form>

          {orderPlaced && <p className="mt-3">Order placed successfully!</p>}
        </Col>
      </Row>
    </Container>
    <Footer />
    </div>
  );
};

export default CheckoutForm;