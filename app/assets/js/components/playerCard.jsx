/**
* This component displays a single player's detail sheet 
**/
import React 		 from 'react';
import { Link }  from 'react-router';

class PlayerCard extends React.Component {
	constructor() {
		super();
		this.parseHtml = this.parseHtml.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		//This or beneath one will handle updating className if compare is selected.
  }
  componentWillUpdate() {

  }

  componentDidMount() {
    // if (this.props.closeOnEsc) {
    //   document.addEventListener('keydown', this.handleKeydown);
    // }

    // if (this.props.closeOnOutsideClick) {
    //   document.addEventListener('mousedown', this.handleOutsideMouseClick);
    //   document.addEventListener('touchstart', this.handleOutsideMouseClick);
    // }
  }

  parseHtml() {
  	return {__html: this.props.player.writeup};
  }

	render() {
		let player 			 = this.props.player;
		let rank 				 = this.props.rank != null ? '(' + this.props.rank + ')' : '';
		let positionRank = this.props.positionRank != null ? '#' + this.props.positionRank + ': ' : '';
		let id           = player.id;
		let parentClass  = 'player-card-container ' + this.props.className; //ternary here for no name
		let writeup      = <p className="player-card-writeup" dangerouslySetInnerHTML={this.parseHtml()} />;

		//Rank by year is a placeholder in case I come back with some ML.
		return (
      <div className={parentClass}>
      	<span className="player-card-details">
      		<p className="player-card-pos">{player.position}</p>
      		<p className="player-card-team">{player.team}</p>
      	</span>
      	<Link to={ `/admin/edit-player/${id}` }>EDIT PLAYER</Link>
      	<div className="name-container">
      		<span className="position-ranking">{positionRank}</span>
      		<span className="overall-rank">{rank}</span>
	      	<h3 className="player-card-name">
	      		{player.first_name}&nbsp;{player.last_name}
	      	</h3>
	      </div>
	      <p className="player-writeup-title">Writeup</p>
      	{writeup}
	      <div className="rank-by-year-container">
	      	<p><b>Projected Position Rank:</b></p>
	      	<p><b>'16:</b> 11-18</p>
	      	<p><b>'17:</b> 16-27</p>
	      	<p><b>'18:</b> 25-40</p>
	      </div>
      </div>
    )
	}
}

module.exports = PlayerCard;
