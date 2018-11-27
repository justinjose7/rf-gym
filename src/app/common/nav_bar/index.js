import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './index.css'
import logo from '../../../assets/smaller-logo.svg';



class NavBar extends Component{
  constructor(props) {
    super(props)
  }

  render(){
    console.log(this.props)
    return this.props.user?(
      <div id="nav-bar">
        <ul className="top-nav">
          <Link to="/home"><li><img src={logo} alt={logo}/></li></Link>
          <Link to="/nearby"><li> Home </li></Link>
          <Link to="/matches"><li> Gym History </li></Link>
          <Link to="/myprofile"><li> Equipment Statistics </li></Link>
        </ul>
      </div>
    ):(
      <div id="nav-bar">
        <Link to="/home"><img src={logo} alt={logo}/></Link>
        <ul>
          <li><a href="#1"> Train </a></li>
          <li><a href="#2"> Pain </a></li>
          <li><a href="#3"> Gain </a></li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {...state};
};

export default connect(mapStateToProps, {})(NavBar);
