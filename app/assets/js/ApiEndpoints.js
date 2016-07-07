"use strict";
var request = require('superagent');

module.exports = {
	get: function (url) {
		return new Promise(function (resolve, reject) {
			request
				.get(url)
				.end(function (err, res) {
					if (err) { console.error(err); }
					if (res.status === 404) {
						reject();
					}else {
						resolve(JSON.parse(res.text));
					}
				});
		});
	},
	getSinglePlayer: function(url) {
		return new Promise(function (resolve, reject) {
			request
				.get(url)
				.end(function (err, res) {
					if (err) { console.error(err); }
					if (res.status === 404) {
						reject();
					}else {
						resolve(JSON.parse(res.text));
					}
				});			
		});
	},
	getSingleBlogPost: function(url) {
		return new Promise(function (resolve, reject) {
			request
				.get(url)
				.end(function (err, res) {
					if (err) { console.error(err); }
					if (res.status === 404) {
						reject();
					}else {
						resolve(JSON.parse(res.text));
					}
				});			
		});
	},
	post: function(url, data) {
		return new Promise(function (resolve, reject) {
			request
				.post(url)
				.send(data)
				.end(function(err, res) {
					if(err) { console.error(err); }
					if(res.status === 404) {
						reject();
					}else {
						console.log('success res:');
						console.log(res);
						resolve(JSON.parse(res.text));
					}
				})
		})
	}
};
