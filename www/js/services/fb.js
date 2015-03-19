/**
 * Minds::mobile
 * Facebook service
 * 
 * @author Mark Harding
 */

define(['angular', 'facebook'], function (angular) {
    "use strict";

    var factory = function () {
	
		 FB.init({
		    appId      : '184865748231073',
		  });
		  console.log(FB);
		 FB.getLoginStatus(function(response) {
		    console.log(response);
		    
		  });
		FB.login();
				
        return {
    		
        };

    };

    factory.$inject = [];
    return factory;
});