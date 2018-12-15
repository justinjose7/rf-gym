import {
  AUTH_SUCCESS, ERROR_MSG, TOGGLE_LOGIN_REGISTER, LOGOUT,
} from './actions';

const initialState = { showLoginComponent: true, data: null, redirectTo: null };


const reducers = (state = initialState, action) => {
  const { showLoginComponent } = state;
  switch (action.type) {
    case TOGGLE_LOGIN_REGISTER:
      return {
        ...state,
        showLoginComponent: !showLoginComponent,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        msg: '',
        redirectTo: '/home',
      };
    case ERROR_MSG:
      return {
        ...state,
        msg: action.msg,
      };
    case LOGOUT:
      return {
        ...state,
        data: null,
        redirectTo: '/',
      };
    default:
      return state;
  }
};

export default reducers;
