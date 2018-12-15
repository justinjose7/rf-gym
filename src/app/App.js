import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import { PersistGate } from 'redux-persist/integration/react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import EquipmentTable from './default_home/equipmentTable';
import DefaultHome from './default_home';
import WorkoutHistory from './workout_history';
import EquipmentStatistics from './equipment_statistics';

import NavBar from './common/navBar';
import AuthRoute from './common/authRoute';
import './App.css';

import reducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk, logger)));

const persistor = persistStore(store);


const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

      <Router>
        <div className="App">
          <NavBar persistor={persistor} />
          <AuthRoute />
          <Switch>
            <Route exact path="/" component={DefaultHome} />
            <Route path="/home" component={EquipmentTable} />
            <Route path="/workout_history" component={WorkoutHistory} />
            <Route path="/equipment_statistics" component={EquipmentStatistics} />
          </Switch>
        </div>
      </Router>
    </PersistGate>
  </Provider>
);


export default App;
