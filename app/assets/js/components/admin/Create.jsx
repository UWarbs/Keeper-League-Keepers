'use strict';
import Auth from '../../../../../api/services/AuthService';
import React from 'react';


class Create extends React.Component {
	constructor() {
		super();
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.state = {
			user: '',
			password: ''
		}
	}

	create(e) {
		e.preventDefault();
		Auth.create(this.state.user, this.state.password)
			.catch(function(err) {
				console.log('Error creating', err);
			});
	}

	handleNameChange(e) {
		this.setState({user: e.target.value})
	}

	handlePasswordChange(e) {
		this.setState({password: e.target.value})
	}

	render() {
		return (
			<div>
				<form role="form">
				<div className="form-group">
					<input type="text" value={this.state.username} onChange={this.handleNameChange}  placeholder="Username" />
					<input type="password" value={this.state.password} onChange={this.handlePasswordChange}  placeholder="Password" />
				</div>
				<button type="submit" onClick={this.create.bind(this)}>Submit</button>
				</form>
			</div>
		)
	}
}

module.exports = Create;
