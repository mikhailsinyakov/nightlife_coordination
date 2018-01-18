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
        window.navigator.geolocation.getCurrentPosition(success, error);
        
        function success(pos) {
            const latitude = pos.coords.latitude;
            const longitude = pos.coords.longitude;
            const apiUrl = appUrl + `/api/yelpRequest/position/${latitude}/${longitude}/1`;
            ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, data => {
                return callback(JSON.parse(data));
            }));
        }
        function error() {
            alert("Geolocation doesn't work on your computer");
        }
        
    };
    
}

export default YelpController;