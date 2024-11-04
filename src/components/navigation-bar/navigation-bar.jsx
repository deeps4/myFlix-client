import PropTypes from "prop-types";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ onLoggedOut, userInfo }) => {
  return (
    <Navbar bg="primary" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Movies App
        </Navbar.Brand>
        <Nav className="me-auto">
          <NavDropdown id="basic-nav-dropdown">
            {userInfo.user ? (
              <>
                <NavDropdown.Item href="/">Home</NavDropdown.Item>
                <NavDropdown.Item href="/profile">Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={onLoggedOut}>
                  Logout
                </NavDropdown.Item>
              </>
            ) : (
              <>
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
              </>
            )}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};
NavigationBar.PropTypes = {
  userInfo: PropTypes.shape({
    user: PropTypes.shape({
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
      Birthday: PropTypes.string.isRequired,
      FavouriteMovies: PropTypes.array,
    }),
    token: PropTypes.string.isRequired,
  }).isRequired,
  onLoggedOut: PropTypes.func.isRequired,
};
