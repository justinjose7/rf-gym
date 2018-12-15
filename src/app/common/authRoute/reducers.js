import { LOAD_DATA } from './actions';

const initialState = { user: null };

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DATA:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
