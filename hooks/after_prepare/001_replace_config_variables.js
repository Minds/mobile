#!/usr/bin/env node
/**
 * Detect the current build by looking at the config_target environment variable.
 * 
 * Replace config.js with config/config-xxxx.js (where config_target=xxxx)
 * If config-xxxx.js doesn't exist, execution will fail.
 *
 * You can set the config_target as:
 *    export config_target=dev
 * or right before the cordova command like this:
 *    config_target=qa cordova build --release android ios
 *
 * If config_target is not available, by default "local" will be assumed.
 *    
 */
var fs = require("fs");
var path = require("path");
var rootdir = process.argv[2];
var config_target = process.env.config_target || "dev"; // default to local
console.log("Running hook: " + path.basename(process.env.CORDOVA_HOOK));
// Return ip address otherwise return "localhost"
function get_ip_address() {
   var os=require('os');
   var ifaces=os.networkInterfaces();
   var ipAddresses = [];
   for (var dev in ifaces) {
      ifaces[dev].forEach(function(details){
          if (details.family=='IPv4' && !details.internal) {
           ipAddresses.push(details.address);
          }
      });
   }    
   return ipAddresses.length > 0 ? ipAddresses[0] : "localhost";
}
function replace_string_in_file(filename, to_replace, replace_with) {
    var data = fs.readFileSync(filename, 'utf8');
    var re = new RegExp(to_replace, "g");
    var result = data.replace(re, replace_with);
    fs.writeFileSync(filename, result, 'utf8');
}
var srcfile = path.join(rootdir, "config", "config-" + config_target + ".js");
 
// Define the destination paths for the config.js file for each platform
var configFilesToReplace = {
    "android" : "platforms/android/assets/www/js/config.js",
    "ios" : "platforms/ios/www/js/config.js"
}; 
    
var platforms = process.env.CORDOVA_PLATFORMS.split(',');
 
for(var i=0; i < platforms.length; i++) {
    console.log("Modifying config for platform " + platforms[i] + ", config_target=" + config_target);
    var destfile = path.join(rootdir, configFilesToReplace[platforms[i]]);
 
    if (!fs.existsSync(srcfile)) {
         throw "Missing config file: "+srcfile;
    } else {
        console.log("copying " + srcfile + " to " + destfile);
 
        var srcContent = fs.readFileSync(srcfile, 'utf8');
        fs.writeFileSync(destfile, srcContent, 'utf8');
        
        // if config_target is local(which is the default) then replace localhost with the actual ip address
        if (config_target == "local") {
           var ip_address = get_ip_address();
           console.log("replacing localhost with " + ip_address);
           replace_string_in_file(destfile, "localhost", ip_address);
        }
    }
}
