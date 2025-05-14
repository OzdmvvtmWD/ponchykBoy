import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function FooterBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary mt-5">
      <Container fluid>
        <Row className="w-100 text-center text-md-start">
          <Col md={4}>
            <Navbar.Brand href="#">Footer</Navbar.Brand>
          </Col>
          <Col md={4}>
            <h6>Opening Hours</h6>
            <p>Mon–Fri: 9:00 AM – 6:00 PM</p>
            <p>Sat: 10:00 AM – 2:00 PM</p>
            <p>Sun: Closed</p>
          </Col>
          <Col md={4}>
            <h6>Contact</h6>
            <p>Phone: +(380) 6123-45-67</p>
            <p>Email: ponchykb@y.com</p>
            <p>Address: 23 Khreshatyk, Kiev</p>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default FooterBar;
