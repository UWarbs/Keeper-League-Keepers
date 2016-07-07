"use strict";
import Api from '../ApiEndpoints';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/Constants';

export default {
	getSinglePlayer: (id) => {
		Api.getSinglePlayer('/api/player/' + id)
		.then(function(player) {
			AppDispatcher.handleServerAction({
				actionType: Constants.GET_SINGLE_PLAYER,
				player: player
			});			
		})
	},

	getAllPlayers: () => {
		Api.get('/api/all-players')
		.then(function(players) {
			AppDispatcher.handleServerAction({
				actionType: Constants.GET_PLAYERS,
				players: players
			});			
		});
	},

	addNewPlayer: (data) => {
		Api.post('/api/new-player', data)
		.then(function(player) {
			AppDispatcher.handleServerAction({
				actionType: Constants.NEW_PLAYER,
				player: player
			});
		});
	},

	editPlayer: (id, data) => {
		Api.post('/api/edit-player/' + id, data)
		.then(function(player) {
			AppDispatcher.handleServerAction({
				actionType: Constants.EDIT_PLAYER,
				player: player
			});
		});
	},

	getList: (id) => {
		Api.get('/api/top/' + id)
		.then(function(list) {
			AppDispatcher.handleServerAction({
				actionType: Constants.GET_LIST,
				list: list
			});
		});
	}
};