/**This class is the main functionality part of the site at this point in time.
*  It finds a player's DB entry based on user input or if the player doesn't exist, displays a helpful error message to the user.
**/
var React = require('react');
var PureRenderMixin = require('pure-render-mixin').PureRenderMixin;
var SearchInput = require('react-search-input');

var PlayerStore   = require('../stores/PlayerStore');
var PlayerCard    = require('../components/PlayerCard.jsx');
var SearchHelper  = require('../components/search-helper.jsx');

var PlayerName = React.createClass({
	mixins: [PureRenderMixin],
	render: function() {
		var player = this.props.player;
		console.log(player);
		return (
      <li onClick={this.getPlayer}>
      	<span className="search-team">{player.team.abbrev}</span>
      	<span className="search-name">{player.firstName} {player.lastName}</span>
      	<span className="search-pos">{player.position.abbrev}</span>
      </li>
    )
	},
	
	getPlayer: function() {
		this.props.handlePlayerSelect(this.props.id);
		this.props.resetSearch();
	}
});

var PlayerSearch = React.createClass({
	mixins: [PureRenderMixin],

	getInitialState: function() {
		return {
			searchTerm: ''
		}
	},

	render: function() {
		//Put this stuff in function and call?
		var searchTerm = this.state.searchTerm;
		var selectedFunc = this.props.handlePlayerSelect;
		var selectedPlayer = this.props.player;
		var comparedPlayer;
		var potentialPlayers = this.props.playerList;
		var isComparing = this.props.isComparing;
		var resetFunc = this.resetSearch;
		
		var fullPlayerList = [];
		var playerNameList = [];
		var playerCard;
		var comparedPlayer;

		
		
		if (this.refs.search) {
			if (this.refs.search.state.searchTerm == '') { 
				playerNameList = [];
			}else {
				var filters = ['firstName', 'lastName'];
				fullPlayerList = potentialPlayers.filter(this.refs.search.filter(filters));
				fullPlayerList.forEach(function(player, index, array) {
					playerNameList.push(<PlayerName player={player} key={player.id} id={player.id} handlePlayerSelect={selectedFunc} resetSearch={resetFunc} />);
				});
			}
		}

		if(this.state.searchTerm == '') {
			playerNameList = [];
		}

		if (selectedPlayer) {
			playerCard = <PlayerCard player={selectedPlayer} />
			var compareBtn = React.createElement('div', {className: "player-compare-btn", onClick: this.handleCompare}, "COMPARE");
		}

		if (isComparing) {
			comparedPlayer = <PlayerCard player={comparedPlayer}/>
			console.log('comparing');
		}

		return (
			<div className="player-search-container">
				<h3 className="player-search-copy">Search any player name to get our analysts' in-depth opinion on their keeper league worth.</h3>
				<SearchHelper className="player-search-input" type="text" placeholder="e.g Russell Wilson" ref='search' onChange={this.searchUpdated} defaultStyle={false} value={searchTerm} />
				{compareBtn}
				<ul className="player-result-list">
					{playerNameList}
				</ul>
				{playerCard}
				{comparedPlayer}
			</div>
		)
	},	

	resetSearch: function() {
		this.setState({searchTerm: ''});
	},

	searchUpdated: function(term) {
		this.setState({searchTerm: term}); //forces re-render
	},

	handleCompare: function() {
		console.log('compare');
	}

});

module.exports = PlayerSearch;