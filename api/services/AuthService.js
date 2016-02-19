'use strict';
/**
Authentication piece taken from here https://github.com/auth0/react-flux-jwt-authentication-sample/blob/gh-pages/src/services/AuthService.js
*/
import request from 'reqwest';
import when from 'when';

import AuthActions from  '../../app/assets/js/actions/AuthAction';

class AuthService {

	create(username, password) {
		//call server to log user in
		return when(request({
			url: '/user-create',
			method: 'POST',
			crossOrigin: true,
			type: 'json',
			data: {
				username, password
			}
		}))
		.then(function(response) {
			//get JWT back
			let jwt = response.id_token;
			//trigger LoginAction and give jwt
			AuthActions.createUser(jwt);
			return true;
		})
		.catch(function(err) {
			console.log('error in authservice creating user');
			console.log(err);
			return err;
		});
	}

	login(username, password) {
		// console.log('login called with:');
		// console.log(username, password);
		
		return when(request({
			url: '/sessions/create',
			method: 'POST',
			crossOrigin: true,
			type: 'json',
			data: {
				username, password
			}
		}))
		.then(function(response) {
			//get JWT back
			let status = response.status;
			if(status === 201) {
				let jwt = response.id_token;
				//trigger LoginAction and give jwt
				AuthActions.loginUser(jwt);
				return { loggedIn: true };
			}else {
				return { loggedIn: false, message: response.message };
			}
		})
		.catch(function(err) {
			console.log('error in authservice logging in user');
			console.log(err);
			return err;
		});		
	}
}

export default new AuthService();