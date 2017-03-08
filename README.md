# Keeper League Keepers

Online database of NFL football player fantasy league Analysis tailored to keeper leagues (Leagues in which players stay on a team from year to year).

##Features

- All fantasy football-eligible players from 2015 (I started and stopped working on this before the 2016 season)

- Ability for contributors to edit player ratings, names, team, position etc and provide a writeup for each player.

- Comprehensive, fast player search.

- Side by side comparison of two players.

- User authentication and authorization using jwt and bcrypt. 

- Blog platform for contributors.

- Sort top players by position

##Why I made this

I wanted to make a project that used react on the front-end and Node for a server language.

My friends and I are in a 14-team dynasty Fantasy Football league, and we've comiserated over the fact that websites that analyze fantasy football cater to the standard league that drafts a whole new team every year. Fair enough, that probably makes up > 99% of leagues. Even so, I figured this could be a niche site that provides analysis on more than just the current year for fantasy. It's also nice to be interested in the subject of a personal project.

##Why I stopped working on it

- It relies soley on content creation. 

- My company pivoted to Augmented and Virtual Reality in early 2016 and I started focusing on technology surrounding that field.

##Why I'll start work on this again

It would be fun to use this as a sandbox to try various models for predicting player rank ranges over a multi-year period. This means the site would add value without relying on outside content and the ratings would be objective rather than subjective. It is also a great way to practice various statistical machine learning techniques. 

For example, the player cards could have yearly positional ranking range projections: 2017: 8-13, 2018: 4-12, 2019: 6-14

##Technologies

**ReactJs** - Enjoyable to use and makes sense for the scope of this project with reusable components and the SPA nature of it.

**Flux** - This will keep the data aspect clean and flowing the right direction.

**ES6** - Using this with the .jsx react files.

**Superagent** - Use this for ajax calls.

**MySQL w/[knex](http://knexjs.org/) wrapper** - knex is an awesome wrapper/querybuilder for relational databases. Very lightweight and well-documented. 

**SCSS** - Love this CSS preprocessor. 

**Webpack** - I am more familiar with grunt, but time to branch out.

**Hapi** - More familiar with express but see Webpack.

###Testing Tech

Chai with Superagent for calls to the API.

###Hosting

Heroku free tier.
