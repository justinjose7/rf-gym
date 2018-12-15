import React, { Component } from 'react';
import '../index.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Redirect } from 'react-router-dom';
import logo from '../../../../assets/smaller-logo.svg';
import { login, toggleLoginPage } from '../actions';

class Login extends Component {
  render() {
    const { login, toggleLoginPage, loginDetails } = this.props;

    const { msg } = loginDetails;

    return (
      <div className="container">
        {/* {redirectTo ? <Redirect to={redirectTo} /> : null} */}
        <img src={logo} alt={logo} />
        <p>Sign in to your account</p>
        <div>
          <input
            type="text"
            placeholder="Email or username"
            ref={input => this.username = input}
          />
          <input
            type="password"
            placeholder="Password"
            ref={input => this.password = input}
          />
          <button
            className="loginBtn button"
            onClick={() => login({ userId: this.username.value, pwd: this.password.value })}
            type="button"
          >
Log in

          </button>

          <p>Don't have an account?</p>
          <button
            onClick={() => toggleLoginPage()}
            type="button"
          >
Sign up

          </button>
          {msg ? <p>{msg}</p> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginDetails: state.login_details,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  toggleLoginPage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
