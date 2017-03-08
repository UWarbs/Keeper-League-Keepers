import React from 'react';
import { Link }  from 'react-router';

import ListStore 				   from '../stores/ListStore';
import Pagination          from './shared/Pagination.jsx';
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
		let positionRank = this.props.positionRank;
		let id = this.props.player.id;
		let playerCard = <PlayerCard player={player} rank={rank} positionRank={positionRank} isComparing={false} />
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

	//Switch from one position list to another
	//reset pagination offset to 0
  componentWillReceiveProps(nextProps) {
  	let id = nextProps.params.id
  	if(id != this.props.params.id) {
  		let offset = 0;
  		this.setState({offset: offset})
			PlayerServerActions.getList(id, offset);		
  	}
	}

	componentWillUnmount() { 
    PlayerStore.removeChangeListener(this.onChange);
  }

  onChange() {
  	let list = PlayerStore.getList();
  	this.setState({
  		list: list,
  		position: this.props.params.id
  	})
  }

  //Todo: Instead of setting state in these functions maybe make offset be a param in the list returned
  //from PlayerStore.getList() so that it just sets state once in onChange instead of twice.
  //also...Combine into one function with bool isNext check
  handleNext() {
  	let id = this.props.params.id;
  	var offset = this.state.offset += 1;
  	PlayerServerActions.getList(id, offset);
  	this.setState({
  		offset: offset
  	})
  }

  handlePrevious() {
  	let id = this.props.params.id;
  	var offset = this.state.offset;

  	if(offset > 0) {
  		offset -= 1;
  		PlayerServerActions.getList(id, offset);	
  		this.setState({
  			offset: offset
  		})
  	}
  }

	render () {
		let list  = this.state.list;
		let position = this.state.position;
		let offset = this.state.offset;
		let handleNext = this.handleNext;
		let handlePrevious = this.handlePrevious;
		let topList = [];
		var listOver = false;


		//Error finding list.
		if(!list) {
			return (
				<div className="top-list-container col-md-12">
					<h3 className="page-header">Error finding {position}s</h3>
				</div>
			);
		}else {
			if (list.length != 0) {
				listOver = false;
				list.forEach(function(player, index, array) {
					var positionRank = offset == 0 ? (index + 1) : ((10 * offset) + index) + 1;
					topList.push(<TopListItem key={player.id} id={player.id} player={player} rank={player.rating} positionRank={positionRank} />);
				});
			}else {
				listOver = true;
				topList.push(<p key="0">No More Players.</p>);
			}	

			return (
				<div className="top-list-container col-md-12">
					<h3 className="page-header">{position}s</h3>
					
					<ul className="mid-page-container top-list-ul">
						<Pagination handleNext={handleNext} handlePrevious={handlePrevious} offset={offset} listOver={listOver}/>
						{topList}
						<Pagination handleNext={handleNext} handlePrevious={handlePrevious} offset={offset} listOver={listOver}/>
					</ul>
					
				</div> 
			);	
		}


	}
}

module.exports = TopListContainer;