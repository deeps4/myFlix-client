import PropTypes from "prop-types";
import { useState } from "react";
import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export const NavigationBar = ({ onLoggedOut, userInfo, findMovies }) => {
  const { pathname } = useLocation();

  const isHomePage = pathname === "/";
  const [movieName, setMovieName] = useState("");

  const handleMovieInput = (event) => {
    setMovieName(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    findMovies(movieName);
  };
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

        {isHomePage && (
          <Form onSubmit={handleSearch}>
            <Row>
              <Col xs="auto">
                <Form.Control
                  onChange={handleMovieInput}
                  type="text"
                  value={movieName}
                  placeholder="Movie"
                />
              </Col>
              <Col xs="auto">
                <Button type="submit">Search</Button>
              </Col>
            </Row>
          </Form>
        )}
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  userInfo: PropTypes.shape({
    user: PropTypes.shape({
      Username: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
      Birthday: PropTypes.string.isRequired,
      FavouriteMovies: PropTypes.array,
    }),
    token: PropTypes.string.isRequired,
  }).isRequired,
  onLoggedOut: PropTypes.func.isRequired,
  findMovies: PropTypes.func.isRequired,
};
