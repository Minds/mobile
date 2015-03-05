echo "BUILDING $1"
cd www
grunt compile
cd ../
cordova build $1

