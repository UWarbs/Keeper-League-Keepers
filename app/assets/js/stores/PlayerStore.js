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
	players: [
		{	
			"id": 1,
			"firstName": "Russel",
			"lastName": "Wilson",
			"age": 26,
			"positionalRating": "A-",      
			"yearsExperience": 4,
			"writeUp": "The dude balls out without an Oline",
			"position": { 
				"id": 1,
				"name": "Quarterback",
				"abbrev": "QB",
				"writeup": "Keeper league quarterbacks are important because these guys can play for a long time"
			},
			"team": {
				"id": 1,
				"name": "Seattle Seahawks",
				"abbrev": "SEA",
				"writeup": "Best team around"
			},
			"history" : {
				"pastPoints": {
					"nonPPR": [{"2012": 150}, {"2013": 160}, {"2014": 180}],
					"PPR": [{"2012": 150}, {"2013": 160}, {"2014": 180}]
				}
			}
		},
		{
			"id": 2,
			"firstName": "Marshawn",
			"lastName": "Lynch",
			"age": 28,
			"positionalRating": "B-",      
			"yearsExperience": 9,
			"writeUp": "Great player, getting old though",
			"position": { 
				"id": 2,
				"name": "Running Back",
				"abbrev": "RB",
				"writeup": "Keeper league RBs are important, though you can always win the waiver lottery"
			},
			"team": {
				"id": 1,
				"name": "Seattle Seahawks",
				"abbrev": "SEA",
				"writeup": "Best team around"
			},
			"history" : {
				"pastPoints": {
					"nonPPR": [{"2012": 150}, {"2013": 160}, {"2014": 180}],
					"PPR": [{"2012": 150}, {"2013": 160}, {"2014": 180}]
				}
			}
		}
	]
};

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
		return _store;
	}
});

// Register each of the actions with the dispatcher
// by changing the store's data and emitting a
// change

AppDispatcher.register(function(payload) {
	var action = payload.action;
	
	switch(action.actionType) {
		
		case AppConstants.GET_PLAYERS:
			PlayerStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.GET_SINGLE_PLAYER:
			PlayerStore.emit(CHANGE_EVENT);
			break;

    default: 
    	return true;
	}
});
module.exports = PlayerStore;