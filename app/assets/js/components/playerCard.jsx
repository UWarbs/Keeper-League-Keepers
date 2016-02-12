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
		let player 			= this.props.player;
		let id          = player.id;
		let parentClass = 'player-card-container ' + this.props.className; //ternary here for no name
		let writeup     = player.writeup;
		//set className variables bases on comparing or not
		//var playerCard = player card using className variables and other variables based on comparing or not.
		return (
      <div className={parentClass}>
      	<span className="player-card-details">
      		<p className="player-card-pos">{player.position_abbrev}</p>
      		<p className="player-card-team">{player.team}</p>
      	</span>
      	<Link to={ `/admin/edit-player/${id}` }>EDIT PLAYER {id}</Link>
      	<h3 className="player-card-name">{player.first_name}&nbsp;{player.last_name}</h3>
      	<p className="player-card-writeup" dangerouslySetInnerHTML={this.parseHtml()} />
      </div>
    )
	}
}

module.exports = PlayerCard;
