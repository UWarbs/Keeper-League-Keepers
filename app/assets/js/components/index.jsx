// React components
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import PlayerStore         from '../stores/PlayerStore';
import PlayerServerActions from '../actions/PlayerServerActions';
//COMPONENTS
import AddPlayer           from './admin/AddPlayer';
import PlayerSearch        from './playerSearch';
import TopList             from './topList';
import '../../stylesheets/main.css.scss';

class Header extends React.Component { 
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
						<div className="section-tab"><Link to={ '/top/qb' }>Top QBs</Link></div>&nbsp;
						<div className="section-tab"><Link to={ '/top/rb' }>Top RBs</Link></div>&nbsp;
						<div className="section-tab"><Link to={ '/top/wr' }>Top WRs</Link></div>&nbsp;
						<div className="section-tab"><Link to={ '/admin/add-player' }>Add Player</Link></div>&nbsp;
						<div className="section-tab"><Link to={ '/' }>Search</Link></div>
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

