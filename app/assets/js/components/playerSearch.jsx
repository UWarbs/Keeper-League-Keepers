/**This class is the main functionality part of the site at this point in time.
*  It finds a player's DB entry based on user input or if the player doesn't exist, displays a helpful error message to the user.
**/
var React = require('react');
var SearchInput = require('react-search-input');//NPM Module for parsing search strings with given filters

var PlayerStore = require('../stores/PlayerStore');

var PlayerName = React.createClass({
	render: function() {
		return (
      <li onClick={this.getPlayer}>{this.props.firstName} {this.props.lastName}</li>
    )
	},
	
	getPlayer: function() {
		console.log(PlayerStore.getSinglePlayer(this.props.id));
	}
});

var PlayerSearch = React.createClass({
	render: function() {
		var potentialPlayers = this.props.playerList;
		var fullPlayerList = [];
		var playerNameList = [];
		
		if (this.refs.search) {
			if (this.refs.search.state.searchTerm == '') { //pull request for this?
				playerNameList = [];
			}else {
				var filters = ['firstName', 'lastName'];
				fullPlayerList = potentialPlayers.filter(this.refs.search.filter(filters));
				fullPlayerList.forEach(function(player, index, array) {
					//playerNameList.push(<li key={player.id} onClick={this.getPlayer}>{player.firstName}&nbsp;{player.lastName}</li>);
					playerNameList.push(player);
				});
				console.log(playerNameList);
			}
		}

		return (
			<div className="player-search-container">
				<h3 className="player-search-copy">Search any player name to get our analysts' in-depth opinion on their keeper league worth.</h3>
				<SearchInput className="player-search-input" type="text" placeholder="e.g Russell Wilson" ref='search' onChange={this.searchUpdated} defaultStyle={false} />
				<div className="player-search-go" onClick={this.searchUpdated}>GO</div>
				<ul className="player-result-list">
					{playerNameList.map(function(result) {
          	return <li key={result.id} onClick={this.getPlayer}>{result.firstName}&nbsp;{result.lastName}</li>;
        	})}
				</ul>
			</div>
		)
	},	

	searchUpdated: function(term) {
		this.setState({searchTerm: term}); //forces re-render
	},

	getPlayer: function(e) {
		console.log('get playa');
		console.log(e);
	}
});

module.exports = PlayerSearch;