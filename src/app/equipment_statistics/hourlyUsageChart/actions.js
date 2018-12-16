import axios from 'axios';

export const GET_EQUIPMENT_DAY_OF_WEEK_TIMES = 'GET_EQUIPMENT_DAY_OF_WEEK_TIMES';

export const ERROR_MSG = 'ERROR_MSG';

export const GET_LIST_EQUIPMENT_NAMES = 'GET_LIST_EQUIPMENT_NAMES';

const chartData = {
  labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  datasets: [
    {
      label: 'Minutes used',
      backgroundColor: 'rgba(255,0,0,0.4)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [0, 59, 80, 81, 56, 55, 40],
    },
  ],
};


export function getEquipmentDayOfWeekTimes({ equipmentName, timePeriod }) {
  return async function (dispatch) {
    axios.post('/gym/equipment_day_of_week_times', { equipmentName, timePeriod })
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          const chartConfig = Object.assign({}, chartData);
          const data = [0, 0, 0, 0, 0, 0, 0];
          const tempData = res.data.data;
          tempData.forEach((element) => {
            data[element._id.dayWeek - 1] = element.totalMinutes;
          });
          chartConfig.datasets[0].data = data;
          dispatch({
            type: GET_EQUIPMENT_DAY_OF_WEEK_TIMES,
            msg: 'SUCCESS',
            data: chartConfig,
          });
        } else {
          dispatch({
            type: ERROR_MSG,
            msg: 'Server Error',
          });
        }
      });
  };
}


export function getListEquipmentNames() {
  return async function (dispatch) {
    axios.get('/gym/list_equipment_names')
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch({
            type: GET_LIST_EQUIPMENT_NAMES,
            msg: 'SUCCESS',
            data: res.data.data,
          });
        } else {
          dispatch({
            type: ERROR_MSG,
            msg: 'SERVER ERROR',
          });
        }
      });
  };
}
