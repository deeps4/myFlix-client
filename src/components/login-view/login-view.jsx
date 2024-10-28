import { useState } from "react";

export const LoginView = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://my-movies-flix-05-b51bd5948ca6.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoginSuccess(data.user, data.token);
      });
  };

  return (
    <form onSubmit={submitHandler}>
      <lable>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          required
        />
      </lable>

      <lable>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </lable>
      <button type="submit">Submit</button>
    </form>
  );
};
