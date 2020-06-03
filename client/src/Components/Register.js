import React from "react";

const Register = () => {
  return (
    <div className="App main">
      <form action="/login" className="auth">
        <input type="text" placeholder="username" />
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
        <input className="submit" type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
