/**This class is the main functionality part of the site at this point in time.
*  It finds a player's DB entry based on user input or if the player doesn't exist, displays a helpful error message to the user.
**/
var React = require('react');
var PureRenderMixin = require('pure-render-mixin').PureRenderMixin;
var SearchInput = require('react-search-input');

var PlayerStore   = require('../stores/PlayerStore');
var PlayerCard    = require('../components/PlayerCard.jsx');
var SearchHelper  = require('../components/search-helper.jsx');


var SearchResults = React.createClass({
	mixins: [PureRenderMixin],
	
	propTypes: {
		playerList: React.PropTypes.array,
		selectedFunc: React.PropTypes.func,
		resetFunc: React.PropTypes.func
	},

	render: function() {
		var playerList = this.props.playerList;
		var selectedFunc = this.props.selectedFunc;
		var resetFunc = this.props.resetFunc;
		var players = [];
		playerList.forEach(function(player, index, array) {
			players.push(<PlayerName player={player} key={player.id} id={player.id} handlePlayerSelect={selectedFunc} resetSearch={resetFunc} />);
		});

		return (
			<ul className="player-result-list">
				{players}
			</ul>
		)
	},
	componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideMouseClick);
    document.addEventListener('touchstart', this.handleOutsideMouseClick);
  },

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideMouseClick);
    document.removeEventListener('touchstart', this.handleOutsideMouseClick);
    // this.close();
  },

  handleOutsideMouseClick(e) {
    // this.props.playerList = []; 
    e.stopPropagation();
    console.log(e);
  }

});

var PlayerName = React.createClass({
	mixins: [PureRenderMixin],
	render: function() {
		var player = this.props.player;
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
			playerList: PlayerStore.getPlayers(),
			playerSelected: false,
			player: null,
			isComparing: false,
			comparePlayerSelected: false,
			comparePlayer: null,
			searchTerm: ''
		};
	},

	handlePlayerSelect: function(id) {
		var player = PlayerStore.getSinglePlayer(id);
		//conditional for if player is first player or compared player
		if(this.state.isComparing) {
			this.setState({
				comparePlayer: player,
				comparePlayerSelected: true
			});
		}else {
			this.setState({
				playerSelected: true,
				player: player
			});		
		}
	},

	render: function() {
		//Put this stuff in function and call?
		var searchTerm = this.state.searchTerm;
		var selectedFunc = this.handlePlayerSelect;
		var selectedPlayer = this.state.player;
		var comparedPlayer;
		var potentialPlayers = this.state.playerList.players;
		var isComparing = this.state.isComparing;
		var comparePlayerSelected = this.state.comparePlayerSelected;
		var resetFunc = this.resetSearch;
		
		var fullPlayerList = [];
		var playerNameList = [];
		var playerCard;
		var compareBtn;
		var comparedPlayer = this.state.comparePlayer || '';

		
		
		if (this.refs.search) {
			if (this.refs.search.state.searchTerm == '') { 
				playerNameList = [];
			}else {
				var filters = ['firstName', 'lastName'];
				fullPlayerList = potentialPlayers.filter(this.refs.search.filter(filters));
				fullPlayerList.forEach(function(player, index, array) {
					playerNameList.push(player);
				});
			}
		}

		if(this.state.searchTerm == '') {
			playerNameList = [];
		}

		if (selectedPlayer) {
			if(comparePlayerSelected) {
				compareBtn = React.createElement('div', {className: "player-compare-btn red", onClick: this.handleStopCompare}, "Stop Comparing");
				playerCard = <PlayerCard player={selectedPlayer} isComparing={true} className={"first-card"} />
			}else {
				if(!isComparing) {
					compareBtn = React.createElement('div', {className: "player-compare-btn", onClick: this.handleCompare}, "Compare");
					playerCard = <PlayerCard player={selectedPlayer} isComparing={false} className={null}/>					
				}else {
					compareBtn = React.createElement('div', {className: "player-compare-btn help"}, "Find another player");
					playerCard = <PlayerCard player={selectedPlayer} isComparing={true} className={"first-card"} />
				}

			}
			
		}

		if (isComparing && comparePlayerSelected) {
			comparedPlayer = <PlayerCard player={comparedPlayer} className={"comp-card"}/>
		}

		return (
			<div className="player-search-container">
				<h3 className="player-search-copy">Search any player name to get our analysts' in-depth opinion on their keeper league worth.</h3>
				<SearchHelper className="player-search-input" type="text" placeholder="e.g Russell Wilson" ref='search' onChange={this.searchUpdated} defaultStyle={false} value={searchTerm} />
				<SearchResults className="player-result-list" playerList={playerNameList} selectedFunc={selectedFunc} resetFunc={resetFunc}/>
				{compareBtn}
				{playerCard}
				{comparedPlayer}
			</div>
		)
	},	

	resetSearch: function() {
		this.setState({searchTerm: ''});
	},

	searchUpdated: function(term) {
		this.setState({searchTerm: term});
	},

	handleCompare: function(e) {
		if(!this.state.isComparing) {
			this.setState({isComparing: true});
		}
	},

	handleStopCompare: function() {
		this.setState({
			isComparing: false,
			comparePlayerSelected: false,
			comparePlayer: null
		})
	}
});

module.exports = PlayerSearch;