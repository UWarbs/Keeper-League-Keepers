import React from 'react';
import { Link }  from 'react-router';

import ListStore 				   from '../stores/ListStore';
import PlayerCard          from './PlayerCard.jsx';
import PlayerServerActions from '../actions/PlayerServerActions';
import PlayerStore 				 from '../stores/PlayerStore';


class TopListItem extends React.Component {
	constructor() {
		super();
	}
	render() {
		let player = this.props.player;
		let rank = this.props.rank;
		let id = this.props.player.id;
		let playerCard = <PlayerCard player={player} rank={rank} isComparing={false} />
		return (
			<li className="top-position-list">
				{playerCard}
			</li>
		);
	}
}

class TopListContainer extends React.Component { 
	constructor() {
  	super();
  	this.onChange = this.onChange.bind(this);
  	this.handleNext = this.handleNext.bind(this);
  	this.handlePrevious = this.handlePrevious.bind(this);
  	this.state = {
			list: PlayerStore.getList(),
			position: null,
			offset: 0
		};
	}

	componentWillMount() { 
		PlayerStore.addChangeListener(this.onChange);
	}

	componentDidMount() {
	  let id = this.props.params.id;
	  let offset = this.state.offset;
	  PlayerServerActions.getList(id, offset);
	}

	//Switch from one positio list to another
	//reset pagination offset to 0
  componentWillReceiveProps(nextProps) {
  	let id = nextProps.params.id
  	if(id != this.props.params.id) {
  		let offset = 0;
			PlayerServerActions.getList(id, offset);		
  	}
	}

	componentWillUnmount() { 
    PlayerStore.removeChangeListener(this.onChange);
  }

  onChange() {
  	let list = PlayerStore.getList();
  	console.log('onchange');
  	//TODO TODO TODO Check current position vs previous position and set offset back to 0
  	this.setState({
  		list: list,
  		position: this.props.params.id
  	})
  }

  handleNext() {
  	let id = this.props.params.id;
  	var offset = this.state.offset += 1;
  	PlayerServerActions.getList(id, offset);	//TODO TODO TODO
  	
  	this.setState({
  		offset: offset
  	})
  }

  handlePrevious() {
  	var offset = this.state.offset;
  	if(offset > 0) {
  		offset -= 1;
  		this.setState({
  			offset: offset
  		})
  	}
  }

	render () {
		let list  = this.state.list;
		let position = this.state.position;
		let offset = this.state.offset;
		let topList = [];

		let next = React.createElement('a', {className: 'next-players', onClick: this.handleNext}, 'Next 10');
		let previous = React.createElement('a', {className: 'previous-players', onClick: this.handlePrevious}, 'Previous 10');
		
		if ( list ) {
			list.forEach(function(player, index, array) {
				topList.push(<TopListItem key={player.id} id={player.id} player={player} rank={index + 1} />);
			});
		}else {
			// topList.push(<h3>Loading...</h3>);  //only if the load time takes long
		} 

		return (
			<div className="top-list-container col-md-12">
				<h3 className="page-header">TOP 10 {position}s</h3>
				<ul className="mid-page-container top-list-ul">
					{topList}
				</ul>
				{next}
			</div> 
		);
	}
}

module.exports = TopListContainer;