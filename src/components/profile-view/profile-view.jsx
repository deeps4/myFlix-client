import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import PropTypes from "prop-types";

export const ProfileView = ({ movies, onDeregisterSuccess, userInfo }) => {
  const [user, setUser] = useState({ ...userInfo.user });

  const birthday = new Date(user.Birthday).toISOString().split("T")[0];

  const handleSaveChanges = (event) => {
    event.preventDefault();

    const data = {
      Username: user.Username,
      Email: user.Email,
      Birthday: user.Birthday,
    };

    fetch(
      `https://my-movies-flix-05-b51bd5948ca6.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Your data have been successfully updated.");
          return response.json();
        } else {
          alert("Failed to update data.");
        }
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("user", JSON.stringify(data));
        }
      });
  };

  const removeFavouriteMovie = (movieId) => {
    return () => {
      const updatedFavMovies = user.FavouriteMovies.filter((favMovieId) => {
        return favMovieId !== movieId;
      });
      setUser({ ...user, FavouriteMovies: updatedFavMovies });
    };
  };

  const getFavoriteMovies = () => {
    return movies.filter((m) => user.FavouriteMovies.includes(m._id));
  };

  const renderFavouriteMovieOptions = () => {
    return getFavoriteMovies().map((favMovie) => {
      return (
        <div className="my-2" key={favMovie._id}>
          {favMovie.Title}
          <Button
            onClick={removeFavouriteMovie(favMovie._id)}
            className="ms-2"
            variant="outline-danger"
            size="sm"
          >
            Delete
          </Button>
        </div>
      );
    });
  };

  const handleDeregisterUser = (event) => {
    fetch(
      `https://my-movies-flix-05-b51bd5948ca6.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert("Your data have been successfully deleted.");
        onDeregisterSuccess();
      } else {
        alert("Failed to delete data.");
      }
    });
  };

  return (
    <Col md={5} className="mt-5">
      <Form onSubmit={handleSaveChanges}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            minLength={5}
            value={user.Username}
            onChange={(event) =>
              setUser({ ...user, Username: event.target.value })
            }
          />
        </Form.Group>

        {/* <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={user.Password}
          onChange={(event) =>
            setUser({ ...user, Password: event.target.value })
          }
        />
      </Form.Group> */}

        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={user.Email}
            onChange={(event) =>
              setUser({ ...user, Email: event.target.value })
            }
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(event) => {
              if (event.target.value) {
                setUser({ ...user, Birthday: event.target.value });
              }
            }}
          />
        </Form.Group>

        {/* <Form.Group>
        <Form.Label>Favourite Movie:</Form.Label>
        {renderFavouriteMovieOptions()}
      </Form.Group> */}

        <Button className="me-4 my-4" type="submit">
          Save Changes
        </Button>
        <Button onClick={handleDeregisterUser} variant="danger">
          Deregister
        </Button>
      </Form>
    </Col>
  );
};
ProfileView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired,
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
  onDeregisterSuccess: PropTypes.func.isRequired,
};
