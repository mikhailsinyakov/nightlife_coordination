"use strict";

const request = require("request");
const requestApi = "https://api.yelp.com/v3/businesses/search?";
const term = "term=bar";

function YelpRequest() {
    
    this.setPositionQueries = (req, res) => {
        const latitude = `&latitude=${req.params.latitude}`;
        const longitude = `&longitude=${req.params.longitude}`;
        const offset = `&offset=${req.params.page * 20 + 1}`;
        const url = requestApi + term + latitude + longitude + offset;
        this.sendRequest(url, res);
    };
    
    this.setLocationQuery = (req, res) => {
        const location = `&location=${req.params.location}`;
        const offset = `&offset=${req.params.page * 20 + 1}`;
        const url = requestApi + term + location + offset;
        this.sendRequest(url, res);
    };
    
    this.sendRequest = (url, res) => {
        const apiKey = process.env.YELP_API_KEY;
        const options = {
            url,
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        };
        request(options, (error, response, body) => {
            if (error) return res.sendStatus(500);
            body = JSON.parse(body);
            const businesses = body.businesses || [];
            const results = businesses.map(val => {
                return {
                    id: val.id,
                    name: val.name,
                    url: val.url,
                    image_url: val.image_url
                };
            });
            res.json(results);
        });
    };
    
}

module.exports = YelpRequest;