function MindsShareIntent() {
    'use strict';
}

MindsShareIntent.prototype.getCordovaIntent = function(successCallback, failureCallback) {
    'use strict';

    return cordova.exec (
        successCallback,
        failureCallback,
        "MindsShareIntent",
        "getCordovaIntent",
        []
    );
};

MindsShareIntent.prototype.setNewIntentHandler = function(method) {
    'use strict';

    cordova.exec (
        method,
        null,
        "MindsShareIntent",
        "setNewIntentHandler",
        [method]
    );
};

MindsShareIntent.prototype.getRealPathFromContentUrl = function(uri, successCallback, failureCallback) {
    'use strict'

    cordova.exec (
        successCallback,
        failureCallback,
        'MindsShareIntent',
        'getRealPathFromContentUrl',
        [uri]
    );

}

var intentInstance = new MindsShareIntent();
module.exports = intentInstance;

// Make plugin work under window.plugins
if (!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.intent) {
    window.plugins.intent = intentInstance;
}
