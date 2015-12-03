// React components
var React         = require('react');

var PlayerStore   		  = require('../stores/PlayerStore');
var PlayerServerActions = require('../actions/PlayerServerActions');
var MainPage            = require('./mainPage.jsx');
require('../../stylesheets/main.css.scss');
var tempStyle = {color: 'white', margin:'0px'};

var Header = React.createClass({
	render: function() {
		return (
			<div className="header">
				<nav className="header-container">
					<div className="logo">KLK</div>
					<h1 className="site-title">Keeper League Keepers</h1>
					<div className="header-link-container">
					</div>
				</nav>
				<div className="hero-container">
					<h2 className="marketing-copy">Welcome to Keeper League Keepers, the premier Fantasy Football keeper league site.</h2>
					<p style={tempStyle}>Put options here.... search, top WRs, top RBs, top Rookies, top sleepers, etc.</p>
				</div>
			</div>
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

