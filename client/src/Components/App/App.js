import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "../NavBar";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Home from "../Content/Home";
import { Provider } from "react-redux";
import store from "../../store";
import loadUser from "../../actions/authActions";
function App() {
  return (
    <Provider store={store}>
      {console.log("welcome")}
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
