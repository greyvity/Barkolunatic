import React from "react";

const Register = () => {
  return (
    <form action="/">
      <input type="text" placeholder="username" />
      <input type="text" placeholder="email" />
      <input type="password" placeholder="password" />
      <input className="submit" type="submit" value="Register" />
    </form>
  );
};

export default Register;
