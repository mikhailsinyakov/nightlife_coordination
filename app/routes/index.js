'use strict';

const path = process.cwd();
const YelpRequest = require("../controllers/yelpRequest");

module.exports = (app, passport) => {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}
	const yelpRequest = new YelpRequest();

	app.route('/')
		.get((req, res) => {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/logout')
		.get((req, res) => {
			req.logout();
			res.redirect('/');
		});

	app.route('/api/:id')
		.get((req, res) => {
			res.json(req.user.github);
		});
		
	app.route('/api/yelpRequest/position/:latitude/:longitude/:page')
		.get(yelpRequest.setPositionQueries);
		
	app.route('/api/yelpRequest/location/:location/:page')
		.get(yelpRequest.setLocationQuery);

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
};
