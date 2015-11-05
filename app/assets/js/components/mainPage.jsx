var React = require('react');
var PlayerStore = require('../stores/PlayerStore');

var PlayerSearch = require('./playerSearch.jsx');

var MainPage = React.createClass({
	
	getInitialState: function() {
		return {
			players: PlayerStore.getPlayers(),
			playerSelected: false,
			player: null,
			isComparing: false,
			comparePlayer: null
		};
	},

	handlePlayerSelect: function(id) {
		var player = PlayerStore.getSinglePlayer(id);
		this.setState({
			playerSelected: true,
			player: player
		});
	},

	render: function() {
		// console.log('main page rendered');
		return (
			<div className="main-page-container">
				<h2 className="marketing-copy">Welcome to Keeper League Keepers, the premier Fantasy Football keeper league site.</h2>
				<PlayerSearch 
					playerList={this.state.players.players} 
					playerSelected={this.state.playerSelected} 
					handlePlayerSelect={this.handlePlayerSelect} 
					player={this.state.player} 
					isComparing={this.state.isComparing}
					comparePlayer={this.state.comparePlayer}
				/>
			</div>
		)
	}
});

module.exports = MainPage;