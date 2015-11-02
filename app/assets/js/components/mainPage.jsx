var React = require('react');
var PlayerStore = require('../stores/PlayerStore');

var PlayerSearch = require('./playerSearch.jsx');

var MainPage = React.createClass({
	getInitialState: function() {
		return {
			players: PlayerStore.getPlayers(),
			playerSelected: false
		};
	},
	render: function() {
		return (
			<div className="main-page-container">
				<h2 className="marketing-copy">Welcome to Keeper League Keepers, the premier Fantasy Football keeper league site.</h2>
				<PlayerSearch playerList={this.state.players.players} playerSelected={this.state.playerSelected} />
			</div>
		)
	}
});

module.exports = MainPage;