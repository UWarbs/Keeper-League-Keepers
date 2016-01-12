// Requiring the Dispatcher, Constants, and
// event emitter dependencies
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/Constants');
var ObjectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change'; //have different change events??? one for all players one for single player?

var _allPlayers = [];
var _player;
var _list;
function setPlayers (players) {
	_allPlayers = players;
}
function setPlayer (player) {
	_player = player;
}
function setList (list) {
	_list = list;
}
// Define the public event listeners and getters that
// the views will use to listen for changes and retrieve
// the store
var PlayerStore = ObjectAssign( {}, EventEmitter.prototype, {
	addChangeListener: function(cb) {
		this.on(CHANGE_EVENT, cb);
	},

	removeChangeListener: function(cb) {
		this.removeListener(CHANGE_EVENT, cb);
	},

	getPlayers: function() {
		return _allPlayers;
	},

	getSinglePlayer: function() {
		return _player[0];
	},

	getList: function() {
		return _list;
	}
});

// Register each of the actions with the dispatcher
// by changing the store's data and emitting a
// change

AppDispatcher.register(function(payload) {
	var action = payload.action;
	// console.log(action);
	switch(action.actionType) {
		case AppConstants.GET_PLAYERS:
			setPlayers(action.players);
			PlayerStore.emit(CHANGE_EVENT);
			break;
		case AppConstants.GET_SINGLE_PLAYER:
			setPlayer(action.player);
			PlayerStore.emit(CHANGE_EVENT);
			break;
		case AppConstants.GET_LIST:
			setList(action.list);
			PlayerStore.emit(CHANGE_EVENT); 
    default: 
    	return true;
	}
});
module.exports = PlayerStore;