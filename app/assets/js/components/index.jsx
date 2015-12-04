// React components
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import { createHistory } from 'history';

import PlayerStore         from '../stores/PlayerStore';
import PlayerServerActions from '../actions/PlayerServerActions';
import MainPage            from './mainPage.jsx';
import PlayerSearch        from './playerSearch.jsx';
require('../../stylesheets/main.css.scss');

class Header extends React.Component { 
	render () {
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
						<div className="section-tab"><Link to={'/top-qb'}>Top QBs</Link></div>&nbsp;
						<div className="section-tab">Search</div>
					</section>
				</div>
			</div>
		);
	}
}

class App extends React.Component {
	render() {
		return (
				<div>
					<Header />	
					<MainPage />
				</div>
		)
	}
};

render( <App />, document.getElementById('app-container') );

