import axios from 'axios';

export const GET_EQUIPMENT_TIMES = 'GET_EQUIPMENT_TIMES';

export const ERROR_MSG = 'ERROR_MSG';


export function getEquipmentTimes({ equipmentName, timePeriod }) {
  return async function (dispatch) {
    axios.post('/gym/equipment_times', { equipmentName, timePeriod })
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          // console.log(res.data);
          // console.log(userId + equipmentName + timePeriod);
          return dispatch({
            type: GET_EQUIPMENT_TIMES,
            data: res.data.data,
          });
        }
        return dispatch({
          type: ERROR_MSG,
          msg: 'Server Error',
        });
      });
  };
}
