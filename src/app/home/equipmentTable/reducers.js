import { List } from 'immutable';

const initialState = { data: List([]) };


const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIAL_DATA':
      return {
        ...state,
        data: List(action.data),
      };
    case 'NEW_DATA':
      return {
        ...state,
        data: List(action.data),
      };
    default:
      return state;
  }
};

export default reducers;
