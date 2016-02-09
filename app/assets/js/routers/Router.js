const App = require('./../components/index.jsx'); //App and Header component
const PlayerSearch = require('./../components/playerSearch.jsx'); //Playersearch
const TopList = require('./../components/topList.jsx'); //top list pages
const AddPlayer = require('./../components/admin/AddPlayer.jsx');
const Create = require('./../components/admin/Create.jsx');
const Login = require('./../components/admin/Login.jsx');

module.exports = [{
  path: '/', component: App, PlayerSearch: { component: App }
}, {
  path: '/top/:id', component: TopList, indexRoute: { component: App }
}, {
  path: '/admin/add-player', component: AddPlayer, indexRoute: { component: App }
}, {
  path: '/admin/edit-player/:id', component: AddPlayer, indexRoute: { component: App }
},
	 {
	path: '/login', component: Login, indexRoute: { component: App }
}];
	


  // <Router history={browserHistory}>
  //   <Route path="/" component={ App }>
  //     <IndexRoute component={ PlayerSearch } />
  //     <Route path="top/:id" component={ TopList } />
  //     <Route path="admin/add-player" component={ AddPlayer } onEnter={ requireAuth } />
  //     <Route path="admin/edit-player/:id" component={ AddPlayer } />
  //     <Route path="login" component={ Login } />
  //     <Route path="create" component={ Create } onEnter={ requireAuth } />
  //   </Route>
  // </Router>