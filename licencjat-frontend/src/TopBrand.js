import { Navbar, Container, Button, NavDropdown, Nav } from "react-bootstrap";
import "./TopBrand.css";

export default function TopBrand() {
  return (
    <Navbar
      id="top-brand"
      collapseOnSelect
      expand="lg"
      className="brand-background"
    >
      <Container className="dropdown-brand">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="logo.png"
            height="45"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto d-lg-none">
            <Nav.Link href="#">Strona główna</Nav.Link>
            <Nav.Link href="#">Ogłoszenia</Nav.Link>
            <Nav.Link href="#">Powiadomienia</Nav.Link>
            <Nav.Link href="#">Moje ogłoszenia</Nav.Link>
            <NavDropdown title="Przepisy" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#">Przepisy</NavDropdown.Item>
              <NavDropdown.Item href="#">Dodaj przepis</NavDropdown.Item>
              <NavDropdown.Item href="#">Twoje przepisy</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">coś tam</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">Wskazówki</Nav.Link>
            <Nav.Link href="#">Konto</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="#">
              <Button className="btn-signup">Załóż konto</Button>
            </Nav.Link>
            <Nav.Link href="#">
              <Button className="btn-signin">Zaloguj</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
