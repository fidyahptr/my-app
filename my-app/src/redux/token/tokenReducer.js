const initialState = '';

function tokenReducer(state = initialState, action) {
	switch (action.type) {
		case 'setToken':
			return (state = action.payload);
		default:
			return state;
	}
}

export default tokenReducer;
