import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import { Provider } from "react-redux";
import store from "./store";
import { v4 as uuid } from "uuid";
// import Content from "./Components/Content/Content";

function App() {
  const [posts, setPosts] = useState([
    { id: uuid(), title: "Sherlock", description: "Just Amazing" },
    {
      id: uuid(),
      title: "Avengers",
      description: "<3000",
    },
    { id: uuid(), title: "B99", description: "Noiceeeeeee" },
    {
      id: uuid(),
      title: "What's Life",
      description: "I dont know",
    },
  ]);

  const deletePost = (id) => {
    const newPosts = posts.filter((post) => post.id !== id);
    console.log(newPosts);
    console.log(posts);
    setPosts(newPosts);
  };
  // return (
  // );
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
