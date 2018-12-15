import { combineReducers } from 'redux';
import workoutHistoryReducer from './app/workout_history/workout_table/reducers';
import equipmentStatusReducer from './app/default_home/equipmentTable/reducers';
import loginRegisterReducer from './app/default_home/loginRegister/reducers';
import userInfoReducer from './app/common/authRoute/reducers';


const rootReducer = combineReducers({
  equipment_status: equipmentStatusReducer,
  workout_history: workoutHistoryReducer,
  login_details: loginRegisterReducer,
  user_info: userInfoReducer,
});

export default rootReducer;
