var React = require('react');


var PlayerSearch = require('./playerSearch.jsx');

var MainPage = React.createClass({
	render: function() {
		return (
			<div className="main-page-container">
				<h2 className="marketing-copy">Welcome to Keeper League Keepers, the premier Fantasy Football keeper league site.</h2>
				<PlayerSearch playerList={this.props.playerList}/>
			</div>
		)
	}
});

module.exports = MainPage;