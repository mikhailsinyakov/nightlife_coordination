"use strict";

const Bars = require("../models/bars");

function BarHandler() {
    
    this.getListOfSelectedBars = (req, res) => {
        Bars.find({}, (err, results) => {
            if (err) return res.sendStatus(500);
            if (!results.length) return res.json(results);
            const now = new Date();
            const dayInMilliseconds = 24 * 60 * 60 * 1000;
            const dayBefore = now - dayInMilliseconds;
            results = results.map(val => {
                        return {
                            yelp_id: val.yelp_id,
                            visitors: val.visitors.filter(val => val.time > dayBefore)
                        };
                    })
                            .filter(val => val.visitors.length);
            res.json(results);
        });
    };
    
    this.addUserToBarsVisitors = (req, res) => {
        const user_id = req.user.id;
        const yelp_id = req.params.yelp_id;
        Bars.findOne({yelp_id}, (err, result) => {
            if (err) return res.sendStatus(500);
            if (!result) return this.addBarAndUserToDb(yelp_id, user_id, res);
            console.log(new Date())
            result.visitors.push({
                id: user_id,
                time: new Date()
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
                id: user_id,
                time: new Date()
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