import { combineReducers } from 'redux';
import defaultHomeReducer from './app/default_home/equipmentTable/reducers'

const rootReducer = combineReducers({
    default_home: defaultHomeReducer
});

export default rootReducer;
