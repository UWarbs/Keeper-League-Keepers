/**This class is the main functionality part of the site at this point in time.
*  It finds a player's DB entry based on user input or if the player doesn't exist, displays a helpful error message to the user.
**/
var React = require('react');
var SearchInput = require('react-search-input');

var PlayerStore = require('../stores/PlayerStore');
var PlayerCard  = require('../components/PlayerCard.jsx');

var PlayerName = React.createClass({

	render: function() {
	console.log('player props');
	console.log(this.props);
		return (
      <li onClick={this.getPlayer}>{this.props.firstName} {this.props.lastName}</li>
    )
	},
	
	getPlayer: function() {
		this.props.handlePlayerSelect(this.props.id);
		this.props.resetSearch();
	}
});

var PlayerSearch = React.createClass({
	getInitialState: function() {
		console.log('REFS');
		console.log(this.refs);
		return {
			searchTerm: ''
		}
	},



	render: function() {
		var selectedFunc = this.props.handlePlayerSelect;
		var resetFunc = this.resetSearch;
		var selectedPlayer = this.props.player;
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
					playerNameList.push(<PlayerName id={player.id} firstName={player.firstName} lastName={player.lastName} handlePlayerSelect={selectedFunc} resetSearch={resetFunc} />);
				});
			}
		}

		if(this.state.searchTerm == '') {
			playerNameList = [];
		}

		if (selectedPlayer) {
			var playerCard = <PlayerCard player={selectedPlayer} />
		}

		return (
			<div className="player-search-container">
				<h3 className="player-search-copy">Search any player name to get our analysts' in-depth opinion on their keeper league worth.</h3>
				<SearchInput className="player-search-input" type="text" placeholder="e.g Russell Wilson" ref='search' onChange={this.searchUpdated} defaultStyle={false} value={this.state.searchTerm} />
				<ul className="player-result-list">
					{playerNameList}
				</ul>
				{playerCard}
			</div>
		)
	},	

	resetSearch: function() {
		this.setState({searchTerm: ''});
	},

	searchUpdated: function(term) {
		this.setState({searchTerm: term}); //forces re-render
	}

});

module.exports = PlayerSearch;