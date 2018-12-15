import axios from 'axios';

export const GET_MEMBER_HISTORY = 'GET_MEMBER_HISTORY';

export const ERROR_MSG = 'ERROR_MSG';


export function getMemberHistory({ userId, equipmentName, timePeriod }) {
  return async function (dispatch) {
    axios.post('/gym/member_history', { userId, equipmentName, timePeriod })
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          console.log(res.data);
          console.log(userId + equipmentName + timePeriod);
          return dispatch({
            type: GET_MEMBER_HISTORY,
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
