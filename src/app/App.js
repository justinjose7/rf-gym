import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import EquipmentTable from './default_home/equipmentTable';
import NavBar from './common/nav_bar'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar/>
          <Switch>
            <Route path ='/home' component={EquipmentTable}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
