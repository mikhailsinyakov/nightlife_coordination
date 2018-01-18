import ajaxFunctions from '../common/ajax-functions.js';
const appUrl = window.location.origin;

function YelpController(callback) {
    
    this.getBarsByLocation = (search, callback) => {
        const apiUrl = appUrl + `/api/yelpRequest/location/${search}/1`;
        
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, data => {
            return callback(JSON.parse(data));
        }));
    };
    
    this.getBarsByPosition = callback => {
        if (!window.navigator.geolocation) {
            return alert("Turn on geolocation on your computer, please");
        }
        window.navigator.geolocation.getCurrentPosition(pos => {
            const latitude = pos.coords.latitude;
            const longitude = pos.coords.longitude;
            const apiUrl = appUrl + `/api/yelpRequest/position/${latitude}/${longitude}/1`;
            ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, data => {
                return callback(JSON.parse(data));
            }));
        });
        
    };
    
}

export default YelpController;