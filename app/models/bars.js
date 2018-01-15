'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bar = new Schema({
	yelp_id: String,
	visitors: [
	    {
	        id: String
	    }
	]
});

module.exports = mongoose.model('Bar', Bar);