import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser, login } from "../../actions/authActions";
import store from "../../store";
import { Redirect } from "react-router-dom";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    store.dispatch(login(credentials));
  };

  //checks if the user is logged in
  const statusCheck = () => {
    if (store.getState().auth.isLogged) {
      // props.history.push("/login");
      // window.location.href += "/content";
      return <Redirect to="/content" />;
    }
  };

  return (
    <div className="App main">
      {statusCheck()}
      <form action="/content" className="auth" onSubmit={handleSubmit}>
        <span className="error-message">{store.getState().error.message}</span>
        <input type="text" placeholder="email" name="email" />
        <input type="password" placeholder="password" name="password" />
        <input className="submit" type="submit" value="LOGIN" />
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  error: PropTypes.object,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  item: state.item,
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { loadUser, login })(Login);
