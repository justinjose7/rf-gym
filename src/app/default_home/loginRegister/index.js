import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './login';
import Register from './register';

const LoginRegister = ({ showLoginComponent, redirectTo }) => (

  <Fragment>
    {redirectTo ? <Redirect to={redirectTo} /> : null}

    { showLoginComponent ? (
      <Login />
    )
      : (
        <Register />
      )
      }
  </Fragment>
);

const mapStateToProps = state => ({
  showLoginComponent: state.login_details.showLoginComponent,
  redirectTo: state.login_details.redirectTo,
});

export default connect(mapStateToProps)(LoginRegister);
