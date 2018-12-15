import React, { Component } from 'react';
import '../index.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logo from '../../../../assets/smaller-logo.svg';
// import { Redirect } from 'react-router-dom';
import { register, toggleLoginPage } from '../actions';


class Register extends Component {
  render() {
    const {
      register, toggleLoginPage, loginDetails,
    } = this.props;

    const { msg } = loginDetails;

    return (
      <div className="container">
        {/* {redirectTo ? <Redirect to={redirectTo} /> : null} */}
        <img src={logo} alt={logo} />
        <p>Create an account</p>
        <div>
          <input
            type="text"
            placeholder="Email address"
            ref={input => this.email = input}
          />
          <input
            type="text"
            placeholder="Full name"
            ref={input => this.name = input}
          />
          <input
            type="text"
            placeholder="Username"
            ref={input => this.username = input}
          />
          <input
            type="password"
            placeholder="Password"
            ref={input => this.password = input}
          />
          <button
            onClick={() => register({
              email: this.email.value, name: this.name.value, userId: this.username.value, pwd: this.password.value,
            })}
            type="button"
          >
Sign up

          </button>

          <p>Already have have an account?</p>
          <button
            onClick={() => toggleLoginPage()}
            type="button"
          >
Log in

          </button>
          {msg ? <p className="error-msg">{msg}</p> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginDetails: state.login_details,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  register,
  toggleLoginPage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
