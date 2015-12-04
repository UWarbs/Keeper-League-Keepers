// React components
var React    = require('react');
var ReactDom = require('react-dom');
var Router   = require('react-router').Router
var Route    = require('react-router').Route
var Link     = require('react-router').Link

var PlayerStore   		  = require('../stores/PlayerStore');
var PlayerServerActions = require('../actions/PlayerServerActions');
var MainPage            = require('./mainPage.jsx');
require('../../stylesheets/main.css.scss');

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
					<section className="section-tabs">
						<div className="section-tab"><Link to={`/top-qb`}>Top QBs</Link></div>&nbsp;
						<div className="section-tab">Search</div>
					</section>
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

ReactDom.render(<App />, document.getElementById('app-container') );

