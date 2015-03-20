/**
 * Minds::mobile
 * Filters loader
 * 
 * @author Mark Harding
 */

define(['angular'], 
	function(angular) {
		'use strict';

		var filters = angular.module('app.filters', ['app.services']);
		filters.filter('abbr', function(){
			return function(number){
				var decPlaces = 2;
			    // 2 decimal places => 100, 3 => 1000, etc
			    decPlaces = Math.pow(10,decPlaces);

			    // Enumerate number abbreviations
			    var abbrev = [ "k", "m", "b", "t" ];

			    // Go through the array backwards, so we do the largest first
			    for (var i=abbrev.length-1; i>=0; i--) {

			        // Convert array index to "1000", "1000000", etc
			        var size = Math.pow(10,(i+1)*3);

			        // If the number is bigger or equal do the abbreviation
			        if(size <= number) {
			             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
			             // This gives us nice rounding to a particular decimal place.
			             number = Math.round(number*decPlaces/size)/decPlaces;

			             // Handle special case where we round up to the next abbreviation
			             if((number == 1000) && (i < abbrev.length - 1)) {
			                 number = 1;
			                 i++;
			             }

			             // Add the letter for the abbreviation
			             number += abbrev[i];

			             // We are done... stop
			             break;
			        }
			    }
			    return number;
			};
		});
		
		filters.filter('linky', function($sce){
			return function(text) {
		
				 if (!text) return text;
				  
				 var replacedText = text;
				 
				 var url = /(\b(https?|http|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
				 replacedText = text.replace(url, '<a href="$1">$1</a>');
				 
				 //var hashtag = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
				 //replacedText = replacedText.replace(hashtag, '$1<a href="#/tab/search">#$2</a>');

				 var tag = /(^|\s)\@(\w*[a-zA-Z_]+\w*)/gim;
				 replacedText = replacedText.replace(tag, '$1<a class="tag" href="#/tab/newsfeed/channel/$2">@$2</a>');
				 return $sce.trustAsHtml(replacedText);
				 
			};
         });
		
		filters.filter( 'domain', function () {
			return function ( input ) {
				if(!input)
					return;
					
				var matches,
					output = input,
			    urls = /\w+:\/\/([\w|\.]+)/;
			
			    matches = urls.exec( input );
			
			    if ( matches !== null ) 
			    	output = matches[1];

			   	if(output.indexOf('www.') > -1)
			   		output = output.split('www.').pop();
			   	
				console.log(output);
			    return output;
			};
		});
				
		return filters;

}); 