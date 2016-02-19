import React from 'react';
import { Link }  from 'react-router';

import ListStore 				   from '../stores/ListStore';
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
		return (
			<li className="top-position-list">
				<p className="player-card-info"><strong>#{rank}: {player.first_name} {player.last_name}, {player.team} ({player.rating})</strong></p>
				<Link className="player-edit-link" to={ `/admin/edit-player/${id}` }>EDIT PLAYER</Link>
				<p>{player.writeup}</p>
			</li>
		);
	}
}

class TopListContainer extends React.Component { 
	constructor() {
  	super();
  	this.onChange = this.onChange.bind(this);
  	this.state = {
			list: PlayerStore.getList(),
			position: null
		};
	}

	componentWillMount() { 
		PlayerStore.addChangeListener(this.onChange);
	}

	componentDidMount() {
	  let id = this.props.params.id;
	  PlayerServerActions.getList(id);
	}

  componentWillReceiveProps(nextProps) {
  	let id = nextProps.params.id
  	if(id != this.props.params.id) {
			PlayerServerActions.getList(id);		
  	}
	}

	componentWillUnmount() { //TODO: arrow func?
    PlayerStore.removeChangeListener(this.onChange);
  }

  onChange() {
  	let list = PlayerStore.getList();
  	this.setState({
  		list: list,
  		position: this.props.params.id
  	})
  }

	render () {
		let list  = this.state.list;
		let position = this.state.position;
		let topList = [];
		//TODO: paginate groups of 10?
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
				<ul className="top-list-ul">
					{topList}
				</ul>
			</div> 
		);
	}
}

module.exports = TopListContainer;