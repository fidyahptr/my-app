import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './redux/token/tokenReducer';

export default configureStore({
	reducer: {
		setToken: tokenReducer,
	},
});
