'use strict';

import AppDispatcher from '../../app/assets/js/dispatcher/AppDispatcher';

export default {
	createUser: (jwt) => {
		console.log(jwt);
		//save JWT in localstorage
		localStorage.setItem('jwt', jwt);
		//dispatch action to all stores
		AppDispatcher.handleServerAction({
			actionType: CREATE_USER,
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
			actionType: LOGIN_USER,
			jwt: jwt
		});
	}
}