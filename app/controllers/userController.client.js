import ajaxFunctions from '../common/ajax-functions.js';
const appUrl = window.location.origin;

function userController (callback) {
   const apiUrl = appUrl + '/api/:id';

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, user => {
      return callback(JSON.parse(user));
   }));
}

export default userController;