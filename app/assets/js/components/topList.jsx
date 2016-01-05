import React from 'react';
import ListStore 				   from '../stores/ListStore';
import PlayerServerActions from '../actions/PlayerServerActions';
import PlayerStore 				 from '../stores/PlayerStore';

// TODO: FIX SLOW START
class TopListItem extends React.Component {
	constructor() {
		super();
	}
	render() {
		let player = this.props.player;
		let rank = this.props.rank;
		return (
			<li className="top-position-list">
				<p><strong>#{rank}: {player.first_name} {player.last_name}, {player.team} ({player.rating})</strong></p>
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
			list: null,
			position: null
		};
	}

	componentWillMount() { //TODO: arrow func?
		PlayerStore.addChangeListener(this.onChange);
		let id = this.props.params.id;
	  PlayerServerActions.getList(id);
  }

	componentDidMount() {
	  // let id = this.props.params.id;
	  // PlayerServerActions.getList(id);
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
		console.log('render');
		console.log(list);
		// console.log(list);
		// console.log(position);
		let topList = [];
		//TODO: Take in number to show as a prop. For now default to 10 paginate groups of 10?
		if ( list ) {
			list.forEach(function(player, index, array) { //TODO: make playerListCard component that look cool as lists, instead of li.
				topList.push(<TopListItem key={player.id} id={player.id} player={player} rank={index + 1} />);
			});
		}

		return (
			<div className="top-list-container">
				<h2 className="top-list-header">TOP 10 {position}s</h2>
				<ul className="top-list-ul">
					{topList}
				</ul>
			</div> 
		);
	}
}

module.exports = TopListContainer;