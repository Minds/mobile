card.io Cordova Plugin Release Notes
====================================

2.1.0
-----
* iOS: Update to 5.4.1 for iOS card.io.
* iOS: Fix suppressScan config does not work on iOS [#46](https://github.com/card-io/card.io-Cordova-Plugin/issues/46). Thanks lolptdr.

2.0.2
-----
* Android: Add ability to blur all digits in the scanned card image, minus any number of digits to remain unblurred, enabled via `CardIOActivity.EXTRA_UNBLUR_DIGITS`. Thank you Michael Schmoock.
* Android: Fix issue where Maestro cards were not correctly recognized [#154](https://github.com/card-io/card.io-Android-SDK/issues/154).
* Android: Fix issue on Android 23 and above where `CardIOActivity#canReadCardWithCamera()` would return the incorrect value if permissions had not been granted [#136](https://github.com/card-io/card.io-Android-SDK/issues/136).  Now defaults to `true` in such cases.
* Android: Add missing locales to javadocs [card.io-Android-source#75](https://github.com/card-io/card.io-Android-source/issues/75).
* Android: Upgrade gradle to 2.13.
* Android: Upgrade Android Gradle plugin to 2.1.0.

2.0.1
------
* Fixes Plugin.xml.

2.0.0
------
* Added more configurations to cordova app.
* Added support for Android.
* Updated CardIO iOS version to 5.3.2.

1.0.0
------
* Simplify integration instructions.
* Add CardIO library 4.0.0.
* Fix deprecated warnings.
* Re-arrange structure for plugman support.
* Minor cleanup.
