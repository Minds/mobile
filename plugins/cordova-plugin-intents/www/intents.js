/**
 * License TBC
 */

var utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    cordova = require('cordova');

/**
 * @constructor
 */
function Intents() {

}

Intents.prototype.onIntent = function(success_callback, error_callback){
    exec(success_callback,
         error_callback,
         "Intents",
         "onIntent",
         []);
}
module.exports = new Intents();
