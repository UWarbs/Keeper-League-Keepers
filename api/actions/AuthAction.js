'use strict';

import AppDispatcher from '../../app/assets/js/dispatcher/AppDispatcher';
import Constants from '../../app/assets/js/constants/Constants';

export default {
	createUser: (jwt) => {
		console.log(jwt);
		//save JWT in localstorage
		localStorage.setItem('jwt', jwt);
		//dispatch action to all stores
		AppDispatcher.handleServerAction({
			actionType: Constanst.CREATE_USER,
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
	}
}