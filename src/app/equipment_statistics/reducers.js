import { GET_EQUIPMENT_DAY_OF_WEEK_TIMES, ERROR_MSG, GET_LIST_EQUIPMENT_NAMES } from './weeklyUsageChart/actions';
import { GET_EQUIPMENT_TIMES } from './popularEquipmentTable/actions';
import { GET_EQUIPMENT_HOURLY_TIMES } from './hourlyUsageChart/actions';

const initialState = {
  weeklyChartData: [], hourlyChartData: [], msg: '', listEquipment: [], equipmentTimes: [],
};


const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_EQUIPMENT_DAY_OF_WEEK_TIMES:
      return {
        ...state,
        weeklyChartData: action.data,
      };
    case GET_EQUIPMENT_HOURLY_TIMES:
      return {
        ...state,
        hourlyChartData: action.data,
      };
    case GET_LIST_EQUIPMENT_NAMES:
      return {
        ...state,
        listEquipment: action.data,
      };
    case GET_EQUIPMENT_TIMES:
      return {
        ...state,
        equipmentTimes: action.data,
      };

    case ERROR_MSG:
      return {
        ...state,
        msg: action.msg,
        chartData: [],
        listEquipment: [],
      };
    default:
      return state;
  }
};

export default reducers;
