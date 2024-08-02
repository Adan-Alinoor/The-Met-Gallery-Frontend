import React, { useState } from 'react';
//import { Button, Card, InputGroup, FormControl, Container, Row, Col, Alert } from 'react-bootstrap';

// Example art items
const artItems = [
  { id: 1, name: 'Starry Night', description: 'A famous painting by Vincent van Gogh.', image: 'path_to_image_1.jpg', price: 100 },
  { id: 2, name: 'Mona Lisa', description: 'A portrait by Leonardo da Vinci.', image: 'path_to_image_2.jpg', price: 200 },
  { id: 3, name: 'The Persistence of Memory', description: 'A surrealistic painting by Salvador Dalí.', image: 'path_to_image_3.jpg', price: 150 }
];

const Cart = () => {
  const [cart, setCart] = useState(artItems.map(item => ({ ...item, quantity: 1 })));

  const handleQuantityChange = (id, value) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: parseInt(value) } : item));
  };

  const handleRemoveItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Shopping Cart</h1>
      {cart.length === 0 && <Alert variant="info">Your cart is empty.</Alert>}
      <Row>
        {cart.map(item => (
          <Col md={4} key={item.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.image} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <InputGroup className="mb-3">
                  <FormControl
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>${item.price.toFixed(2)}</InputGroup.Text>
                  </InputGroup.Append>
                  <Button variant="danger" className="ml-2" onClick={() => handleRemoveItem(item.id)}>
                    Remove
                  </Button>
                </InputGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="mt-4">
        <h3>Total Price: ${getTotalPrice().toFixed(2)}</h3>
      </div>
    </Container>
  );
};

export default Cart;
