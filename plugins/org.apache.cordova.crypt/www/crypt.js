/**
 * License TBC
 */

var utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    cordova = require('cordova');

/**
 * @constructor
 */
function Crypt() {
   
    this.publicKey = null;
    this.privateKey = null;

}

/**
 * Set the private key
 */
Crypt.prototype.setPrivateKey = function(key){
    this.privateKey = key;
}

/**
 * Set the public key
 */
Crypt.prototype.setPublicKey = function(key){
    this.publicKey = key;
}

/**
 * Encrypt a string
 */
Crypt.prototype.encrypt = function(data, success_callback, error_callback){
    exec(success_callback,
         error_callback,
         "Crypt",
         "encrypt",
         [data, this.publicKey]);
}

/**
 * Decrypt
 */
Crypt.prototype.decrypt = function (data, success_callback, error_callback){

    exec(success_callback,
         error_callback, 
        "Crypt", 
        "decrypt", 
        [data, this.privateKey]);


}

Crypt.prototype.testme = function(){
    exec(function(success){
            console.log(success);
        },
        function(error){
            console.log(error);
        }, 
        "Crypt", "testme", []);
}

module.exports = new Crypt();
