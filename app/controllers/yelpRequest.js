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
            try {
                JSON.parse(body);
            }
            catch (err) {
                return res.sendStatus(502);
            }
            body = JSON.parse(body);
            const businesses = body.businesses || [];
            if (!businesses.length) return res.sendStatus(404);
            const results = businesses.map(val => {
                return {
                    id: val.id,
                    name: val.name,
                    rating: val.rating,
                    address: val.location.address1,
                    url: val.url,
                    image_url: val.image_url
                };
            });
            
            res.json(results);
        });
    };
    
}

module.exports = YelpRequest;