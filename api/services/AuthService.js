'use strict';
/**
Authentication piece taken from here https://github.com/auth0/react-flux-jwt-authentication-sample/blob/gh-pages/src/services/AuthService.js
*/
import request from 'reqwest';
import when from 'when';

import LoginActions from  '../actions/LoginAction';

class AuthService {

	login(username, password) {
		//call server to log user in
		console.log('login called with:');
		console.log(username + ' ' + password);
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
			let jwt = response.id_token;
			//trigger LoginAction and give jwt
			LoginActions.loginUser(jwt);
			return true;
		})
		.catch(function(err) {
			console.log('error');
			console.log(err);
			return err;
		});
	}
}

export default new AuthService();