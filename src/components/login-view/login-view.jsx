import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

export const LoginView = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    const body = {
      Username: username,
      Password: password,
    };

    fetch("https://my-movies-flix-05-b51bd5948ca6.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setError("Username or Password is incorrect.");
        }
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoginSuccess(data.user, data.token);
        }
      });
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          required
          minLength={5}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </Form.Group>
      <div className="text-danger my-2">{error}</div>

      <Button type="submit" variant="primary">
        Submit
      </Button>
    </Form>
  );
};

LoginView.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};
