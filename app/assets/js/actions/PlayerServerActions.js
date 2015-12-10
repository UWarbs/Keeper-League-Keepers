var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants     = require('../constants/Constants');
var Api 					= require('../Api');

module.exports = {
	getSinglePlayer: function(id) {
		AppDispatcher.handleServerAction({
			actionType: Constants.GET_SINGLE_PLAYER,
			id: id
		});
	},
	getAllPlayers: function() {
		Api.get('api/all-players')
		.then(function(players) {
			AppDispatcher.handleServerAction({
				actionType: Constants.GET_PLAYERS,
				players: players
			});			
		})
	}
};