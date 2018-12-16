import axios from 'axios';

export const GET_EQUIPMENT_HOURLY_TIMES = 'GET_EQUIPMENT_HOURLY_TIMES';

export const ERROR_MSG = 'ERROR_MSG';

export const GET_LIST_EQUIPMENT_NAMES = 'GET_LIST_EQUIPMENT_NAMES';

const chartData = {
  labels: ['12:00am', '1:00am', '2:00am', '3:00am', '4:00am', '5:00am', '6:00am', '7:00am',
    '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm',
    '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm'],
  datasets: [
    {
      label: 'Minutes used',
      backgroundColor: 'rgba(255,0,0,0.4)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
};


export function getEquipmentHourlyTimes({ equipmentName, timePeriod }) {
  return async function (dispatch) {
    axios.post('/gym/equipment_hourly_times', { equipmentName, timePeriod })
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          const chartConfig = Object.assign({}, chartData);
          const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          const tempData = res.data.data;
          tempData.forEach((element) => {
            data[element._id.hour] = element.totalMinutes;
          });
          chartConfig.datasets[0].data = data;
          dispatch({
            type: GET_EQUIPMENT_HOURLY_TIMES,
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
