'use strict';

const path = process.cwd();
const YelpRequest = require("../controllers/yelpRequest");
const BarHandler = require("../controllers/barHandler.server");

module.exports = (app, passport) => {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.sendStatus(401);
		}
	}
	
	const yelpRequest = new YelpRequest();
	const barHandler = new BarHandler();

	app.route('/')
		.get((req, res) => res.sendFile(path + '/public/index.html'));

	app.route('/logout')
		.get((req, res) => {
			req.logout();
			res.redirect('/');
		});

	app.route('/api/:id')
		.get((req, res) => req.user ? res.json(req.user) : res.json({}));
		
	app.route('/api/yelpRequest/position/:latitude/:longitude/:page')
		.get(yelpRequest.setPositionQueries);
		
	app.route('/api/yelpRequest/location/:location/:page')
		.get(yelpRequest.setLocationQuery);
		
	app.route('/api/:id/getBars')
		.get(barHandler.getListOfSelectedBars);
		
	app.route('/api/addUserTo/:yelp_id')
		.put(isLoggedIn, (req, res) => barHandler.addUserToBarsVisitors(req, res));
		
	app.route('/api/removeUserFrom/:yelp_id')
		.delete(isLoggedIn, (req, res) => barHandler.removeUserFromBarsVisitors(req, res));

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/'
		}));
};
