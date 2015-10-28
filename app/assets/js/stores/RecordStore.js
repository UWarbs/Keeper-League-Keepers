// Todo store
//
// Requiring the Dispatcher, Constants, and
// event emitter dependencies
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/Constants');
var ObjectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

//define store as empty array
var _store = {
	year: 1,
	standings:[
							{id: 'AVS', wins: 8},
							{id: ',,,', wins: 2},
							{id: 'Roth', wins: 12},
							{id: 'TDs', wins: 7}
						],
	domain: {x: [0, 14], y: [0,14]}
}

;

// Define the public event listeners and getters that
// the views will use to listen for changes and retrieve
// the store
var RecordStore = ObjectAssign( {}, EventEmitter.prototype, {
	addChangeListener: function(cb) {
		this.on(CHANGE_EVENT, cb);
	},

	removeChangeListener: function(cb) {
		this.removeListener(CHANGE_EVENT, cb);
	},

	getRecord: function() {
		return _store;
	}
});

// Register each of the actions with the dispatcher
// by changing the store's data and emitting a
// change

AppDispatcher.register(function(payload) {
	var action = payload.action;
	
	switch(action.actionType) {
		
		case AppConstants.GET_RECORD:
			RecordStore.emit(CHANGE_EVENT);
			break;
		
		case AppConstants.GET_SCRAPED_DATA:
			break;
    	console.loge(action);
    default: 
    	return true;
	}
});
module.exports = RecordStore;