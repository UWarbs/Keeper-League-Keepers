'use strict';

import React from 'react';
import LoginStore from '../../stores/LoginStore';

export default (ComposedComponent) => {
	return class AuthenticatedComponent extends React.Component {
		
		// static willTransitionTo(transition) {
		// 	if (!LoginStore.isLoggedIn()) {
		// 		console.log('supposed to transition');
		// 		transition.redirect('/login', {}, {'nextPath' : transition.path});
		// 	}
		// }

		constructor() {
			super();
			this.state = this._getLoginState();
		}

		_getLoginState() {
			return {
				userLoggedIn: LoginStore.isLoggedIn(),
				user: LoginStore.user,
				jwt: LoginStore.jwt
			};
		}

		_onChange() {
			this.setState(this._getLoginState);
		}

		componentDidMount() {
			this.changeListener = this._onChange.bind(this);
			LoginStore.addChangeListener(this.changeListener);
		}

		ComponentWIllUnMount() {
			LoginStore.removeChangeListener(this.changeListener);
		}

		render() {
			console.log('inside authenticatd component render:')
			return(
				<ComposedComponent
					{...this.props}
					user = {this.state.user}
					jwt = {this.state.jwt}
					userLoggedIn = {this.state.userLoggedIn} />
			);
		}
	}
};