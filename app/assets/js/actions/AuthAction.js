'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/Constants';

export default {
	createUser: (jwt) => {
		console.log(jwt);
		//save JWT in localstorage
		localStorage.setItem('jwt', jwt);
		//dispatch action to all stores
		AppDispatcher.handleServerAction({
			actionType: Constants.CREATE_USER,
			jwt: jwt
		});
	},

	loginUser: (jwt) => {
		console.log('login user called with this jwt');
		console.log(jwt);
		//save JWT in localstorage
		localStorage.setItem('jwt', jwt);
		//dispatch action to all stores
		AppDispatcher.handleServerAction({
			actionType: Constants.LOGIN_USER,
			jwt: jwt
		});
	},

	logoutUser: () => {
		localStorage.removeItem('jwt');
		AppDispatcher.handleServerAction({
			actionType: Constants.LOGOUT_USER
		})
	}
}