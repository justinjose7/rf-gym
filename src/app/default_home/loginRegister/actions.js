import axios from 'axios';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';

export const ERROR_MSG = 'ERROR_MSG';

export const TOGGLE_LOGIN_REGISTER = 'TOGGLE_LOGIN_REGISTER';

export const LOGOUT = 'LOGOUT';


function authSuccess(obj) {
  // remove pwd from data available in redux store
  const { pwd, ...data } = obj;
  return { type: AUTH_SUCCESS, payload: data };
}

function errorMsg(msg) {
  return { type: ERROR_MSG, msg };
}


export function login({ userId, pwd }) {
  return async function (dispatch) {
    axios.post('/user/login', { userId, pwd })
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          return dispatch(authSuccess(res.data.data));
        }
        return dispatch(errorMsg(res.data.msg));
      });
  };
}

export function register({
  email, name, userId, pwd,
}) {
  return async function (dispatch) {
    axios.post('/user/register', {
      email, name, userId, pwd,
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.code === 0) {
          return dispatch(authSuccess({ userId, pwd }));
        }
        return dispatch(errorMsg(res.data.msg));
      });
  };
}

export function toggleLoginPage() {
  return async function (dispatch) {
    return dispatch({ type: TOGGLE_LOGIN_REGISTER });
  };
}

export function logout() {
  return async function (dispatch) {
    return dispatch({ type: LOGOUT });
  };
}
