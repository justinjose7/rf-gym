export const initialItems = (res) => ({
	type: "INITIAL_DATA",
	data: res
})

export const newItems = (res) => ({
  type: "NEW_DATA",
	data: res
})

export const loadInitialData = (socket) => {
	return (dispatch) => {
	  socket.on('initialList',(res)=>{
	  console.dir(res)
	  dispatch(initialItems(res))
	  })
	  socket.on('error', (err) => {
	  	console.log('error');
	  });
	}
}

export const listenForUpdates = (socket) => {
	return (dispatch) => {
	  socket.on('newMember', (res) => {
			dispatch(newItems(res))
		})
	}
}
