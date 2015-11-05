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
			"firstName": "Russell",
			"lastName": "Wilson",
			"age": 26,
			"positionalRating": "A-",      
			"yearsExperience": 4,
			"writeUp": {
				"body": "This is a write up",
				"author": "Greg",
				"date" : "11/1/2015"
			},
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
			"writeUp": {
				"body": "This is a write up",
				"author": "Greg",
				"date" : "11/1/2015"
			},
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
		},
		{
			"id": 3,
			"firstName": "Allen",
			"lastName": "Robinson",
			"age": 22,
			"positionalRating": "A",      
			"yearsExperience": 2,
			"writeUp": {
				"body": "Not even the first WR taken by Jacksonville in the 2014 Draft (Marquise Lee), Allen Robinson has quickly emerged to become a true WR1. With great size (6\'3\" 215 lbs) and hops (39 inch vertical), Robinson has established himself as a dominant red zone target averaging almost a touchdown/game through 7 games.  With an insane amount of targets and still only 22 years old, Robinson will anchor your receiving corp for the next decade.",
				"author": "Greg",
				"date" : "11/1/2015"
			},
			"position": { 
				"id": 3,
				"name": "Wide Receiver",
				"abbrev": "WR",
				"writeup": "Keeper league WRs are similar to RBs"
			},
			"team": {
				"id": 2,
				"name": "Jacksonville Jaguars",
				"abbrev": "JAC",
				"writeup": "They aight."
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
	},

	getSinglePlayer: function(id) {
		var playerToReturn;
		
		_store.players.forEach(function(player, index, array) {
			if (player.id === id) {
				playerToReturn = player;
			}
		});		
		
		return playerToReturn;
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

		// case AppConstants.GET_SINGLE_PLAYER:   //seems to call 
		// 	var id = action.id;
		// 	console.log('store action run with id: ' + id);
		// 	var playerToReturn;
			
		// 	_store.players.forEach(function(player, index, array) {
		// 		if (player.id === id) {
		// 			playerToReturn = player;
		// 		}
		// 	});		
			
		// 	return playerToReturn;
			
		// 	PlayerStore.emit(CHANGE_EVENT);
		// 	break;

    default: 
    	return true;
	}
});
module.exports = PlayerStore;