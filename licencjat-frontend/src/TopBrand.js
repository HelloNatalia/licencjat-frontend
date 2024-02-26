import { Navbar, Container, Button, NavDropdown, Nav } from "react-bootstrap";
import "./TopBrand.css";
import { useEffect, useState } from "react";
import {
  getAuthTokenFromCookie,
  removeAuthTokenCookie,
} from "./cookies/auth-cookies";
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom";

export default function TopBrand() {
  const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = getAuthTokenFromCookie();

  useEffect(
    function () {
      async function fetchUserData() {
        try {
          const res = await fetch("http://localhost:4000/auth/user-data", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (res.status === 401) setUserData("");
          const data = await res.json();
          setUserData(data);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
      if (accessToken) {
        fetchUserData();
      } else {
        setIsLoading(false);
      }
    },
    [accessToken]
  );

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Navbar
      id="top-brand"
      collapseOnSelect
      expand="lg"
      className="brand-background"
    >
      <Container className="dropdown-brand">
        <Navbar.Brand href="/announcements">
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
            <Nav.Link href="/">Strona główna</Nav.Link>
            <Nav.Link href="/announcements">Ogłoszenia</Nav.Link>
            <Nav.Link href="/requests">Powiadomienia</Nav.Link>
            <Nav.Link href="/my-announcements">Moje ogłoszenia</Nav.Link>
            <NavDropdown title="Przepisy" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/recipes">Przepisy</NavDropdown.Item>
              <NavDropdown.Item href="#">Dodaj przepis</NavDropdown.Item>
              <NavDropdown.Item href="#">Twoje przepisy</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">coś tam</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">Wskazówki</Nav.Link>
            <Nav.Link href="#">Konto</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {userData === "" ? (
              <>
                <Nav.Link href="/signup">
                  <Button className="btn-signup">Załóż konto</Button>
                </Nav.Link>
                <Nav.Link href="/login">
                  <Button className="btn-signin">Zaloguj</Button>
                </Nav.Link>
              </>
            ) : (
              <Nav.Link>
                <LogoutButton />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function LogoutButton() {
  const navigate = useNavigate();
  const logout = () => {
    removeAuthTokenCookie();
    navigate("/login");
  };

  return (
    <Button onClick={logout} className="btn-signup">
      Wyloguj
    </Button>
  );
}
