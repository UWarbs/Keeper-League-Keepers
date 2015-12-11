# Keeper League Keepers

Online database of NFL football player fantasy league Analysis tailored to keeper leagues (Leagues in which players stay on a team from year to year).

##Technologies

**ReactJs** - Enjoyable to use and makes sense for the scope of this project with reusable components and the SPA nature of it.

**Flux** - This will keep the data aspect clean and flowing the right direction.

**ES6** - Using this with the .jsx react files.

**Superagent** - In place of ajax calls.

**MySQL w/[knex](http://knexjs.org/) wrapper** - knex is an awesome wrapper/querybuilder for relational databases. Very lightweight and well-documented. 

**SCSS** - Love this CSS preprocessor. 

**Webpack** - I am more familiar with grunt, but time to branch out.

**Hapi** - More familiar with express but see above.

###Preliminary data schema

{

	"id": int,

	"firstName": String,

	"lastName": String,

	"age": int,

	"positionalRating": int

	"yearsExperience": int,

	"writeUp": String,

	"position": String,
	
	"positionAbbrev": String,
	
	"team": String,
	
	"teamAbbrev": String

}

###Testing Tech

Karma, Mocha, Chai seems like a good start. Superagent for calls to the API.

###Content Creators

Ryan, Greg, Eric, Nick, Lars, any qualified members of 'The League - Seattle Style'. Open source contributions?

###Hosting

Amazon EC2 for now.
