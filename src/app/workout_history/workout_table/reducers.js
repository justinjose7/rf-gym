import { List } from 'immutable';
import { GET_MEMBER_HISTORY, ERROR_MSG } from './actions';

const initialState = { data: List([]), user: '', msg: '' };


const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEMBER_HISTORY:
      return {
        ...state,
        data: action.data,
      };

    case ERROR_MSG:
      return {
        ...state,
        msg: action.msg,
        data: List([]),
      };
    default:
      return state;
  }
};

export default reducers;
