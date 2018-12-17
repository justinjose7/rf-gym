export function loadInitialData(socket) {
  return async function (dispatch) {
    socket.on('initialList', (res) => {
      dispatch({
        type: 'INITIAL_DATA',
        data: res,
      });
    });
    socket.on('error', (err) => {
      console.log(err);
    });
  };
}

export function listenForUpdates(socket) {
  return async function (dispatch) {
    socket.on('newList', (res) => {
      dispatch({
        type: 'NEW_DATA',
        data: res,
      });
    });
  };
}
