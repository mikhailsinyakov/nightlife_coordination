"use strict";

const Bars = require("../models/bars");

function BarHandler() {
    
    this.getListOfSelectedBars = (req, res) => {
        Bars.find({}, (err, results) => {
            if (err) return res.sendStatus(500);
            res.json(results);
        });
    };
    
    this.addUserToBarsVisitors = (req, res) => {
        const user_id = req.user.id;
        const yelp_id = req.params.yelp_id;
        Bars.findOne({yelp_id}, (err, result) => {
            if (err) return res.sendStatus(500);
            if (!result) return this.addBarAndUserToDb(yelp_id, user_id, res);
            result.visitors.push({
                id: user_id
            });
            result.save((err, todo) => {
                if (err) return res.sendStatus(500);
                res.sendStatus(200);
            });
        });
    };
    
    this.addBarAndUserToDb = (yelp_id, user_id, res) => {
        const newBar = new Bars({
            yelp_id,
            visitors: [{
                id: user_id
            }]
        });
        newBar.save((err, todo) => {
                if (err) return res.sendStatus(500);
                res.sendStatus(200);
            });
    };
    
    this.removeUserFromBarsVisitors = (req, res) => {
        const user_id = req.user.id;
        const yelp_id = req.params.yelp_id;
        Bars.findOne({yelp_id}, (err, result) => {
            if (err) res.sendStatus(500);
            result.visitors = result.visitors.filter(val => val.id != user_id);
            
            if (!result.visitors.length) return this.removeBarFromDb(yelp_id, res);
            result.save((err, todo) => {
                if (err) return res.sendStatus(500);
                res.sendStatus(200);
            });
        });
    };
    
    this.removeBarFromDb = (yelp_id, res) => {
        Bars.remove({yelp_id}, err => {
            if (err) return res.sendStatus(500);
            res.sendStatus(200);
        });
    };
    
}

module.exports = BarHandler;