import React from 'react';

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
      	<span className='search-team'>{player.team_abbrev}</span>
      	<span className='search-name'>{player.first_name}&nbsp;{player.last_name}&nbsp;{player.rating}</span>
      	<span className='search-pos'>{player.position}</span>
      </li>
    );
	}
	
	getPlayer() {
		this.props.handlePlayerSelect(this.props.id);
		this.props.resetSearch();
	}

}

module.exports = PlayerName;