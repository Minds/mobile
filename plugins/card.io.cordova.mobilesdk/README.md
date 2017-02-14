card.io plug-in for Cordova
---------------------------

This plug-in exposes card.io credit card scanning.

Note: If you would like to actually process a credit card charge, you might be interested in the [PayPal Cordova Plug-in](https://github.com/paypal/PayPal-Cordova-Plugin).

Maintenance of this repository
------------------------------

If you discover a problem here, please submit an Issue or Pull Request. (Unless, of course, the problem is actually in the underlying card.io SDK for either [iOS](https://github.com/card-io/card.io-iOS-SDK) or [Android](https://github.com/card-io/card.io-Android-SDK). We're always interested in discovering and fixing bugs in our SDKs!)

Supported configurations
------------------------

The card.io Cordova plugin provides different configurations that could be set according to your requirements. Here are the list of supported configurations.

|  **Configuration**               | **Type** | **Description** |
|  :------                         | :------  | :------         |
|  requireExpiry                   | Boolean  | Expiry information will not be required. |
|  requireCVV                      | Boolean  | The user will be prompted for the card CVV |
|  requirePostalCode               | Boolean  | The user will be prompted for the card billing postal code. |
|  suppressManual                  | Boolean  | Removes the keyboard button from the scan screen. |
|  restrictPostalCodeToNumericOnly | Boolean  | The postal code will only collect numeric input. Set this if you know the expected country's postal code has only numeric postal codes. |
|  keepApplicationTheme            | Boolean  | The theme for the card.io Activity's will be set to the theme of the application. |
|  requireCardholderName           | Boolean  | The user will be prompted for the cardholder name |
|  scanInstructions                | String   | Used to display instructions to the user while they are scanning their card. |
|  noCamera                        | Boolean  | If set, the card will not be scanned with the camera. |
|  scanExpiry                      | Boolean  | If scanExpiry is true, an attempt to extract the expiry from the card image will be made. |
|  languageOrLocale                | String   | The preferred language for all strings appearing in the user interface. If not set, or if set to null, defaults to the device's current language setting. |
|  guideColor                      | String   | Changes the color of the guide overlay on the camera. The color is provided in hexadecimal format (e.g. "#FFFFFF") |
|  suppressConfirmation            | Boolean  | The user will not be prompted to confirm their card number after processing. |
|  hideCardIOLogo                  | Boolean  | The card.io logo will not be shown overlaid on the camera. |
|  useCardIOLogo                   | Boolean  | The card.io logo will be shown instead of the PayPal logo. |
|  suppressScan                    | Boolean  | Once a card image has been captured but before it has been processed, this value will determine whether to continue processing as usual. |

Integration instructions
------------------------

The card.io Cordova Plugin adds support for the CardIO iOS and android platform. It uses the native CardIO library. Cordova plugin management will set up all the required capabilities/frameworks for the project. The only bit left for you to do is to add necessary files, as described below.

1.	Follow the official [Cordova](https://cordova.apache.org) documentation to install command line tools.
2.	Create project, add plugin and platforms:

```bash

   $ cordova create ScanCard com.mycompany.scancard "ScanCard"
   $ cd ScanCard
   $ cordova platform add ios
   $ cordova platform add android
   $ cordova plugin add https://github.com/card-io/card.io-Cordova-Plugin
```

1.	Follow Your app integration section below.
2.	Run `cordova run ios` or `cordova run android` to build and the project.

Note: For use with iOS 10 +
When building your app with the iOS 10 SDK +, you have to add some info to the info.plist file. This is due to increased security in iOS 10. Go to your app directory and search for the &lt;your app name&gt;Info.plist file. Add the following lines in the main &lt;dict&gt; element.

```xml
      <key>NSCameraUsageDescription</key>
      <string>To scan credit cards.</string>
```

If you have a different way to edit .plist files - plugins etc. - you can do that.

Sample HTML + JS
----------------

1.	In `ScanCard/www/index.html` add the following to lines after `<p class="event received">Device is Ready</p>`:

```javascript
      <button id="scanBtn"> Scan Now!</button>
```

1.	Replace `ScanCard/www/js/index.js` with the following code:

```javascript

    /*
     * Licensed to the Apache Software Foundation (ASF) under one
     * or more contributor license agreements.  See the NOTICE file
     * distributed with this work for additional information
     * regarding copyright ownership.  The ASF licenses this file
     * to you under the Apache License, Version 2.0 (the
     * "License"); you may not use this file except in compliance
     * with the License.  You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing,
     * software distributed under the License is distributed on an
     * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
     * KIND, either express or implied.  See the License for the
     * specific language governing permissions and limitations
     * under the License.
     */
    var app = {
        // Application Constructor
        initialize: function() {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        onDeviceReady: function() {
            app.receivedEvent('deviceready');
        },
        // Update DOM on a Received Event
        receivedEvent: function(id) {
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');

            console.log('Received Event: ' + id);

            app.example();
        },

        example : function () {
          var cardIOResponseFields = [
            "cardType",
            "redactedCardNumber",
            "cardNumber",
            "expiryMonth",
            "expiryYear",
            "cvv",
            "postalCode"
          ];

          var onCardIOComplete = function(response) {
            console.log("card.io scan complete");
            for (var i = 0, len = cardIOResponseFields.length; i < len; i++) {
              var field = cardIOResponseFields[i];
              console.log(field + ": " + response[field]);
            }
          };

          var onCardIOCancel = function() {
            console.log("card.io scan cancelled");
          };

          var onCardIOCheck = function (canScan) {
            console.log("card.io canScan? " + canScan);
            var scanBtn = document.getElementById("scanBtn");
            if (!canScan) {
              scanBtn.innerHTML = "Manual entry";
            }
            scanBtn.onclick = function (e) {
              CardIO.scan({
                  "requireExpiry": true,
                  "requireCVV": false,
                  "requirePostalCode": false,
                  "restrictPostalCodeToNumericOnly": true
                },
                onCardIOComplete,
                onCardIOCancel
              );
            }
          };

          CardIO.canScan(onCardIOCheck);
        }
    };

    app.initialize();

```

Another javascript implementation example.

```javascript
      document.addEventListener('deviceready', scanCreditCard, false);

      function scanCreditCard(){
        CardIO.canScan(onCardIOCheck);

        function onCardIOComplete(response) {
          var cardIOResponseFields = [
            "cardType",
            "redactedCardNumber",
            "cardNumber",
            "expiryMonth",
            "expiryYear",
            "cvv",
            "postalCode"
          ];

          var len = cardIOResponseFields.length;
          alert("card.io scan complete");
          for (var i = 0; i < len; i++) {
            var field = cardIOResponseFields[i];
            alert(field + ": " + response[field]);
          }
        }

        function onCardIOCancel() {
          alert("card.io scan cancelled");
        }

        function onCardIOCheck(canScan) {
          alert("card.io canScan? " + canScan);
          var scanBtn = document.getElementById("scanBtn");
          if (!canScan) {
            scanBtn.innerHTML = "Manual entry";
          }

          scanBtn.addEventListener("click", function(e) {      
            CardIO.scan({
              "requireExpiry": true,
              "scanExpiry": true,
              "requirePostalCode": true,
              "restrictPostalCodeToNumericOnly": true,
              "hideCardIOLogo": true,
              "suppressScan": false,
              "keepApplicationTheme": true
            } , onCardIOComplete, onCardIOCancel);
          });
        }
      }
```

Contributing
------------

Please read our [contributing guidelines](CONTRIBUTING.md) prior to submitting a Pull Request.

License
-------

Please refer to this repo's [license file](LICENSE).
