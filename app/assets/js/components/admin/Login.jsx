'use strict';
import Auth from '../../../../../api/services/AuthService';
import React from 'react';
import { browserHistory } from 'react-router';


class Login extends React.Component {
	constructor() {
		super();
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.login = this.login.bind(this);
		this.state = {
			user: '',
			password: '',
			errorMessage: null
		}
	}

	login(e) {
		let that = this; 
		e.preventDefault();
		Auth.login(this.state.user, this.state.password)
		.then(function(data) {
			console.log(data);
			if(data.loggedIn == true) {
				browserHistory.push('/');
			}else {
				that.setState({ errorMessage: data.message })
			}
		})
		.catch(function(err) {
			console.log('Server error', err);
		});
		
	}

	handleNameChange(e) {
		this.setState({user: e.target.value})
	}

	handlePasswordChange(e) {
		this.setState({password: e.target.value})
	}

	render() {
		let errorMessage = this.state.errorMessage || null;
		let errorEl;
		if(errorMessage) {
			errorEl = <span className="form-error">{errorMessage}</span>
		}else {
			errorEl = null;
		}
		return (
			<div>
				<h2 className="page-header">Log in</h2>
				<form role="form">
				<div className="form-group">
					{errorEl}
					<input type="text" value={this.state.username} onChange={this.handleNameChange}  placeholder="Username" />
					<input type="password" value={this.state.password} onChange={this.handlePasswordChange}  placeholder="Password" />
				</div>
				<button type="submit" onClick={this.login.bind(this)}>Submit</button>
				</form>
			</div>
		)
	}
}

module.exports = Login;
