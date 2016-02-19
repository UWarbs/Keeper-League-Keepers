'use strict';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/Constants';
import { EventEmitter } from 'events';
import jwt_decode from 'jwt-decode';

const CHANGE_EVENT = 'change';

class LoginStore extends EventEmitter {
	
	constructor() {
		super();
		this.dispatchToken = AppDispatcher.register(this._registerToActions.bind(this));
		this._user = null;
		this._jwt = null;
	}

	addChangeListener (cb) { //TODO: Make store superclass
		this.on(CHANGE_EVENT, cb);
	}

	removeChangeListener (cb) {
		this.removeListener(CHANGE_EVENT, cb);
	}
  
  isLoggedIn() {
    return !!this._user;
  }

	_registerToActions(actionObj) {
		console.log(actionObj);
		let action = actionObj.action;
		switch(action.actionType) {
			case AppConstants.LOGIN_USER:
				//get JWT from token and store it
				this._jwt = action.jwt;
				//decode to get user info
				this._user = jwt_decode(this._jwt);
				this.emit(CHANGE_EVENT);
				break;
			case AppConstants.LOGOUT_USER:
				this._jwt = null;
				this._user = null;
				this.emit(CHANGE_EVENT);
				break;
			default:
				break;
		};
	}

	//getters for the properties it got from the action.
  get user() {
    return this._user;
  }

  get jwt() {
    return this._jwt;
  }


}

export default new LoginStore();