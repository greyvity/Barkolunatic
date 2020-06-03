import React from "react";

const Login = (props) => {
  const clicker = () => {
    props.change(true);
  };
  return (
    <div className="App main">
      <form action="/content" className="auth">
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
        <input className="submit" type="submit" value="LOGIN" />
      </form>
    </div>
  );
};

export default Login;
