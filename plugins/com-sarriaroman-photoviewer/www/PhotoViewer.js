var exec = require('cordova/exec');

exports.show = function(url, title, options) {
    if( title == undefined ) {
      title = '';
    }

    if(typeof options == "undefined"){
        options = {};
    }

    exec(function(){}, function(){}, "PhotoViewer", "show", [url, title, options]);
};
