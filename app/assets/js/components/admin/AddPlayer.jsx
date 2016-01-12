"use strict";
import React from 'react';

import AuthenticatedComponent from '../admin/AuthenticatedComponent.jsx';
import PlayerServerActions 	 	from '../../actions/PlayerServerActions';
import PlayerStore 				 		from '../../stores/PlayerStore';

export default AuthenticatedComponent(class AddPlayer extends React.Component {
	constructor() {
		super();
		this.onChange = this.onChange.bind(this);
		this.handleFirstChange = this.handleFirstChange.bind(this);
		this.handleLastChange = this.handleLastChange.bind(this);
		this.handlePositionChange = this.handlePositionChange.bind(this);
		this.handleTeamChange = this.handleTeamChange.bind(this);
		this.handleRatingChange = this.handleRatingChange.bind(this);
		this.handleAgeChange = this.handleAgeChange.bind(this);
		this.handleExpChange = this.handleExpChange.bind(this);
		this.handleWriteupChange = this.handleWriteupChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			firstName: null,
			lastName: null,
			position: null,
			team: null,
			rating: null,
			age: null,
			experience: null,
			writeup: null,
			writeupLength: 0
		}
	}

	componentWillMount() { 
		PlayerStore.addChangeListener(this.onChange);
  }

	componentDidMount() {
	  let id = this.props.params.id || null;
    if(id) {
    	PlayerServerActions.getSinglePlayer(id); 	
    }
	}

	componentWillUnmount() {
    PlayerStore.removeChangeListener(this.onChange);
  }

  onChange() {
  	let player = PlayerStore.getSinglePlayer();
  	this.setState({
  		firstName: player.first_name,
  		lastName: player.last_name,
  		position: player.position,
  		team: player.team,
  		rating: player.rating,
  		age: player.age,
  		experience: player.experience,
  		writeup: player.writeup
  	});
  }

  handleFirstChange(e) {
    this.setState({firstName: e.target.value});
  }
  handleLastChange(e) {
    this.setState({lastName: e.target.value});
  }
  handlePositionChange(e) {
    this.setState({position: e.target.value});
  }
  handleTeamChange(e) {
    this.setState({team: e.target.value});
  }
  handleRatingChange(e) {
    this.setState({rating: e.target.value});
  }
  handleAgeChange(e) {
    this.setState({age: e.target.value});
  }
  handleExpChange(e) {
    this.setState({experience: e.target.value});
  }
  handleWriteupChange(e) {
    this.setState({writeup: e.target.value, writeupLength: e.target.value.length});
    console.log(e.target.value.length);
  }
  handleSubmit(e) {
  	e.preventDefault();
  	let id = this.props.params.id;
  	if (id) { //editing
  		PlayerServerActions.editPlayer(id, this.state);
  	}else { //newplayer
  		PlayerServerActions.addNewPlayer(this.state);
  	}
  	this.setState({
  		firstName: null,
  		lastName: null,
  		position: null,
  		team: null,
  		rating: null,
  		age: null,
  		experience: null,
  		writeup: null,
  		writeupLength: 0
  	});
  }

	render() {
		let length = this.state.writeupLength;
		let team = this.state.team || 'SELECT A TEAM';
		let position = this.state.position || 'SELECT A POSITION';
		//Best practices WILL be used. REASON. WILL. PREVAIL.
		return(
			<div className="form-container">
				<form className="add-player-form" name="create-player" onSubmit={this.handleSubmit}>
					<div className="col-md-12">
						<div className="col-md-6">
							<label className="label" htmlFor="firstName">First Name</label>
							<input type="text" htmlFor="create-player" name="firstName" value={this.state.firstName} onChange={this.handleFirstChange} required/>
						</div>
						<div className="col-md-6">
							<label className="label" htmlFor="lastName">Last Name</label>
							<input type="text" htmlFor="create-player" name="lastName" value={this.state.lastName} onChange={this.handleLastChange} required />
						</div>
					</div>
					<div className="col-md-12">
						<div className="col-md-6">
							<label className="label" htmlFor="position">Position</label>
							<select className="form-control" htmlFor="create-player" value={this.state.position} onChange={this.handlePositionChange} required>
								<option value={position}>{position}</option>
								<option value="Quarterback">Quarterback</option>
								<option value="Kicker">Kicker</option>
								<option value="Running Back">Running Back</option>
								<option value="Tight End">Tight End</option>
		    				<option value="Wide Receiver">Wide Receiver</option>
							</select>
						</div>
						<div className="col-md-6">
							<label className="label" htmlFor="team">Team</label>
							<select className="form-control" htmlFor="create-player" value={this.state.team} onChange={this.handleTeamChange} required> 
								<option value={team}>{team}</option>
								<option value="Seattle Seahawks">SEA</option>
								<option value="San Francisco 49ers">SF</option>
								<option value="Arizona Cardinals">ARI</option>
								<option value="St. Louis Rams">STL</option>
								<option value="Green Bay Packers">GB</option>
								<option value="Chicago Bears">CHI</option>
								<option value="Detroit Lions">DET</option>
								<option value="Minnesota Vikings">MIN</option>
								<option value="Tampa Bay Buccaneers">TB</option>
								<option value="New Orleans Saints">NO</option>
								<option value="Atlanta Falcons">ATL</option>
								<option value="Carolina Panthers">CAR</option>
								<option value="New York Giants">NYG</option>
								<option value="Washington Redskins">WAS</option>
								<option value="Philadelphia Eagles">PHI</option>
								<option value="Dallas Cowboys">DAL</option>
								<option value="Oakland Raiders">OAK</option>
								<option value="Denver Broncos">DEN</option>
								<option value="San Diego Chargers">SD</option>
								<option value="Kansas City Chiefs">KC</option>
								<option value="Houston Texans">HOU</option>
								<option value="Indianapolis Colts">IND</option>
								<option value="Jacksonville Jaguars">JAX</option>
								<option value="Tennessee Titans">TEN</option>
								<option value="Cincinnati Bengals">CIN</option>
								<option value="Cleveland Browns">CLE</option>
								<option value="Baltimore Ravens">BAL</option>
								<option value="Pittsburgh Steelers">PIT</option>
								<option value="New England Patriots">NE</option>
								<option value="New York Jets">NYJ</option>
								<option value="Miami Dolphins">MIA</option>
								<option value="Buffalo Bills">BUF</option>
							</select>
						</div>
					</div>
					<div className="col-md-12">
					  <div className="col-md-6">
							<label className="label" htmlFor="rating">Rating</label>
							<input type="text" htmlFor="create-player" placeholder="Rating(1-100)" name="rating" value={this.state.rating} onChange={this.handleRatingChange} required />
						</div>
						<div className="col-md-6">
							<label className="label" htmlFor="age">Age</label>
							<input type="text" htmlFor="create-player" placeholder="Age" name="age" value={this.state.age} onChange={this.handleAgeChange} required />
						</div>
					</div>
					<div className="col-md-12">
							<label className="label" htmlFor="writeup">Writeup</label>
							<span>{length}/500 characters</span>
							<textarea className="form-control" type="textarea" rows="6" htmlFor="create-player" placeholder="Player writeup" name="writeup" value={this.state.writeup} onChange={this.handleWriteupChange} required></textarea>
					</div>
					<input className="btn btn-primary add-player" type="submit" htmlFor="create-player" value="Save Player" />
				</form>
			</div>
		);
	}
});
