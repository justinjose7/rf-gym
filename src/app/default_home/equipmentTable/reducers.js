const initialState = { data: [] };


const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIAL_DATA':
      return {
        ...state,
        data: action.data,
      };
    case 'NEW_DATA':
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default reducers;
