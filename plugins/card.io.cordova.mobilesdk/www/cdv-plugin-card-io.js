/**
 * cdv-plugin-card-io.js
 *
 * Copyright 2013 PayPal Inc.
 * MIT licensed
 */

/**
 * This class exposes card.io's card scanning functionality to JavaScript.
 *
 * @constructor
 */
function CardIO() {
}

/**
 * Scan a credit card with card.io.
 *
 *
 * @parameter options: an object; may be {}. Sample options object:
 *  {"collect_expiry": true, "collect_cvv": false, "collect_zip": false,
 *   "disable_manual_entry_buttons": false, "languageOrLocale": "en"}
 * Omit any key from options to get the default value. For more detail on
 * each of the options, look at CardIOPaymentViewController.h.
 *
 * @parameter onSuccess: a callback function that accepts a response object; response keys
 * include card_type, redacted_card_number, expiry_month, card_number, expiry_year,
 * and, if requested, cvv, and zip.
 *
 * @parameter onFailure: a zero argument callback function that will be called if the user
 * cancels card scanning.
 */
CardIO.prototype.scan = function(options, onSuccess, onFailure) {
  cordova.exec(onSuccess, onFailure, "CardIO", "scan", [options]);
};

/**
 * Check whether card scanning is currently available. (May vary by
 * device, OS version, network connectivity, etc.)
 *
 * @parameter callback: a callback function accepting a boolean.
 */
CardIO.prototype.canScan = function(callback) {
  var failureCallback = function() {
    console.log("Could not detect whether card.io card scanning is available.");
    callback(false);
  };
  var wrappedSuccess = function(response) {
    callback(response !== 0);
  };
  cordova.exec(wrappedSuccess, failureCallback, "CardIO", "canScan", []);
};

/**
 * Retrieve the version of the card.io library. Useful when contacting support.
 *
 * @parameter callback: a callback function accepting a string.
 */
CardIO.prototype.version = function(callback) {
  var failureCallback = function() {
    console.log("Could not retrieve card.io library version");
  };

  cordova.exec(callback, failureCallback, "CardIO", "version", []);
};


/**
 * Plugin setup boilerplate.
 */
module.exports = new CardIO();
