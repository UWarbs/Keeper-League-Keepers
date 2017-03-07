'use strict';
module.exports = {
	position: function(position) {
		var position = position.toLowerCase();
		var abbrev;
		switch(position) {
			case 'wide receiver':
				abbrev = 'WR';
				break;
			case 'quarterback':
				abbrev = 'QB';
				break;
			case 'running back':
				abbrev = 'RB';
				break;
			case 'tight end': 
				abbrev = 'TE';
				break;
			case 'kicker':
				abbrev = 'K';
				break;
			case 'defense':
				abbrev = 'D/ST';
				break;
			default:
				abbrev = position.toUpperCase();
				break;
		}
		return abbrev;
	},
	team: function(team) {
		var team = team.toLowerCase();
		var abbrev;
		switch(team) {
			case 'seattle seahawks':
				abbrev = 'SEA';
				break;
			case 'san francisco 49ers':
				abbrev = 'SF';
				break;
			case 'arizona cardinals':
				abbrev = 'ARI';
				break;
			case 'st. louis rams':
				abbrev = 'STL';
				break;
			case 'green bay packers':
				abbrev = 'GB';
				break;
			case 'chicago bears':
				abbrev = 'CHI';
				break;
			case 'detroit lions':
				abbrev = 'DET';
				break;
			case 'minnesota vikings':
				abbrev = 'MIN';
				break;
			case 'tampa bay buccaneers':
				abbrev = 'TB';
				break;
			case 'new orleans saints':
				abbrev = 'NO';
				break;
			case 'atlanta falcons':
				abbrev = 'ATL';
				break;
			case 'carolina panthers':
				abbrev = 'CAR';
				break;
			case 'new york giants':
				abbrev = 'NYG';
				break;
			case 'washington redskins':
				abbrev = 'WAS';
				break;
			case 'philadelphia eagles':
				abbrev = 'PHI';
				break;
			case 'dallas cowboys':
				abbrev = 'DAL';
				break;
			case 'oakland raiders':
				abbrev = 'OAK';
				break;
			case 'denver broncos':
				abbrev = 'DEN';
				break;
			case 'san diego chargers':
				abbrev = 'SD';
				break;
			case 'kansas city chiefs':
				abbrev = 'KC';
				break;
			case 'houston texans':
				abbrev = 'HOU';
				break;
			case 'indianapolis colts':
				abbrev = 'IND';
				break;
			case 'jacksonville jaguars':
				abbrev = 'JAX';
				break;
			case 'tennessee titans':
				abbrev = 'TEN';
				break;
			case 'cincinnati bengals':
				abbrev = 'CIN';
				break;
			case 'cleveland browns':
				abbrev = 'CLE';
				break;
			case 'baltimore ravens':
				abbrev = 'BAL';
				break;
			case 'pittsburgh steelers':
				abbrev = 'PIT';
				break;
			case 'new england patriots':
				abbrev = 'NE';
				break;
			case 'new york jets':
				abbrev = 'NYJ';
				break;
			case 'miami dolphins':
				abbrev = 'MIA';
				break;
			case 'buffalo bills':
				abbrev = 'BUF';
				break;
			default:
				abbrev = team.toUpperCase();
				break;							
		}
		return abbrev;
	},

	getFirstName: function(name) {
		var firstName = name.split(' ').slice(0, -1).join(' ');
		return firstName;
	},

	getLastName: function(name) {
		var lastName = name.split(' ').slice(-1).join(' ');
		return lastName;
	}
}