import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";
import Container from "react-bootstrap/Container";
import { LoginView } from "./components/login-view/login-view";
import { SignupView } from "./components/signup-view/signup-view";

const App = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);
