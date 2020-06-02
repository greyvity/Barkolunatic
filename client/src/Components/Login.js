import React from "react";

const Login = (props) => {
  const clicker = () => {
    props.change(true);
  };
  return (
    <form action="/">
      <input type="text" placeholder="email" />
      <input type="password" placeholder="password" />
      <input className="submit" type="submit" value="LOGIN" />
    </form>
  );
};

export default Login;
