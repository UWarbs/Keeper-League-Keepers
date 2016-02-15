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
	},

	//TODO: Maybe setting actionTypes that never are used in the store's switch case would be a good time to clear the page and display a sucess message, because all the error checks have passed
	createBlogPost: (content) => {
		Api.post('/api/new-blog', data)
		.then(function(content) {
			AppDispatcher.handleServerAction({
				actionType: Constants.NEW_BLOG,
				content: content
			});
		});
	}
}