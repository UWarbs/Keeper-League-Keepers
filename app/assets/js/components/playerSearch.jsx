/**This class is the main functionality part of the site at this point in time.
*  It finds a player's DB entry based on user input or if the player doesn't exist, displays a helpful error message to the user.
**/
var React = require('react');

var PlayerSearch = React.createClass({
	getInitialState: function() {
		return {
			text: ''
		}
	},
	render: function() {
		return (
			<div className="player-search-container">
				<h3 className="player-search-copy">Search any player name to get our analysts' in-depth opinion on their keeper league worth.</h3>
				<input 
					className="player-search-input" 
					type="text" placeholder="e.g Russell Wilson" 
					value={this.state.text} 
					onChange = {this._onChange}
					onKeyDown = {this._catchEnter} />
				<div className="player-search-go" onClick={this._playerSearch}>GO</div>
			</div>
		)
	},

	_onChange: function(e) {
		//Here do elastic search type stuff
		this.setState({
			text: e.target.value
		});
		console.log(this.state.text);
	},

	_playerSearch: function() {
		console.log(this.props);
		console.log(this.state.text);
	},
	
	_catchEnter: function(e) {
		if (e.which === 13) {
			this._playerSearch();
		}
	}
});

module.exports = PlayerSearch;