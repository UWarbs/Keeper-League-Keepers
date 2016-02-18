'use strict';
// React components
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import PlayerStore         from '../stores/PlayerStore';
import LoginStore          from '../stores/LoginStore';
import PlayerServerActions from '../actions/PlayerServerActions';
import AuthActions         from '../actions/AuthAction';
//COMPONENTS
import AddPlayer           from './admin/AddPlayer.jsx';
import AddBlog             from './admin/AddBlog.jsx';
import Blog           		 from './Blog.jsx';
import Login 							 from './admin/Login.jsx';
import Create 						 from './admin/Create.jsx';
import PlayerSearch        from './playerSearch.jsx';
import TopList             from './topList.jsx';
import '../../stylesheets/main.css.scss';

class Header extends React.Component { 
	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
		this.logoutUser  = this.logoutUser.bind(this);
	}

	handleClick(e) {
		console.log(e);
		var tab = document.querySelector('.section-tab.selected');
		if(tab) {
			tab.className = 'section-tab';
		}
		e.target.className = 'section-tab selected';
	}

	logoutUser() {
		AuthActions.logoutUser();
	}
	
	render () {
		let isLoggedIn = LoginStore.isLoggedIn() || this.props.user;
		let route = this.props.path;
		console.log('index render with user: ', isLoggedIn);	
		let addPlayer;
		let loginLink;
		let logoutLink;
		let addBlogPost;
		
		if(isLoggedIn) { //TODO: Add changelistener for when someone logs in.
			addPlayer = <Link className="section-link" to={ '/admin/add-player' }><div onClick={this.handleClick} className={"section-tab " + (route == '/admin/add-player' ? 'selected' : '')}>Add Player</div></Link>;
			addBlogPost = <Link className="section-link" to={ '/admin/add-post' }><div onClick={this.handleClick} className={"section-tab " + (route == '/admin/add-post' ? 'selected' : '')}>New Post</div></Link>;
			logoutLink = <a onClick={this.logoutUser}>Log Out</a>;
			loginLink = null;
		}else {
			addPlayer = null;
			addBlogPost = null;
			logoutLink = null;
			loginLink = <Link className="section-link" to={ '/login' }><div onClick={this.handleClick} className={"section-tab " + (route == '/login' ? 'selected' : '')}>Login</div></Link>;
		}

		return (
			<div className="header">
				<nav className="header-container">
					<div className="logo"><Link to={ '/' }>KLK</Link></div>
					<h1 className="site-title">Keeper League Keepers</h1>
					<div className="header-link-container">
						{logoutLink}
					</div>
				</nav>
				<div className="hero-container">
					<h2 className="marketing-copy">Welcome to Keeper League Keepers, the premier Fantasy Football keeper league site.</h2>
					<section className="section-tabs">
						<Link className="section-link" to={ '/' }><div className={"section-tab " + (route == '/' ? 'selected' : '')} onClick={this.handleClick}>Search</div></Link>&nbsp;
						<Link className="section-link" to={ '/top/qb' }><div className={"section-tab " + (route == '/top/qb' ? 'selected' : '')} onClick={this.handleClick}>Top QBs</div></Link>&nbsp;
						<Link className="section-link" to={ '/top/rb' }><div className={"section-tab " + (route == '/top/rb' ? 'selected' : '')} onClick={this.handleClick}>Top RBs</div></Link>&nbsp;
						<Link className="section-link" to={ '/top/wr' }><div className={"section-tab " + (route == '/top/wr' ? 'selected' : '')} onClick={this.handleClick}>Top WRs</div></Link>&nbsp;
						<Link className="section-link" to={ '/blog' }><div className={"section-tab " + (route == '/blog' ? 'selected' : '')} onClick={this.handleClick}>Blog</div></Link>&nbsp;
						{addBlogPost}
						{loginLink}
						{addPlayer}
					</section>
				</div>
			</div>
		);
	}
}


class App extends React.Component {
	constructor() {
		super();
		this.onChange = this.onChange.bind(this);
		this.state = {
			user: null
		}
	}
	//check for logged in here and pass as prop to header
	componentWillMount() { 
		LoginStore.addChangeListener(this.onChange);
  }

	componentDidMount() {
		//check for user here
		let jwt = localStorage.getItem('jwt');
		if (jwt) {
  		AuthActions.loginUser(jwt);
		}
	}

	componentWillUnmount() {
    LoginStore.removeChangeListener(this.onChange);
  }
  
  onChange() {
  	console.log('LOGIN STORE THROWS CHANGE')
  	let user = LoginStore.user || null;
  	this.setState({
  		user: user
  	});
  }

  render() {
  	return (
  		<div>
  			<Header user={this.state.user} path={this.props.location.pathname} />	
  			<div className="main-page-container">
  				{this.props.children}
  			</div>
  		</div>
  		)
  }
}


var requireAuth = (nextState, replace) => {
  if (!LoginStore.isLoggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={ App }>
      <IndexRoute component={ PlayerSearch } />
      <Route path="top/:id" component={ TopList } />
      <Route path="admin/add-player" component={ AddPlayer } onEnter={ requireAuth } />
      <Route path="admin/edit-player/:id" component={ AddPlayer } />
      <Route path="admin/add-post" component={AddBlog} onEnter={ requireAuth } />
      <Route path="blog" component={ Blog } />
      <Route path="login" component={ Login } />
      <Route path="create" component={ Create } onEnter={ requireAuth } />
    </Route>
  </Router>
), document.getElementById('app-container') )


module.exports = App;
