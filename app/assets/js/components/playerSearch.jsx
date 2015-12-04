/**This class is the main functionality part of the site at this point in time.
*  It finds a player's DB entry based on user input or if the player doesn't exist, displays a helpful error message to the user.
**/
import React from 'react';
import PureRenderMixin from 'pure-render-mixin';
//mixins: [PureRenderMixin], want this back in
import PlayerStore from '../stores/PlayerStore';
import PlayerCard    from '../components/PlayerCard.jsx';
import SearchHelper  from '../components/search-helper.jsx';


class SearchResults extends React.Component {

	render() {
		var playerList = this.props.playerList;
		var selectedFunc = this.props.selectedFunc;
		var resetFunc = this.props.resetFunc;
		var hideChild = this.props.hideChild;
		var players = [];
		playerList.forEach(function(player, index, array) {
			players.push(<PlayerName player={player} key={player.id} id={player.id} handlePlayerSelect={selectedFunc} resetSearch={resetFunc} hideNow={hideChild} />);
		});

		return (
			<ul className='player-result-list'>
				{players}
			</ul>
		)
	}
	
	componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideMouseClick);
    document.addEventListener('touchstart', this.handleOutsideMouseClick);
    document.addEventListener('keyup', this.handleKeyNav);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideMouseClick);
    document.removeEventListener('touchstart', this.handleOutsideMouseClick);
    // this.close();
  }

  handleOutsideMouseClick(e) {
    // this.props.playerList = []; 
    e.stopPropagation();
    console.log('outsidemouseclick');
    // if(e.target.className != 'search-li' && e.target.className != 'player-result-list') {
    // 	this.props.hideResults(true);
    // }
  }

  handleKeyNav(e) {
  	if(e.keyCode == 38) { //up

  	}
  	if(e.keyCode == 40) { //down
  		console.log('down');
  	}
  }

}

//Search Result Proptypes
SearchResults.propTypes = {
	playerList: React.PropTypes.array,
	selectedFunc: React.PropTypes.func,
	resetFunc: React.PropTypes.func,
	hideResults: React.PropTypes.func,
	hideChild: React.PropTypes.bool
};




class PlayerName extends React.Component {
	constructor() {
  	super();
  	this.getPlayer = this.getPlayer.bind(this);
  }	
	render() {
		var player = this.props.player;
		if(this.props.hideNow) {
			return false;
		}
		return (
      <li className='search-li' onClick={this.getPlayer}>
      	<span className='search-team'>{player.team.abbrev}</span>
      	<span className='search-name'>{player.firstName} {player.lastName}</span>
      	<span className='search-pos'>{player.position.abbrev}</span>
      </li>
    )
	}
	
	getPlayer() {
		this.props.handlePlayerSelect(this.props.id);
		this.props.resetSearch();
	}

}




class PlayerSearch extends React.Component {
	constructor() {
  	super();
  	this.searchUpdated = this.searchUpdated.bind(this);
  	this.handlePlayerSelect = this.handlePlayerSelect.bind(this);
  	this.resetSearch = this.resetSearch.bind(this);
  	this.handleCompare = this.handleCompare.bind(this);
  	this.handleStopCompare = this.handleStopCompare.bind(this);
  	this.handleHideResults = this.handleHideResults.bind(this);
  	this.state = {
			playerList: PlayerStore.getPlayers(), 
			playerSelected: false,
			player: null,
			isComparing: false,
			comparePlayerSelected: false,
			comparePlayer: null,
			searchTerm: '',
			hideResults: false
		};

	}
	// getInitialState() {
	// 	return {
	// 		playerList: PlayerStore.getPlayers(), 
	// 		playerSelected: false,
	// 		player: null,
	// 		isComparing: false,
	// 		comparePlayerSelected: false,
	// 		comparePlayer: null,
	// 		searchTerm: '',
	// 		hideResults: false
	// 	};
	// }

	handlePlayerSelect(id) {
		var player = PlayerStore.getSinglePlayer(id);
		//conditional for if player is first player or compared player
		if( this.state.isComparing ) {
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
	}

	render() {
		//Put this stuff in function and call?
		var searchTerm = this.state.searchTerm;
		var selectedFunc = this.handlePlayerSelect;
		var handleHideResults  = this.handleHideResults;
		var selectedPlayer = this.state.player;
		var comparedPlayer;
		var potentialPlayers = this.state.playerList.players;
		var isComparing = this.state.isComparing;
		var hideResults = this.state.hideResults;
		var comparePlayerSelected = this.state.comparePlayerSelected;
		var resetFunc = this.resetSearch;

		
		var fullPlayerList = [];
		var playerNameList = [];
		var playerCard;
		var compareBtn;
		var comparedPlayer = this.state.comparePlayer || '';

		
		
		if ( this.refs.search ) {
			if ( this.refs.search.state.searchTerm == '' ) { 
				playerNameList = [];
			}else {
				var filters = ['firstName', 'lastName'];
				fullPlayerList = potentialPlayers.filter(this.refs.search.filter(filters));
				fullPlayerList.forEach(function(player, index, array) {
					playerNameList.push(player);
				});
			}
		}

		if( this.state.searchTerm == '' ) {
			playerNameList = [];
		}

		if ( selectedPlayer ) {
			if(comparePlayerSelected) {
				compareBtn = React.createElement('div', {className: 'player-compare-btn red', onClick: this.handleStopCompare}, 'Stop Comparing');
				playerCard = <PlayerCard player={selectedPlayer} isComparing={true} className={'first-card'} />
			}else {
				if( !isComparing ) {
					compareBtn = React.createElement('div', {className: 'player-compare-btn', onClick: this.handleCompare}, 'Compare');
					playerCard = <PlayerCard player={selectedPlayer} isComparing={false} className={null}/>					
				}else {
					compareBtn = React.createElement('div', {className: 'player-compare-btn help'}, 'Find another player');
					playerCard = <PlayerCard player={selectedPlayer} isComparing={true} className={'first-card'} />
				}

			}
			
		}

		if ( isComparing && comparePlayerSelected ) {
			comparedPlayer = <PlayerCard player={comparedPlayer} className={'comp-card'}/>
		}

		return (
			<div className='player-search-container'>
				<h3 className='player-search-copy'>Search any player name to get our analysts' in-depth opinion on their keeper league worth.</h3>
				<SearchHelper className='player-search-input' type='text' placeholder='e.g Russell Wilson' ref='search' onChange={this.searchUpdated} defaultStyle={false} value={searchTerm} />
				<SearchResults 
					className='player-result-list' 
					playerList={playerNameList} 
					selectedFunc={selectedFunc} 
					resetFunc={resetFunc}
					hideResults={handleHideResults}
					hideChild={hideResults}
				/>
				{compareBtn}
				{playerCard}
				{comparedPlayer}
			</div>
		);
	}	

	resetSearch() {
		this.setState({searchTerm: ''});
	}

	searchUpdated(term) {
		this.setState({searchTerm: term, hideResults: false});
	}

	handleCompare(e) {
		if(!this.state.isComparing) {
			this.setState({isComparing: true});
		}
	}

	handleStopCompare() {
		this.setState({
			isComparing: false,
			comparePlayerSelected: false,
			comparePlayer: null
		})
	}

	handleHideResults(hide) {
		if(hide) {
			this.setState({
				hideResults: true
			});			
		}
	}
}

module.exports = PlayerSearch;