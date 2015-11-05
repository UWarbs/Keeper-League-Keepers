var React = require('react');
var PlayerStore = require('../stores/PlayerStore');

var PlayerSearch = require('./playerSearch.jsx');

var MainPage = React.createClass({
	render: function() {
		// console.log('main page rendered');
		return (
			<div className="main-page-container">
				<h2 className="marketing-copy">Welcome to Keeper League Keepers, the premier Fantasy Football keeper league site.</h2>
				<PlayerSearch />
			</div>
		)
	}
});

module.exports = MainPage;