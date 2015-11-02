// React components
var React         = require('react');

var PlayerStore   		  = require('../stores/PlayerStore');
var PlayerServerActions = require('../actions/PlayerServerActions');
var MainPage            = require('./mainPage.jsx');
require('../../stylesheets/main.css.scss');


var Header = React.createClass({
	render: function() {
		return (
				<nav className="header-container">
					<div className="logo">KLK</div>
					<h1 className="site-title">Keeper League Keepers</h1>
					<div className="header-link-container">
						<a href="#" className="header-link">Link1</a>&nbsp;
						<a href="#" className="header-link">Link2</a>&nbsp;
						<a href="#" className="header-link">Link3</a>
					</div>
				</nav>
		)
	}
});

var App = React.createClass({
	render: function() {
		return (
				<div>
					<Header />
					<MainPage />
				</div>
		)
	}
});

React.render(<App />, document.getElementById('app-container') );

