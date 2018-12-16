import { GET_EQUIPMENT_TIMES, ERROR_MSG } from './actions';

const initialState = { data: [], user: '', msg: '' };


const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_EQUIPMENT_TIMES:
      return {
        ...state,
        data: action.data,
      };

    case ERROR_MSG:
      return {
        ...state,
        msg: action.msg,
        data: [],
      };
    default:
      return state;
  }
};

export default reducers;
