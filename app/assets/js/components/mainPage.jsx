var React = require('react');
var PlayerStore = require('../stores/PlayerStore');

var PlayerSearch = require('./playerSearch.jsx');

var MainPage = React.createClass({
	render: function() {
		// console.log('main page rendered');
		return (
			<div className="main-page-container">
				<PlayerSearch />
			</div>
		)
	}
});

module.exports = MainPage;