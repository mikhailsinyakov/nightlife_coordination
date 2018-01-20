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
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest('PUT', apiUrl, (result, status) => {
            if (status != 200) {
                return alert(result);
            }
            return callback();
        }));
    };
    
    this.removeUserFromBarsVisitors = (yelp_id, callback) => {
        const apiUrl = `${appUrl}/api/removeUserFrom/${yelp_id}`;
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest('DELETE', apiUrl, (result, status) => {
            if (status != 200) {
                return alert(result);
            }
            return callback();
        }));
    };
    
}

export default BarController;