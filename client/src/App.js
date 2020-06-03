import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <div className="App">
          <Route exact path="/content" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Register} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
