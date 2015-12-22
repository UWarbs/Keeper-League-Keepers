// React components
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import PlayerStore         from '../stores/PlayerStore';
import PlayerServerActions from '../actions/PlayerServerActions';
//COMPONENTS
import AddPlayer           from './admin/AddPlayer.jsx';
import PlayerSearch        from './playerSearch.jsx';
import TopList             from './topList.jsx';
import '../../stylesheets/main.css.scss';

class Header extends React.Component { 
	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		console.log(e);
		var tab = document.querySelector('.section-tab.selected');
		if(tab) {
			tab.className = 'section-tab';
		}
		e.target.className = 'section-tab selected';
	}

	render () {
		return (
			<div className="header">
				<nav className="header-container">
					<div className="logo"><Link to={ '/' }>KLK</Link></div>
					<h1 className="site-title">Keeper League Keepers</h1>
					<div className="header-link-container">
					</div>
				</nav>
				<div className="hero-container">
					<h2 className="marketing-copy">Welcome to Keeper League Keepers, the premier Fantasy Football keeper league site.</h2>
					<section className="section-tabs">
						<Link className="section-link" to={ '/' }><div className="section-tab selected" onClick={this.handleClick}>Search</div></Link>&nbsp;
						<Link className="section-link" to={ '/top/qb' }><div className="section-tab" onClick={this.handleClick}>Top QBs</div></Link>&nbsp;
						<Link className="section-link" to={ '/top/rb' }><div className="section-tab" onClick={this.handleClick}>Top RBs</div></Link>&nbsp;
						<Link className="section-link" to={ '/top/wr' }><div className="section-tab" onClick={this.handleClick}>Top WRs</div></Link>&nbsp;
						<Link className="section-link" to={ '/admin/add-player' }><div className="section-tab" onClick={this.handleClick}>Add Player</div></Link>
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
					<div className="main-page-container">
						{this.props.children}
					</div>
				</div>
		)
	}
}

render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={ App }>
      <IndexRoute component={ PlayerSearch } />
      <Route path="top/:id" component={ TopList } />
      <Route path="admin/add-player" component={ AddPlayer } />
      <Route path="admin/edit-player/:id" component={ AddPlayer } />
    </Route>
  </Router>
), document.getElementById('app-container') )

