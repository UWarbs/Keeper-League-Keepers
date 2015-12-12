"use strict";
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants     = require('../constants/Constants');
var Api 					= require('../Api');

module.exports = {
	getSinglePlayer: function(id) {
		Api.getSinglePlayer('api/player/' + id)
		.then(function(player) {
			AppDispatcher.handleServerAction({
				actionType: Constants.GET_SINGLE_PLAYER,
				player: player
			});			
		})
	},
	getAllPlayers: function() {
		Api.get('api/all-players')
		.then(function(players) {
			AppDispatcher.handleServerAction({
				actionType: Constants.GET_PLAYERS,
				players: players
			});			
		});
	},
	addNewPlayer: function(data) {
		Api.post('/api/new-player', data)
		.then(function(player) {
			AppDispatcher.handleServerAction({
				actionType: Constants.NEW_PLAYER,
				player: player
			});
		});
	}
};