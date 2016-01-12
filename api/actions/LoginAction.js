'use strict';

import AppDispatcher from '../../app/assets/js/dispatcher/AppDispatcher';

export default {
	loginUser: (jwt) => {
		console.log('login user called with this jwt:');
		console.log(jwt);
		//redirect homepage once logged in
		RouterContainer.get().transitionTo('/');
		//save JWT in localstorage
		localStorage.setItem('jwt', jwt);
		//dispatch action to all stores
		AppDispatcher.dispatch({
			actionType: LOGIN_USER,
			jwt: jwt
		});
	}
}