var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/Constants');
var ObjectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change'; //have different change events??? one for all players one for single player?

var _allPosts = [];
var _blog;
function setAllPosts (posts) {
	_allPosts = posts;
}
function setBlog (blog) {
	_blog = blog;
}
// Define the public event listeners and getters that
// the views will use to listen for changes and retrieve
// the store
var BlogStore = ObjectAssign( {}, EventEmitter.prototype, {
	addChangeListener: function(cb) {
		this.on(CHANGE_EVENT, cb);
	},

	removeChangeListener: function(cb) {
		this.removeListener(CHANGE_EVENT, cb);
	},

	getAllPosts: function() {
		return _allPosts;
	},

	getSingleBlog: function() {
		return _blog[0];
	}
});

// Register each of the actions with the dispatcher
// by changing the store's data and emitting a
// change

AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case AppConstants.GET_ALL_BLOGS:
			setAllPosts(action.blogs);
			BlogStore.emit(CHANGE_EVENT);
			break;
		case AppConstants.GET_SINGLE_BLOG:
			setBlog(action.blog);
			BlogStore.emit(CHANGE_EVENT);			
    default: 
    	return true;
	}
});
module.exports = BlogStore;