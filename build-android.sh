#!/bin/sh

echo "Building armv7"

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore mindsdev.keystore platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk alias_name
rm minds.apk
/usr/local/opt/android-sdk/build-tools/22.0.1/zipalign -v 4 platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk minds.apk

echo "Building x86"

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore mindsdev.keystore platforms/android/build/outputs/apk/android-x86-release-unsigned.apk alias_name
rm minds-x86.apk
/usr/local/opt/android-sdk/build-tools/22.0.1/zipalign -v 4 platforms/android/build/outputs/apk/android-x86-release-unsigned.apk minds-x86.apk
