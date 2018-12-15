import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import './index.css';
import browserCookies from 'browser-cookies';
import { bindActionCreators } from 'redux';
import logo from '../../../assets/smaller-logo.svg';
import { logout } from '../../default_home/loginRegister/actions';


const NavBar = ({
  justLoggedIn, loggedIn, history, persistor, logout,
}) => (
  (loggedIn) ? (
    <div id="nav-bar">
      <Link to="/home"><li><img src={logo} alt={logo} /></li></Link>
      <ul className="top-nav">
        <Link to="/home"><li>Home</li></Link>
        <Link to="/workout_history"><li>Workout History</li></Link>
        <Link to="/equipment_statistics"><li>Equipment Statistics</li></Link>
      </ul>
      <button onClick={() => {
        logout();
        for (const browserCookie in browserCookies.all()) {
          browserCookies.erase(browserCookie);
        }
        history.push('/');
      }}
      >
Sign out

      </button>
    </div>
  ) : (
    <div id="nav-bar">
      <Link to="/home"><img src={logo} alt={logo} /></Link>
      <ul>
        <li><a href="#1"> Train </a></li>
        <li><a href="#2"> Pain </a></li>
        <li><a href="#3"> Gain </a></li>
      </ul>
    </div>
  )
);

const mapStateToProps = state => ({
  loggedIn: state.login_details.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
