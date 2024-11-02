import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import useUserInfo from "../../hooks/useUserInfo";

export const NavigationBar = ({ onLoggedOut }) => {
  const userInfo = useUserInfo();

  return (
    <Navbar bg="primary" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Movies App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {userInfo.user ? (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
