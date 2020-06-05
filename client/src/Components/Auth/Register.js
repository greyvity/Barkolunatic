import React from "react";
import { loadUser, registerUser } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "../../store";

const Register = (props) => {
  const handleChange = (e) => {
    e.preventDefault();
    const credentials = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    store.dispatch(registerUser(credentials));
  };

  const statusCheck = () => {
    if (store.getState().auth.isAuthenticated) {
      // props.history.push("/login");
      window.location.href += "login";
    }
  };

  return (
    <div className="App main">
      {statusCheck()}
      <form className="auth" onSubmit={handleChange}>
        <input type="text" placeholder="username" name="username" />
        <span className="error-message">{store.getState().error.message}</span>
        <input type="text" placeholder="email" name="email" />
        <input type="password" placeholder="password" name="password" />
        <input className="submit" type="submit" value="Register" />
      </form>
    </div>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  error: PropTypes.object,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  item: state.item,
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { loadUser, registerUser })(Register);
