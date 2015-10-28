var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants     = require('../constants/Constants');

module.exports = {
	getSinglePlayer: function() {
		AppDispatcher.handleServerAction({
			actionType: Constants.GET_SINGLE_PLAYER,
			id: id
		});
	},
	getAllPlayers: function() {
		AppDispatcher.handleServerAction({
			actionType: Constants.GET_PLAYERS
		});
	}
};