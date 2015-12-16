/**This class is the main functionality part of the site at this point in time.
*  It finds a player's DB entry based on user input or if the player doesn't exist, displays a helpful error message to the user.
**/
"use strict";
import React from 'react';
import PureRenderMixin from 'pure-render-mixin';
//mixins: [PureRenderMixin], want this back in
import PlayerStore   			 from '../stores/PlayerStore';
import PlayerCard    			 from '../components/PlayerCard.jsx';
import PlayerName    			 from './shared/playerName.jsx';
import PlayerServerActions from '../actions/PlayerServerActions';
import SearchHelper  			 from '../components/search-helper.jsx';


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
		);
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

class PlayerSearch extends React.Component {
	constructor() {
  	super();
  	this.searchUpdated      = this.searchUpdated.bind(this);
  	this.handlePlayerSelect = this.handlePlayerSelect.bind(this);
  	this.resetSearch 			  = this.resetSearch.bind(this);
  	this.handleCompare 			= this.handleCompare.bind(this);
  	this.handleStopCompare  = this.handleStopCompare.bind(this);
  	this.handleHideResults  = this.handleHideResults.bind(this);
  	this.onChange 					= this.onChange.bind(this);
  	this.state = {
			playerList: [], 
			playerSelected: false,
			player: null,
			isComparing: false,
			comparePlayerSelected: false,
			comparePlayer: null,
			searchTerm: '',
			hideResults: false
		};
	}

	componentWillMount() {
    PlayerStore.addChangeListener(this.onChange);
  }

	componentDidMount() {
		PlayerServerActions.getAllPlayers();
	}

	componentWillUnmount() {
    PlayerStore.removeChangeListener(this.onChange);
  }

  onChange() {
  	console.log('component change');
  	if ( this.state.playerList.length == 0 ) {
	  	this.setState({
	  		playerList: PlayerStore.getPlayers()
	  	});  		
  	}else {
	  	//conditional for if player is first player or compared player
			if( this.state.isComparing ) {
				this.setState({
					comparePlayer: PlayerStore.getSinglePlayer(),
					comparePlayerSelected: true
				});
			}else {
				this.setState({
					player: PlayerStore.getSinglePlayer(),
					playerSelected: true
				});		
			}
  	}
  }

	handlePlayerSelect(id) {
		PlayerServerActions.getSinglePlayer(id);
	}

	render() {
		// console.log('search render'); /?TODO: Make this render less
		//Put this stuff in function and call? change to const? let?
		var searchTerm = this.state.searchTerm;
		var selectedPlayer = this.state.player;
		var potentialPlayers = this.state.playerList;
		var isComparing = this.state.isComparing;
		var hideResults = this.state.hideResults;
		var comparePlayerSelected = this.state.comparePlayerSelected;

		var selectedFunc = this.handlePlayerSelect; //TODO: change these to const? let?
		var handleHideResults  = this.handleHideResults;
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
				var filters = ['first_name', 'last_name'];
				fullPlayerList = potentialPlayers.filter(this.refs.search.filter(filters));
				fullPlayerList.forEach(function(player, index, array) { //TODO: arrow func 
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