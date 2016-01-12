'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/Constants');
var ObjectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
	lists: [
		{
			"id": "qb",
			"players": [
				{"id": 1, "firstName": "Russell", "lastName": "Wilson", "positionalRating": 97},
				{"id": 4, "firstName": "Derek", "lastName": "Carr", "positionalRating": 94},
				{"id": 5, "firstName": "Blaine", "lastName": "Gabbert", "positionalRating": 86}
			]
		},
		{
			"id": "rb",
			"players": [
				{"id": 2, "firstName": "Marshawn", "lastName": "Lynch", "positionalRating": 86},
				{"id": 6, "firstName": "Thomas", "lastName": "Rawls", "positionalRating": 91},
				{"id": 7, "firstName": "Javorius", "lastName": "Allen", "positionalRating": 90}
			]
		}
	]
};

// Define the public event listeners and getters that
// the views will use to listen for changes and retrieve
// the store
var ListStore = ObjectAssign( {}, EventEmitter.prototype, {
	addChangeListener: function(cb) {
		this.on(CHANGE_EVENT, cb);
	},

	removeChangeListener: function(cb) {
		this.removeListener(CHANGE_EVENT, cb);
	},

	getList: function(id) {
		var listToReturn;
		
		_store.lists.forEach(function(list, index, array) {
			if (list.id === id) {
				listToReturn = list;
			}
		});		
		return listToReturn;
	}
});

// Register each of the actions with the dispatcher
// by changing the store's data and emitting a
// change
AppDispatcher.register(function(payload) {
	var action = payload.action;
	
	switch(action.actionType) {
		
		case AppConstants.GET_LIST:
			ListStore.emit(CHANGE_EVENT);
			break;

    default: 
    	return true;
	}
});

module.exports = ListStore;
