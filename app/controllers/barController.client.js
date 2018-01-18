import ajaxFunctions from '../common/ajax-functions.js';
const appUrl = window.location.origin;

function BarController(callback) {
    
    this.getBars = callback => {
        const apiUrl = appUrl + "/api/:id/getBars";
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, bars => {
            return callback(JSON.parse(bars));
        }));
    };
    
    this.addUserToBarsVisitors = (yelp_id, callback) => {
        const apiUrl = `${appUrl}/api/addUserTo/${yelp_id}`;
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest('PUT', apiUrl, result => {
            return callback(JSON.parse(result));
        }));
    };
    
    this.removeUserFromBarsVisitors = (yelp_id, callback) => {
        const apiUrl = `${appUrl}/api/removeUserFrom/${yelp_id}`;
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest('DELETE', apiUrl, result => {
            return callback(JSON.parse(result));
        }));
    };
    
}

export default BarController;