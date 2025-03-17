import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function FooterBar() {
  return (
    // <footer>
    <Navbar expand="lg"  className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Footer</Navbar.Brand>
      </Container>
    </Navbar>
    // </footer>
  );
}

export default FooterBar;