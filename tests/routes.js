//TODO: make this work on test database or something
var superagent = require('superagent');
var chai  		 = require('chai'),
		expect 		 = chai.expect,
		should 		 = chai.should();
var app 			 = require('../index.js');

describe('GET Routes', function() {
	var id = 2;
	it('can get all the current players', function(done) {
		superagent.get('http://localhost:8000/api/all-players')
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.length).to.be.above(7);
				expect(res.body[0].id).to.eql(1);
				done();
			})
	}); 
	it('can get a single player given an id', function(done) {
		superagent.get('http://localhost:8000/api/player/' + id)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.first_name).to.not.equal(null);
				expect(res.body.writeup).to.not.equal(null);
				expect(res.body.length).to.eql(1);
				done();
			})		
	});
});

describe('POST & DELETE Routes', function() {
	var newPlayer = {
		firstName: 'Kyle',
		lastName: 'Warbis',
		position: 'Quarterback',
		team: 'Tampa bay Buccaneers',
		rating: 5,
		age: 24,
		experience: 2,
		writeup: 'Real scrappy gym rat.'
	}
	var id = 12;
	// it('can add a new player', function(done) {
	// 	superagent.post('http://localhost:8000/api/new-player')
	// 		.send(newPlayer)
	// 		.end(function(err, res) {
	// 			expect(err).to.eql(null);
	// 			expect(res.status).to.eql(200);
	// 			done();
	// 		});
	// });
	it('can delete a given player', function(done) {
		superagent.delete('http://localhost:8000/api/delete/' + id)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.status).to.eql(200);
				done();
			})
	});
});