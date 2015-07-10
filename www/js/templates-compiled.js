/*global define*/

define(['angular'], function(angular){
  angular.module('app.templates', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("templates/loading.html",
    "<ion-view title=\"<img src='img/full_logo.png' class='topbar-logo'/>\">\n" +
    "	<ion-pane ng-controller=\"LoadingCtrl\">\n" +
    "	\n" +
    "		\n" +
    "		<ion-tabs class=\"tabs-striped tabs-bottom tabs-icon-only\" ng-controller=\"TabsCtrl\">\n" +
    "	   \n" +
    "    </ion-pane>\n" +
    "</ion-view>");
  $templateCache.put("templates/login.html",
    "<ion-view title=\"<img src='img/full_logo.png' class='topbar-logo'/>\" hide-nav-bar=\"true\" class=\"login-bg\">\n" +
    "	<ion-pane ng-controller=\"LoginCtrl\" croll=\"false\" >\n" +
    "	\n" +
    "	   <div class=\"login-header\">\n" +
    "	       <div class=\"background-image background-image-2\"></div>\n" +
    "	       <img src=\"img/full_logo_white.png\" class=\"login-logo\"/>\n" +
    "	   </div>\n" +
    "	\n" +
    "        <form ng-submit=\"login()\" class=\"list\">\n" +
    "            <label class=\"item item-input\">\n" +
    "                <span class=\"input-label\">Username</span>\n" +
    "                <input type=\"text\" ng-model=\"username\">\n" +
    "            </label>\n" +
    "            <label class=\"item item-input\">\n" +
    "                <span class=\"input-label\">Password</span>\n" +
    "                <input type=\"password\" ng-model=\"password\">\n" +
    "            </label>\n" +
    "            \n" +
    "            <div class=\"padding\">\n" +
    "            <input type=\"submit\" class=\"button button-block button-positive\" value=\"Login\" ng-click=\"login()\"/>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "        <div class=\"padding\">\n" +
    "\n" +
    "           <!-- <div>\n" +
    "                <button class=\"button button-block button-positive\" ng-click=\"login()\">\n" +
    "                    Login\n" +
    "                </button>\n" +
    "            </div> -->\n" +
    "            \n" +
    "            <div class=\"login-options\">\n" +
    "                <a href=\"#/register\">Create an account</a> \n" +
    "                <a href=\"{{$root.node_url}}forgotpassword\">Forgot password</a>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </ion-pane>\n" +
    "</ion-view>");
  $templateCache.put("templates/more.html",
    "<ion-view title=\"\" >\n" +
    "	<ion-content ng-controller=\"TabsCtrl\">\n" +
    "	 \n" +
    "        <ion-list>\n" +
    "            <ion-item class=\"item item-icon-left\" href=\"#/tab/newsfeed/channel/me\" >\n" +
    "                 <i class=\"icon ion-person\"></i>\n" +
    "                 Channel\n" +
    "            </ion-item>\n" +
    "            <ion-item  class=\"item item-icon-left\" href=\"#/tab/more/notifications\">\n" +
    "                 <i class=\"icon ion-ios-bell\"></i>\n" +
    "                 Notifications\n" +
    "            </ion-item>\n" +
    "            <ion-item  class=\"item item-icon-left\" ng-click=\"logout()\">\n" +
    "                 <i class=\"icon ion-power\"></i>\n" +
    "                 Logout\n" +
    "            </ion-item>\n" +
    "        </ion-list>\n" +
    "\n" +
    "    </ion-content>\n" +
    "</ion-view>");
  $templateCache.put("templates/register.html",
    "<ion-view title=\"<img src='img/full_logo.png' class='topbar-logo'/>\"  ng-controller=\"RegisterCtrl\" hide-nav-bar=\"true\" class=\"login-bg\">\n" +
    "	<ion-content >\n" +
    "	\n" +
    "        <div class=\"login-header\">\n" +
    "           <div class=\"background-image\"></div>\n" +
    "           <img src=\"img/full_logo_white.png\" class=\"login-logo\"/>\n" +
    "        </div>\n" +
    "\n" +
    "	\n" +
    "        <form ng-submit=\"register()\" class=\"list\">\n" +
    "            <label class=\"item item-input\">\n" +
    "                <span class=\"input-label\">Username</span>\n" +
    "                <input type=\"text\" ng-model=\"data.username\">\n" +
    "            </label>\n" +
    "            <label class=\"item item-input\">\n" +
    "                <span class=\"input-label\">Password</span>\n" +
    "                <input type=\"password\" ng-model=\"data.password\">\n" +
    "            </label>\n" +
    "            <label class=\"item item-input\">\n" +
    "                <span class=\"input-label\">Email</span>\n" +
    "                <input type=\"email\" ng-model=\"data.email\">\n" +
    "            </label>\n" +
    "            \n" +
    "            <label class=\"item item-input\" style=\"padding-bottom:15px\">\n" +
    "                <span class=\"input-label\">Referrer</span>\n" +
    "                <input type=\"text\" ng-model=\"data.referrer\" ng-change=\"searchUsers($event)\" placeholder=\"@channel\">\n" +
    "                <span style=\"font-size: 10px; position: absolute; left: 16px; top: 38px; color: #888;\">We will reward the channel which referred you with 100 points</span>\n" +
    "            </label>\n" +
    "            \n" +
    "            <!-- @todo set our own css class -->\n" +
    "             <div class=\"wallet-users-list\" ng-show=\"searching\" style=\"margin-top:0px\">\n" +
    "               <div ng-repeat=\"user in results\" ng-click=\"selectReferrer(user);\">\n" +
    "                   \n" +
    "                    <img src=\"{{$root.node_url}}icon/{{user.guid}}/small\" />\n" +
    "                     @{{user.username}}\n" +
    "               </div>\n" +
    "           </div>\n" +
    " \n" +
    "            <div class=\"padding\">\n" +
    "            	<div>\n" +
    "					<input id=\"terms\" type=\"checkbox\" checked=\"checked\">\n" +
    "				    <label for=\"terms\">I accept the</label> <a style=\"color:#4690C3; font-weight:bold;text-decoration:none;\" href=\"{{node_url}}p/terms\">Terms and Conditions</a>\n" +
    "				</div>\n" +
    "           	 <input type=\"submit\" class=\"button button-block button-positive\" value=\"Register\" ng-click=\"Register()\"/>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "        \n" +
    "        <div class=\"padding\" style=\"text-align:center;\">\n" +
    "            <a href=\"#/login\" class=\"minds-blue\">Return to login</a>\n" +
    "        </div>\n" +
    "\n" +
    "    </ion-content>\n" +
    "</ion-view>");
  $templateCache.put("templates/tabs.html",
    "<ion-tabs class=\"tabs-striped tabs-bottom tabs-icon-only\" ng-controller=\"TabsCtrl\">\n" +
    "\n" +
    "    <ion-tab title=\"Newsfeed\" icon=\"icon ion-home\" href=\"#/tab/newsfeed\" ng-click=\"onTabSelect('tab.newsfeed')\">\n" +
    "        <ion-nav-view name=\"newsfeed-tab\"></ion-nav-view>\n" +
    "    </ion-tab>\n" +
    "\n" +
    "    <ion-tab title=\"Capture\" icon=\"icon ion-ios-videocam\" href=\"#/tab/capture\" class=\"capture-tab-dep\">\n" +
    "        <ion-nav-view name=\"capture-tab\" styles=\"background: #000 !important; color:#FFF;\"></ion-nav-view>\n" +
    "    </ion-tab>\n" +
    "    \n" +
    "    <ion-tab title=\"Discover\" icon=\"icon ion-search\" href=\"#/tab/discover\">\n" +
    "        <ion-nav-view name=\"discover-tab\"></ion-nav-view>\n" +
    "    </ion-tab>\n" +
    "    \n" +
    "    <ion-tab title=\"Chat\" icon=\"icon ion-chatboxes {{$root.newChat}}\" href=\"#/tab/gatherings/conversations\">\n" +
    "        <ion-nav-view name=\"chat-tab\"></ion-nav-view>\n" +
    "    </ion-tab>\n" +
    "    \n" +
    "	<ion-tab title=\"Notifications\" icon=\"icon ion-ios-bell {{$root.newNotification}}\" href=\"#/tab/notifications\">\n" +
    "        <ion-nav-view name=\"notifications-tab\"></ion-nav-view>\n" +
    "    </ion-tab>\n" +
    "    \n" +
    "    <!--<ion-tab title=\"More\" icon=\"icon ion-navicon\" href=\"#/tab/more/home\" ng-click=\"onTabSelect('tab.more')\">\n" +
    "        <ion-nav-view name=\"more-tab\"></ion-nav-view>\n" +
    "    </ion-tab>-->\n" +
    "\n" +
    "</ion-tabs>");
  $templateCache.put("templates/tutorial.html",
    "<ion-view hide-nav-bar=\"true\" >\n" +
    "	<ion-pane ng-controller=\"TutorialCtrl\" class=\"tutorial\">\n" +
    "	\n" +
    "		\n" +
    "	<ion-slide-box on-slide-changed=\"slideHasChanged($index)\" show-pager=\"true\" does-continue=\"true\" slide-interval=\"3000\" >\n" +
    "	  <ion-slide>\n" +
    "	    <div class=\"bg-splash\"></div>\n" +
    "	    <div class=\"box\" style=\"color:#FFF\">\n" +
    "	    	<img src=\"img/full_logo_white.png\" style=\"text-align:center; width:49%; margin:80px 0 0;\"/>\n" +
    "	    	<h3 style=\"  color: #FFF;font-size: 14px;margin: 10px 0 42px;font-weight: 100 !important;\">Expand your reach.</h3>\n" +
    "	    	<p>Swipe left to begin.</p>\n" +
    "	    	<p style=\"font-size: 10px;padding: 0;line-height: 10px;\">Swipe right to skip tutorial.</p>\n" +
    "	    </div>\n" +
    "	  </ion-slide>\n" +
    "	  \n" +
    "	  <ion-slide>\n" +
    "        <div class=\"box\">\n" +
    "            <h1>Subscribe</h1>\n" +
    "            \n" +
    "            <div class=\"swipe-container\">\n" +
    "                <div class=\"list card tabs-background-white animation-mock-swipe\">\n" +
    "                    <div class=\"item item-image\">\n" +
    "                        <img ng-src=\"http://cdn2.business2community.com/wp-content/uploads/2013/11/albert-einstein.jpg\">\n" +
    "                        <div class=\"overlay\">\n" +
    "                            <h1>{{entity.name}}</h1>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    \n" +
    "                    <div class=\"item tabs tabs-secondary tabs-icon-left\">\n" +
    "                        <a class=\"tab-item\" href=\"#\" ng-click=\"ignore(entity)\">\n" +
    "                            <i class=\"icon ion-close\"></i>\n" +
    "                        </a>\n" +
    "                        <a class=\"tab-item\" href=\"#\" ng-click=\"subscribe(entity)\">\n" +
    "                          <i class=\"icon ion-person-add\"></i> \n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "                        \n" +
    "            <p>Swipe right to subscribe or left to pass. If someone subscribes back you match and can chat.</p>\n" +
    "        </div>\n" +
    "      </ion-slide>\n" +
    "      \n" +
    "      <ion-slide>\n" +
    "            <div class=\"box\">\n" +
    "                <h1>Capture & Share</h1>\n" +
    "                \n" +
    "                \n" +
    "                <div ng-hide=\"captured\" style=\"height:320px\">\n" +
    "               <ion-list class=\"capture-options tutorial\">\n" +
    "                \n" +
    "                   \n" +
    "                    <ion-item >\n" +
    "                        <h1 class=\"icon ion-ios-videocam\"></h1>\n" +
    "                    </ion-item>\n" +
    "                    \n" +
    "                    <ion-item >\n" +
    "                        <h1 class=\"icon ion-camera\"></h1>\n" +
    "                    </ion-item>\n" +
    "                    \n" +
    "                    <ion-item >\n" +
    "                        <h1 class=\"icon ion-compose\"></h1>\n" +
    "                    </ion-item>\n" +
    "                    \n" +
    "                    <ion-item >\n" +
    "                        <h1 class=\"icon ion-upload\"></h1>\n" +
    "                    </ion-item>\n" +
    "        \n" +
    "                </ion-list>\n" +
    "            </div>\n" +
    "            <br/>\n" +
    "            <p>Share great moments and ideas.</p>\n" +
    "            \n" +
    "        </div>\n" +
    "      </ion-slide>\n" +
    "	  \n" +
    "	  <ion-slide>\n" +
    "	    <div class=\"box\">\n" +
    "	    	<h1>News</h1>\n" +
    "	    	\n" +
    "	    	<div class=\"list card activity-item\" ng-repeat=\"story in news\">\n" +
    "	    	   <a class=\"item item-avatar\">\n" +
    "                    <img image-cache ng-src=\"{{node_url}}icon/{{story.guid}}/small\"/>\n" +
    "            \n" +
    "                    <h2 style=\"font-weight:400;\">{{story.user}}</h2>\n" +
    "                    <p>now</p>\n" +
    "                   \n" +
    "                </a>\n" +
    "                \n" +
    "                <div class=\"item item-text-wrap\" >\n" +
    "                    <p class=\"wrap\">{{story.message}} </p>\n" +
    "                </div>\n" +
    "                \n" +
    "                <div class=\"item tabs tabs-secondary tabs-icon-left\" style=\"padding:0;background-color:#F7F7F7 !important;\">\n" +
    "                    <a class=\"tab-item small-font thumbs-up\">\n" +
    "                           <i style=\"padding-left:4px;\" class=\"icon ion-thumbsup\"></i>\n" +
    "                    </a>\n" +
    "                    <a class=\"tab-item small-font thumbs-down\">\n" +
    "                        <i class=\"icon ion-thumbsdown\"></i>\n" +
    "                    </a>\n" +
    "                    <a class=\"tab-item  small-font\">\n" +
    "                        <i class=\"icon ion-chatbox\"></i>\n" +
    "                    </a>\n" +
    "                    <a class=\"tab-item small-font\">\n" +
    "                        <i class=\"icon icon-remind\"></i>\n" +
    "                    </a>\n" +
    "                    <a class=\"tab-item small-font\">\n" +
    "                        <i class=\"icon ion-more\"></i>\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "	    	</div>\n" +
    "    	\n" +
    "	    	\n" +
    "	    </div>\n" +
    "	  </ion-slide>\n" +
    "	  \n" +
    "	   \n" +
    "	  \n" +
    "	  <ion-slide>\n" +
    "        <div class=\"box\">\n" +
    "            <h1>Discover</h1>\n" +
    "            \n" +
    "            <div class=\"swipe-container\">\n" +
    "                <div class=\"list card tabs-background-white animation-mock-swipe\">\n" +
    "                    <div class=\"item item-image\">\n" +
    "                        <img ng-src=\"http://upload.wikimedia.org/wikipedia/commons/a/a2/Main_stage_crowd_shot.jpg\">\n" +
    "                        <div class=\"overlay\">\n" +
    "                            <h1>Minds</h1>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    \n" +
    "                    <div class=\"item tabs tabs-secondary tabs-icon-left\">\n" +
    "                        <a class=\"tab-item discover-button discover-button-pass\" href=\"#\">\n" +
    "                            <i class=\"icon\">Pass</i>\n" +
    "                        </a>\n" +
    "                        <a class=\"tab-item discover-button discover-button-down\" href=\"#\">\n" +
    "                            <i class=\"icon ion-thumbsdown\"></i>\n" +
    "                        </a>\n" +
    "                        <a class=\"tab-item discover-button discover-button-up\" href=\"#\" >\n" +
    "                          <i class=\"icon ion-thumbsup\"></i>\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "                        \n" +
    "            <p>Vote to make trends. </p>\n" +
    "        </div>\n" +
    "      </ion-slide>\n" +
    "      \n" +
    "      <ion-slide>\n" +
    "        <div class=\"box\">\n" +
    "            <h1>Encrypted Chat</h1>\n" +
    "            \n" +
    "            <ion-list>\n" +
    "                <ion-item  class=\"message\" type=\"item-text-wrap\">\n" +
    "                    <img ng-src=\"{{$root.node_url}}icon/134/small\"/>\n" +
    "                \n" +
    "                     <div class=\"message-content\">\n" +
    "                        Hello.\n" +
    "                     </div>\n" +
    "               \n" +
    "                </ion-item>\n" +
    "                <ion-item  class=\"message message-right\" type=\"item-text-wrap\">\n" +
    "                    <img ng-src=\"{{$root.node_url}}icon/341/small\"/>\n" +
    "                \n" +
    "                     <div class=\"message-content\">\n" +
    "                        Hey!\n" +
    "                     </div>\n" +
    "               \n" +
    "                </ion-item>\n" +
    "                <ion-item  class=\"message\" type=\"item-text-wrap\">\n" +
    "                    <img ng-src=\"{{$root.node_url}}icon/134/small\"/>\n" +
    "                \n" +
    "                     <div class=\"message-content item-text-wrap\">\n" +
    "                        It's great how we can chat without being spied on\n" +
    "                     </div>\n" +
    "               \n" +
    "                </ion-item>\n" +
    "                <ion-item  class=\"message message-right\" type=\"item-text-wrap\">\n" +
    "                    <img ng-src=\"{{$root.node_url}}icon/341/small\"/>\n" +
    "                \n" +
    "                     <div class=\"message-content item-text-wrap\">\n" +
    "                        Yeah! And the app is free and open-source too\n" +
    "                     </div>\n" +
    "               \n" +
    "                </ion-item>\n" +
    "            </ion-list>\n" +
    "                        \n" +
    "            <p style=\"margin-top:16px;\">Message securely with matches.</p>\n" +
    "        </div>\n" +
    "      </ion-slide>\n" +
    "	  \n" +
    "	  <ion-slide>\n" +
    "	    <div class=\"box\">\n" +
    "	    	<h1>Points</h1>\n" +
    "	    	\n" +
    "	    	<i class=\"icon icon-bank\"></i>\n" +
    "	    	\n" +
    "	    	<div style=\"width: 100%; text-align: center;\">\n" +
    "	    	  <i style=\"font-size: 53px; line-height: 78px; color: green; font-weight: bold;\">+1</i>\n" +
    "	    	</div>\n" +
    "	    	\n" +
    "	    	<p> Earn points for every vote, comment, remind, swipe, post and upload. </p>\n" +
    "	    	\n" +
    "	    </div>\n" +
    "	  </ion-slide>\n" +
    "	  \n" +
    "	  <ion-slide>\n" +
    "        <div class=\"box\">\n" +
    "            <h1>Boost</h1>\n" +
    "            \n" +
    "            <i class=\"icon ion-arrow-graph-up-right minds-blue\"></i>\n" +
    "            \n" +
    "            <a style=\"background:#4690C3; padding:12px 16px; color:#FFF; margin:12px auto; display:block; border-radius:3px; width:120px;\">Boost</a>\n" +
    "            \n" +
    "            <p>Use your points to go viral by boosting to the news feed or other channels.</p>\n" +
    "            \n" +
    "        </div>\n" +
    "      </ion-slide>\n" +
    "      \n" +
    "      <ion-slide>\n" +
    "        <div class=\"box\">\n" +
    "            \n" +
    "        </div>\n" +
    "      </ion-slide>\n" +
    "	</ion-slide-box>\n" +
    "\n" +
    "    </ion-pane>\n" +
    "</ion-view>");
  $templateCache.put("templates/capture/default.html",
    "<ion-view title=\"Capture\" class=\"white-bg\" ng-controller=\"CaptureCtrl\">\n" +
    "	\n" +
    "	<ion-content>\n" +
    "	\n" +
    "    	<div ng-hide=\"captured\">\n" +
    "    	   <ion-list class=\"capture-options\">\n" +
    "            \n" +
    "               \n" +
    "                <ion-item ng-click=\"video()\">\n" +
    "                    <h1 class=\"icon ion-ios-videocam\"></h1>\n" +
    "                </ion-item>\n" +
    "                \n" +
    "                <ion-item ng-click=\"photo()\">\n" +
    "                    <h1 class=\"icon ion-camera\"></h1>\n" +
    "                </ion-item>\n" +
    "                \n" +
    "                <ion-item ng-click=\"activity()\">\n" +
    "                    <h1 class=\"icon ion-compose\"></h1>\n" +
    "                </ion-item>\n" +
    "                \n" +
    "                <ion-item ng-click=\"library()\">\n" +
    "                    <h1 class=\"icon ion-upload\"></h1>\n" +
    "                </ion-item>\n" +
    "    \n" +
    "            </ion-list>\n" +
    "        </div>\n" +
    "        \n" +
    "            <div ng-show=\"captured\">   \n" +
    "            <form >\n" +
    "                 \n" +
    "               <progress max=\"100\" value=\"{{progress}}\"> </progress>\n" +
    "               <div class=\"list\">\n" +
    "                  <label class=\"item item-input item-stacked-label\">\n" +
    "                    <span class=\"input-label\">Title</span>\n" +
    "                    <input type=\"text\" placeholder=\"Title\" ng-model=\"form.title\">\n" +
    "                  </label>\n" +
    "                 <!-- <label class=\"item item-input item-stacked-label\">\n" +
    "                    <span class=\"input-label\">Description</span>\n" +
    "                    <textarea placeholder=\"Description\" ng-model=\"form.description\"></textarea>\n" +
    "                  </label>-->\n" +
    "                   <label class=\"item item-input item-select\">\n" +
    "	                    <span class=\"input-label\">License</span>\n" +
    "	                    <select ng-model=\"form.license\">\n" +
    "	                    	<option value=\"allrightsreserved\">All rights reserved</option>\n" +
    "	                    	<option value=\"attribution-cc\">Creative commons (Attribution)</option>\n" +
    "	                    </select>\n" +
    "                  </label>\n" +
    "                  \n" +
    "                   <br/>\n" +
    "                  \n" +
    "                  <div class=\"social-options\">\n" +
    "                    <div class=\"facebook\" ng-class=\"{'minds-blue': form.facebook}\" ng-click=\"fb()\" ng-show=\"type == 'image'\">\n" +
    "                        <i class=\"icon ion-social-facebook\"></i> Facebook\n" +
    "                    </div>\n" +
    "                    <div class=\"twitter\" ng-class=\"{'minds-blue': form.twitter}\"  ng-click=\"twitter()\">\n" +
    "                        <i class=\"icon ion-social-twitter\" ></i> Twitter\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                 \n" +
    "                  <div ng-if=\"guid\">\n" +
    "                    <input type=\"submit\" class=\"button button-block button-positive\" value=\"Save\" ng-click=\"save()\" style=\"width=100%\"/>\n" +
    "                  </div>\n" +
    "                  \n" +
    "                  <p style=\"padding:16px; color:#666;\">\n" +
    "                    By uploading this content you confirm that you have the right to distribute this content under the selected license.\n" +
    "                  </p>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "\n" +
    "        </div>\n" +
    "       \n" +
    "	</ion-content>\n" +
    "\n" +
    "</ion-view>");
  $templateCache.put("templates/capture/status.html",
    "<ion-modal-view class=\"view-bg\">\n" +
    "	\n" +
    "\n" +
    "	<ion-header-bar>\n" +
    "		<div class=\"buttons\">\n" +
    "	    	<button class=\"button button-clear\" ng-click=\"modal.remove()\">Cancel</button>\n" +
    "	 	 </div>\n" +
    "	  	<h1 class=\"title\">Status Post</h1>\n" +
    "	  	<div class=\"buttons\">\n" +
    "	    	<button class=\"button button-clear minds-blue\" style=\"color:#4690C3\" ng-click=\"postStatus()\">Post</button>\n" +
    "	 	 </div>\n" +
    "	</ion-header-bar>\n" +
    "	\n" +
    "	<ion-pane style=\"margin-top:50px\">\n" +
    "	\n" +
    "		 <form ng-submit=\"postStatus()\">\n" +
    "            <textarea placeholder=\"Enter a message here...\" ng-model=\"form.status\" ng-change=\"getStatusPreview()\" style=\"width:100%; padding:32px 16px;\">\n" +
    "            </textarea>\n" +
    "            \n" +
    "            <div class=\"social-options\">\n" +
    "                <div class=\"facebook\" ng-class=\"{'minds-blue': form.facebook}\" ng-click=\"fb()\">\n" +
    "                    <i class=\"icon ion-social-facebook\"></i> Facebook\n" +
    "                </div>\n" +
    "                <div class=\"twitter\" ng-class=\"{'minds-blue': form.twitter}\"  ng-click=\"twitter()\">\n" +
    "                    <i class=\"icon ion-social-twitter\" ></i> Twitter\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            \n" +
    "            <div class=\"rich-embed\" ng-show=\"form.meta\">\n" +
    "            \n" +
    "            	<img ng-src=\"{{form.thumbnail}}\" />	\n" +
    "            	<h3>{{form.meta.title}}</h3>\n" +
    "            	<p>{{form.meta.description}}</p>\n" +
    "            	\n" +
    "            </div>\n" +
    "            \n" +
    "            \n" +
    "            \n" +
    "            <input type=\"submit\" value=\"Post\" class=\"button button-positive ion-paper-airplane-hide\" style=\"float:right; margin-top:10px; margin-right:10px;\"/>\n" +
    "        </form>\n" +
    "	\n" +
    "	</ion-pane>\n" +
    "</ion-modal-view>");
  $templateCache.put("templates/channels/channel.html",
    "<ion-view title=\"Channel\" ng-controller=\"ChannelCtrl\" hide-nav-bar=\"true\">\n" +
    "\n" +
    "    <div class=\"carousel {{carousel_class}}\">      \n" +
    "      <ion-slide-box auto-play=\"true\" does-continue=\"true\" slide-interval=\"3000\" delegate-handle=\"channel-banners\" show-pager=\"false\">\n" +
    "       \n" +
    "          <ion-slide ng-repeat=\"carousel in channel.carousels\">\n" +
    "            <div class=\"box blue\">\n" +
    "                <img image-cache ng-src=\"{{carousel.src}}\"/>\n" +
    "            </div>\n" +
    "          </ion-slide>\n" +
    "        </ion-slide-box>\n" +
    "    </div>\n" +
    "\n" +
    "    <ion-content class=\"channel-content\">\n" +
    "        \n" +
    "        <a ng-if=\"channel.guid == $root.user_guid && !channel.carousels\"style=\"position: absolute;width: 100%;top: -65px; padding:12px; left: 0;font-weight: bold; color:#333; text-align:center; text-decoration:none; z-index:9999;\" href=\"#/tab/newsfeed/channel/{{channel.guid}}/edit\">Add banner in settings</a>\n" +
    "    \n" +
    "    	<div class=\"loading\">\n" +
    "			<i class=\"icon ion-loading-d\" ng-if=\"!channel.name\"></i>\n" +
    "		</div>\n" +
    "    \n" +
    "        <div class=\"inner\">\n" +
    "\n" +
    "			<div class=\"cell\">\n" +
    "           		<img image-cache ng-src=\"{{channel.avatar_url.large}}/{{$root.globalCB}}\"/>\n" +
    "            </div>\n" +
    "            <div class=\"cell\">\n" +
    "	            <h1 ng-bind-html=\"channel.name\"></h1>\n" +
    "	            <p ng-show=\"channel.briefdescription\" class=\"wrap\" style=\"width:85% color:#FFF; font-size:11px;\" ng-bind-html=\"channel.briefdescription\"></p>\n" +
    "            </div>\n" +
    "        \n" +
    "        </div>\n" +
    "        \n" +
    "        <div class=\"view-bg\" ng-controller=\"NewsfeedCtrl\">\n" +
    "        	<div class=\"item tabs tabs-secondary tabs-icon-left\" style=\"padding:0;background-color:#F7F7F7 !important;\">\n" +
    "		        <a class=\"tab-item small-font \" href=\"#/tab/newsfeed/channel/{{channel.guid}}/subscribers\" >\n" +
    "		        	<span style=\"width: 100%; display: block; font-size:11px; height: 11px; vertical-align: middle; line-height: 36px;\">Subscribers</span>\n" +
    "		        	<!--<i class=\"icon ion-person-stalker\"></i> -->\n" +
    "		        	<b>{{channel.subscribers_count}}</b>\n" +
    "		        </a>\n" +
    "		        <a class=\"tab-item small-font \" href=\"#/tab/newsfeed/channel/{{channel.guid}}/subscriptions\" >\n" +
    "		        	<span style=\"width: 100%; display: block; font-size:11px; height: 11px; vertical-align: middle; line-height: 36px;\">Subscriptions</span>\n" +
    "		        	<!--<i class=\"icon ion-person-stalker\"></i> -->\n" +
    "		        	<b>{{channel.subscriptions_count}}</b>\n" +
    "		        </a>\n" +
    "		         <a class=\"tab-item small-font \" >\n" +
    "                    <span style=\"width: 100%; display: block; font-size:11px; height: 11px; vertical-align: middle; line-height: 36px;\">Views</span>\n" +
    "                    <!--<i class=\"icon ion-person-stalker\"></i> -->\n" +
    "                    <b>{{channel.impressions}}</b>\n" +
    "                </a>\n" +
    "		        \n" +
    "		      \n" +
    "		        <a class=\"tab-item small-font\" href=\"#/tab/newsfeed/channel/{{channel.guid}}/edit\" ng-if=\"channel.guid == $root.user_guid\" style=\"min-width:112px\">\n" +
    "		            <i class=\"icon ion-more\"></i> Settings\n" +
    "		        </a>\n" +
    "		        \n" +
    "		        <a class=\"tab-item small-font\" ng-click=\"subscribe(channel)\" ng-if=\"channel.guid != $root.user_guid && channel.subscribed == false\" style=\"min-width:112px\">\n" +
    "		            <i class=\"icon ion-person-add\"></i> Subscribe\n" +
    "		        </a>\n" +
    "		        <a class=\"tab-item small-font minds-blue\" style=\"color:#4690C3 !important; min-width:112px;\" ng-click=\"unSubscribe(channel)\" ng-if=\"channel.guid != $root.user_guid && channel.subscribed == true\">\n" +
    "		            <i class=\"icon ion-person-add\"></i> Subscribed\n" +
    "		        </a>\n" +
    "		        \n" +
    "		    </div>\n" +
    "	        <ion-list style=\"min-height:600px;\">\n" +
    "	        \n" +
    "	           <a style=\"text-align:center; font-weight:200; padding-top:50px; display:block; color:#333; text-decoration: none;\" ng-if=\"channel.guid == $root.user_guid && ChannelItems.length == 0 && loaded == true\" href=\"#/tab/capture\">\n" +
    "                <img src=\"img/logo-transparent.png\" class=\"loading-bulb-glow\"/> <br/>\n" +
    "                Your wall is empty! Click to upload content.\n" +
    "             </a>\n" +
    "	        \n" +
    "                <ion-refresher\n" +
    "                    pulling-text=\"Pull to refresh...\"\n" +
    "                    on-refresh=\"channelRefresh()\">\n" +
    "                </ion-refresher>\n" +
    "    	\n" +
    "	            <activity-view ng-repeat=\"activity in ChannelItems\" class=\"activity-item list card item-text-wrap\">\n" +
    "	            </activity-view>\n" +
    "	\n" +
    "	        </ion-list>\n" +
    "        </div>\n" +
    "        \n" +
    "        <ion-infinite-scroll \n" +
    "            on-infinite=\"loadMore()\" \n" +
    "            distance=\"5%\" \n" +
    "            ng-if=\"hasMoreData\">\n" +
    "\n" +
    "        </ion-infinite-scroll>\n" +
    "       \n" +
    "    </ion-content>\n" +
    "</ion-view>");
  $templateCache.put("templates/channels/edit.html",
    "<ion-view title=\"Settings\" ng-controller=\"ChannelEditCtrl\">\n" +
    "\n" +
    "	<ion-nav-buttons side=\"left\">\n" +
    "        <a class=\"button button-clear icon ion-arrow-left-b\" href=\"#/tab/newsfeed/channel/me\"></a>\n" +
    "    </ion-nav-buttons>\n" +
    "    <ion-nav-buttons side=\"right\">\n" +
    "        <a class=\"button button-clear minds-blue\"  style=\"color:#4690C3\"  ng-click=\"update(true)\">Save</a>\n" +
    "    </ion-nav-buttons>\n" +
    "\n" +
    "    <ion-content>\n" +
    "    \n" +
    "    	<div class=\"list\">\n" +
    "			<label class=\"item item-input\">\n" +
    "                <span class=\"input-label\">Name</span>\n" +
    "                <input type=\"text\" ng-model=\"channel.name\">\n" +
    "            </label>\n" +
    "            <label class=\"item item-input\">\n" +
    "                <span class=\"input-label\">Bio</span>\n" +
    "                <input type=\"text\" ng-model=\"channel.briefdescription\">\n" +
    "            </label>\n" +
    "            <label class=\"item item-input\">\n" +
    "                <span class=\"input-label\">City</span>\n" +
    "                <input type=\"text\" ng-model=\"channel.city\" ng-change=\"autoSearchLocation()\">\n" +
    "            </label>\n" +
    "            \n" +
    "            <div class=\"suggested-location-list\">\n" +
    "               <div ng-repeat=\"location in cities\" ng-click=\"selectSuggestedLocation(location)\" ng-if=\"location.address.city || location.address.town\">\n" +
    "                   \n" +
    "                   {{location.address.town}}{{location.address.city}}, {{location.address.state}}\n" +
    "                    \n" +
    "               </div>\n" +
    "           </div>\n" +
    "            \n" +
    "            <label class=\"item item-input\" ng-click=\"changeAvatar()\">\n" +
    "                <span class=\"input-label\">Avatar</span>\n" +
    "                <img id=\"avatar\" ng-src=\"{{channel.avatar_url.large}}/{{cb}}\" style=\"max-width:60%; min-height:100px; max-height:100px; display:block; margin:auto;\"/>\n" +
    "            </label>\n" +
    "             <label class=\"item item-input\" ng-click=\"addBanner()\">\n" +
    "                <span class=\"input-label\">Add a banner</span>\n" +
    "            </label>\n" +
    "            <label class=\"item item-input\">\n" +
    "            </label>\n" +
    "            <a class=\"item item-input\" ng-click=\"invite()\">\n" +
    "            	<span class=\"input-label\"><i class=\"icon ion-plus-circled\"></i></span>\n" +
    "                 Invite contacts\n" +
    "			</a>\n" +
    "            <a class=\"item item-input\" href=\"mailto:support@minds.com\">\n" +
    "            	<span class=\"input-label\"><i class=\"icon ion-email\"></i></span>\n" +
    "                 Contact / Bug Reports\n" +
    "			</a>\n" +
    "			 <a class=\"item item-input\" href=\"{{node_url}}p/terms\">\n" +
    "            	<span class=\"input-label\"><i class=\"icon ion-ios-paper\"></i></span>\n" +
    "                Terms\n" +
    "			</a>\n" +
    "			<a class=\"item item-input\" href=\"{{node_url}}p/privacy\">\n" +
    "            	<span class=\"input-label\"><i class=\"icon ion-ios-paper\"></i></span>\n" +
    "                Privacy Policy\n" +
    "            </a>\n" +
    "			 <a class=\"item item-input\" href=\"{{node_url}}p/code\">\n" +
    "            	<span class=\"input-label\"><i class=\"icon ion-ios-paper\"></i></span>\n" +
    "                Code\n" +
    "			</a>\n" +
    "			\n" +
    "			<a class=\"item item-input\" ng-click=\"disable()\">\n" +
    "                <span class=\"input-label\"><i class=\"icon ion-alert-circled\"></i></span>\n" +
    "                Cancel channel\n" +
    "            </a>\n" +
    "			\n" +
    "            <label class=\"item item-input\" ng-click=\"logout()\">\n" +
    "            	<span class=\"input-label\"><i class=\"icon ion-power\"></i></span>\n" +
    "                 Logout\n" +
    "			</label>\n" +
    "		</div>\n" +
    "\n" +
    "    </ion-content>\n" +
    "</ion-view>");
  $templateCache.put("templates/channels/subscribers.html",
    "<ion-view title=\"Subscribers\" ng-controller=\"ChannelSubscribersCtrl\">\n" +
    "\n" +
    "	<!--<ion-nav-bar>\n" +
    "	  <ion-nav-back-button>\n" +
    "	  </ion-nav-back-button>\n" +
    "	</ion-nav-bar>-->\n" +
    "	<ion-nav-buttons side=\"left\">\n" +
    "        <a class=\"button button-clear icon ion-arrow-left-b\" href=\"#/tab/newsfeed/channel/{{guid}}\"></a>\n" +
    "    </ion-nav-buttons>\n" +
    "\n" +
    "    <ion-content>\n" +
    "\n" +
    "        <ion-list>\n" +
    "        \n" +
    "            <!--<ion-refresher\n" +
    "                pulling-text=\"Pull to refresh...\"\n" +
    "                on-refresh=\"refresh()\">\n" +
    "            </ion-refresher>-->\n" +
    "            <owner-brief-view owner=\"user\" ng-repeat=\"user in subscribers\" show-subscribe-button=\"true\" >\n" +
    "            	\n" +
    "            </owner-brief-view>\n" +
    "\n" +
    "           \n" +
    "        </ion-list>\n" +
    "        \n" +
    "        <ion-infinite-scroll \n" +
    "            on-infinite=\"loadMore()\" \n" +
    "            distance=\"5%\" \n" +
    "            ng-if=\"hasMoreData\">\n" +
    "        </ion-infinite-scroll>\n" +
    "       \n" +
    "    </ion-content>\n" +
    "</ion-view>");
  $templateCache.put("templates/channels/subscriptions.html",
    "<ion-view title=\"Subscriptions\" ng-controller=\"ChannelSubscriptionsCtrl\">\n" +
    "\n" +
    "	<ion-nav-buttons side=\"left\">\n" +
    "        <a class=\"button button-clear icon ion-arrow-left-b\" href=\"#/tab/newsfeed/channel/{{guid}}\"></a>\n" +
    "    </ion-nav-buttons>\n" +
    "\n" +
    "    <ion-content>\n" +
    "\n" +
    "        <ion-list>\n" +
    "        \n" +
    "            <!--<ion-refresher\n" +
    "                pulling-text=\"Pull to refresh...\"\n" +
    "                on-refresh=\"refresh()\">\n" +
    "            </ion-refresher>-->\n" +
    "            <owner-brief-view owner=\"user\" ng-repeat=\"user in subscriptions\" show-subscribe-button=\"true\">\n" +
    "            	\n" +
    "            </owner-brief-view>\n" +
    "\n" +
    "           \n" +
    "        </ion-list>\n" +
    "        \n" +
    "        <ion-infinite-scroll \n" +
    "            on-infinite=\"loadMore()\" \n" +
    "            distance=\"5%\" \n" +
    "            ng-if=\"hasMoreData\">\n" +
    "        </ion-infinite-scroll>\n" +
    "       \n" +
    "    </ion-content>\n" +
    "</ion-view>");
  $templateCache.put("templates/comments/list.html",
    "<ion-popover-view>\n" +
    "\n" +
    "    <ion-content> \n" +
    "        <ion-list>\n" +
    "        \n" +
    "            <!--<ion-refresher\n" +
    "                pulling-text=\"Pull to refresh...\"\n" +
    "                on-refresh=\"refresh()\">\n" +
    "            </ion-refresher>-->\n" +
    "\n" +
    "            <ion-item ng-repeat=\"comment in commentsData\" class=\"item-wrap-content\" id=\"{{comment.guid}}\" >\n" +
    "                {{comment.ownerObj.name}}: {{comment.description}}\n" +
    "            </ion-item>\n" +
    "\n" +
    "        </ion-list>\n" +
    "        \n" +
    "        <form ng-submit=\"postComment()\">\n" +
    "            <input type=\"text\" placeholder=\"type your comment here\" autofocus />\n" +
    "            \n" +
    "        </form>\n" +
    "        \n" +
    "    </ion-content>\n" +
    "</ion-popover-view>");
  $templateCache.put("templates/directives/activity.html",
    "<owner-brief-view owner=\"::activity.ownerObj\" ts=\"::activity.time_created\" show-more-button=\"::(!hideMoreButton)\" open-actions=\"openActions(activity)\"></owner-brief-view>\n" +
    "    \n" +
    "    <div class=\"item item-text-wrap\" ng-if=\"::activity.message\">\n" +
    "        <p ng-bind-html=\"::activity.message | linky\" class=\"wrap\" style=\"white-space: pre-line;\"></p>\n" +
    "    </div>\n" +
    "    \n" +
    "    <div class=\"item item-text-wrap\" ng-if=\"::(activity.title && !activity.perma_url)\">\n" +
    "        <p ng-bind-html=\"::activity.title | linky\" class=\"wrap\"></p>\n" +
    "    </div>\n" +
    "    \n" +
    "    <!--Rich content -->\n" +
    "\n" +
    "    <div class=\"item item-image allow-select\" ng-if=\"::activity.thumbnail_src\" ng-click=\"openUrl(activity.perma_url)\">\n" +
    "        <img ng-src=\"{{::activity.thumbnail_src}}\"  onerror=\"this.src='img/img-placeholder.png'\">\n" +
    "    </div>\n" +
    "    \n" +
    "    <!-- Custom type:: batch -->\n" +
    "    <div class=\"item item-image allow-select\" ng-if=\"::activity.custom_type == 'batch'\">\n" +
    "        <img ng-src=\"{{::activity.custom_data[0].src}}\" onerror=\"this.src='img/img-placeholder.png'\" style=\"width:100%\">\n" +
    "    </div>\n" +
    "    \n" +
    "    <!-- Custom type:: video -->\n" +
    "    <div class=\"item item-image item-image-video\" ng-if=\"::activity.custom_type == 'video'\" play-video playsrc=\"{{node_url}}api/v1/archive/{{::activity.custom_data.guid}}/play\">\n" +
    "              \n" +
    "         <img ng-src=\"{{::activity.custom_data.thumbnail_src}}\" onerror=\"this.src='img/img-placeholder.png'\">\n" +
    "         <i class=\"icon ion-play\"></i>\n" +
    "         \n" +
    "          <video id=\"video\" ng-show=\"showVideo\" width=\"300px\" height=\"300px;\" style=\"background:#000;\" preload=\"auto\" loop controls></video>\n" +
    "         \n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"item item-text-wrap remind\" ng-if=\"::activity.remind_object\">\n" +
    "        <div>\n" +
    "            <remind-view activity=\"::activity.remind_object\"></remind-view>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "	<div class=\"rich-embed-output item item-text-wrap\" ng-if=\"::(activity.title && activity.perma_url)\" ng-click=\"::activity.perma_url ? openUrl(activity.perma_url) : false\">\n" +
    "        <h3 ng-bind-html=\"::activity.title | linky\"></h3>\n" +
    "        <p ng-if=\"::activity.perma_url\">{{::activity.perma_url | domain}}</p>\n" +
    "    </div>\n" +
    "    \n" +
    "    <div class=\"boosted-bar\" ng-if=\"::activity.boosted\">\n" +
    "        <i class=\"icon ion-arrow-graph-up-right\"></i> Boosted\n" +
    "    </div>\n" +
    "    \n" +
    "    <div class=\"item tabs tabs-secondary tabs-icon-left\" style=\"padding:0;background-color:#F7F7F7 !important;\" ng-if=\"::(!hideTabs)\">\n" +
    "        <a class=\"tab-item small-font thumbs-up\" ng-click=\"thumbsUp(activity.guid)\" thumbs=\"{{activity['thumbs:up:user_guids']}}\">\n" +
    "            <i style=\"padding-left:4px;\" class=\"icon ion-thumbsup\"></i>\n" +
    "            <b ng-if=\"::activity['thumbs:up:count']\" style=\"font-size:14px; padding:2px 0 0\">({{activity['thumbs:up:count']}})</b> \n" +
    "        </a>\n" +
    "        <a class=\"tab-item small-font thumbs-down\" ng-click=\"thumbsDown(activity.guid)\" thumbs=\"{{activity['thumbs:down:user_guids']}}\">\n" +
    "            <i class=\"icon ion-thumbsdown\"></i>\n" +
    "            <b ng-if=\"::activity['thumbs:down:count']\" style=\"font-size:14px; padding:2px 0 0\">({{activity['thumbs:down:count']}})</b> \n" +
    "        </a>\n" +
    "        <a class=\"tab-item  small-font\" href=\"#/tab/newsfeed/{{activity.guid}}\">\n" +
    "            <i class=\"icon ion-chatbox\"></i>\n" +
    "        </a>\n" +
    "        \n" +
    "        <a class=\"tab-item small-font\" ng-click=\"remind(activity)\">\n" +
    "            <i class=\"icon icon-remind\"></i>\n" +
    "            <b ng-show=\"::activity.reminds > 0\" style=\"font-size:14px; padding:2px 0 0\">({{::activity.reminds}})</b> \n" +
    "        </a>\n" +
    "        \n" +
    "        <a class=\"tab-item small-font\" ng-click=\"boost(activity)\" style=\"opacity:1;\" ng-if=\"::activity.owner_guid == $root.user_guid\">\n" +
    "           <span style=\"color: #FFF;font-weight: 800;background: #4690C3;padding: 6px 8px;border-radius: 3px;\">Boost</span>\n" +
    "        </a>\n" +
    "        \n" +
    "        <!--<a class=\"tab-item small-font\" ng-click=\"openActions(activity)\">\n" +
    "            <i class=\"icon ion-more\"></i>\n" +
    "        </a>-->\n" +
    "        \n" +
    "        <span class=\"impressions-tag\">{{::activity.impressions}} views</span>\n" +
    "    </div>");
  $templateCache.put("templates/directives/owner-brief.html",
    "<a class=\"item item-avatar\" href=\"#/tab/newsfeed/channel/{{::owner.guid}}\">\n" +
    "    <img image-cache ng-src=\"{{node_url}}icon/{{::owner.guid}}/small\"/>\n" +
    "    \n" +
    "    \n" +
    "     <i class=\"icon ion-person-add channel-user-subscribe\" \n" +
    "			ng-if=\"owner.subscribed == false && showSubscribeButton\"\n" +
    "			ng-click=\"$event.preventDefault(); subscribe()\"> </i>\n" +
    "			\n" +
    "    <i class=\"icon ion-android-cancel channel-user-subscribe\" ng-if=\"owner.subscribed == true && showSubscribeButton\"\n" +
    "            ng-click=\"$event.preventDefault(); unSubscribe()\"> </i>\n" +
    "\n" +
    "    <i class=\"icon ion-android-more-vertical owner-brief-more\" ng-if=\"showMoreButton\" style=\"font-size: 45px;color: #999;padding: 14px 26px;position: absolute;right: 0;top: 0;\" ng-click=\"$event.preventDefault(); openActions()\"></i>\n" +
    "    \n" +
    "    <h2 style=\"font-weight:400;\" ng-bind-html=\"::owner.name\"></h2>\n" +
    "    <p ng-bind=\"::ts\"></p>\n" +
    "   \n" +
    "</a>");
  $templateCache.put("templates/discover/entities/object.html",
    "<owner-brief-view owner=\"::entity.ownerObj\" ts=\"::entity.time_created\" show-more-button=\"true\" open-actions=\"openActions(entity)\"></owner-brief-view>\n" +
    "\n" +
    "<!-- Video -->\n" +
    "<div class=\"item item-image item-image-video\" ng-if=\"entity.subtype == 'video' || entity.subtype == 'audio'\" play-video playsrc=\"{{entity.src['360.mp4']}}\">\n" +
    "          \n" +
    "	<img ng-src=\"{{entity.thumbnail_src}}\" onerror=\"this.src='img/img-placeholder.png'\">\n" +
    "     <i class=\"icon ion-play\"></i>\n" +
    "     <div class=\"overlay\">\n" +
    "    	<h2  ng-bind-html=\"entity.title\"></h2>\n" +
    "     </div>\n" +
    "\n" +
    "     <video id=\"video\" ng-show=\"showVideo\" width=\"100%\" height=\"100%\" style=\"background:#000;\" loop preload=\"auto\"></video>\n" +
    "     \n" +
    "</div>\n" +
    "\n" +
    "<!-- Image -->\n" +
    "<div class=\"item item-image allow-select\" ng-if=\"entity.subtype == 'image'\">\n" +
    "    <div class=\"overlay\">\n" +
    "        <h2  ng-bind-html=\"entity.title\"></h2>\n" +
    "     </div>\n" +
    "   <img ng-src=\"{{entity.thumbnail_src}}\">\n" +
    "</div>\n" +
    "\n" +
    "<!-- Article/blog -->\n" +
    "<div class=\"item item-image\" ng-if=\"entity.subtype == 'blog'\" ng-click=\"openUrl(entity.perma_url)\">\n" +
    "   <img ng-src=\"{{entity.thumbnail_src}}\">\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"item item-wrap-content\" ng-show=\"entity.subtype == 'blog'\" ng-click=\"openUrl(entity.perma_url)\">\n" +
    "   <h3 ng-bind-html=\"entity.title\"></h3>\n" +
    "   <p>{{entity.perma_url}}</p>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"boosted-bar\" ng-show=\"entity.boosted\">\n" +
    "    <i class=\"icon ion-arrow-graph-up-right\"></i> Boosted\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"item tabs tabs-secondary tabs-icon-left\">\n" +
    "	<a class=\"tab-item discover-button discover-button-pass\" href=\"#\" ng-click=\"pass(entity)\">\n" +
    "		<i class=\"icon\">Pass</i> <b  style=\"font-size:14px; padding:2px 0 0\" ng-if=\"entity['thumbs:pass:count'] > 0\">{{entity['thumbs:pass:count']}}</b>\n" +
    "    </a>\n" +
    "    <a class=\"tab-item discover-button discover-button-down\" href=\"#\" ng-click=\"down(entity)\" thumbs=\"{{entity['thumbs:down:user_guids']}}\">\n" +
    "    	<i class=\"icon ion-thumbsdown\"></i>  <b  style=\"font-size:14px; padding:2px 0 0; color:red;\" ng-if=\"entity['thumbs:down:count'] > 0\">{{entity['thumbs:down:count']}}</b>\n" +
    "    </a>\n" +
    "    <a class=\"tab-item discover-button discover-button-up\" href=\"#\" ng-click=\"up(entity)\" thumbs=\"{{entity['thumbs:up:user_guids']}}\">\n" +
    "      <i class=\"icon ion-thumbsup\"></i>  <b  style=\"font-size:14px; padding:2px 0 0\" ng-if=\"entity['thumbs:up:count'] > 0\">{{entity['thumbs:up:count']}}</b>\n" +
    "    </a>\n" +
    "</div>\n" +
    "");
  $templateCache.put("templates/discover/entities/user.html",
    "<a class=\"item item-image item-image-user\" href=\"#/tab/newsfeed/channel/{{entity.guid}}\">\n" +
    "    <img ng-src=\"{{$root.node_url}}icon/{{entity.guid}}/large\">\n" +
    "    <div class=\"overlay\">\n" +
    "    	<h1 ng-bind-html=\"entity.name\"></h1> <span class=\"city\" ng-if=\"entity.city\">{{entity.city}}</span>\n" +
    "    	<p ng-show=\"entity.briefdescription\" ng-bind-html=\"entity.briefdescription\" style=\"margin-top:-4px\"></p>\n" +
    "    </div>\n" +
    "</a>\n" +
    "\n" +
    "<div class=\"boosted-bar\" ng-show=\"entity.boosted\">\n" +
    "    <i class=\"icon ion-arrow-graph-up-right\"></i> Boosted\n" +
    "</div>\n" +
    "    \n" +
    "<div class=\"item tabs tabs-secondary tabs-icon-left\">\n" +
    "    <a class=\"tab-item discover-button discover-button-no\" href=\"#\" ng-click=\"ignore(entity)\">\n" +
    "		<i class=\"icon ion-close\"></i>\n" +
    "    </a>\n" +
    "    <a class=\"tab-item small-font discover-button discover-button-subscribe\" ng-if=\"!entity.subscribed\" href=\"#\" ng-click=\"subscribe(entity)\">\n" +
    "      <i class=\"icon ion-person-add\"></i> <b>{{entity.subscribers_count}}</b>\n" +
    "    </a>\n" +
    "    <a class=\"tab-item small-font discover-button discover-button-subscribe\" ng-if=\"entity.subscribed\" href=\"#\" ng-click=\"subscribe(entity)\">\n" +
    "      Un-Subscribe\n" +
    "    </a>\n" +
    "</div>");
  $templateCache.put("templates/discover/list.html",
    "<ion-view ng-controller=\"DiscoverCtrl\" class=\"view-bg\">\n" +
    "\n" +
    "    <ion-nav-title>\n" +
    "       <div class=\"bar bar-header item-input-inset\">\n" +
    "          <label class=\"item-input-wrapper\">\n" +
    "            <i class=\"icon ion-ios-search placeholder-icon\"></i>\n" +
    "            <input type=\"search\" placeholder=\"Search\" ng-model=\"query.string\" ng-keyup=\"search()\">\n" +
    "          </label>\n" +
    "          <button class=\"button button-clear\" ng-show=\"search.q\" style=\"display:none;\">\n" +
    "            Cancel\n" +
    "          </button>\n" +
    "        </div>\n" +
    "    </ion-nav-title>\n" +
    "\n" +
    "    <div class=\"tabs-striped tabs-icon-top tabs-top tabs-background-white tabs-color-light\">\n" +
    "        <div class=\"tabs\">\n" +
    "          \n" +
    "         \n" +
    "          <a class=\"tab-item\" ng-class=\"{active: filter == 'suggested'}\" ng-click=\"changeFilter('suggested')\">\n" +
    "            <i class=\"icon ion-shuffle\"></i>\n" +
    "            Suggested\n" +
    "          </a>\n" +
    "          <a class=\"tab-item\" ng-class=\"{active: filter == 'trending'}\" ng-click=\"changeFilter('trending')\">\n" +
    "            <i class=\"icon ion-arrow-graph-up-right\"></i>\n" +
    "            Trending\n" +
    "          </a>\n" +
    "          <a class=\"tab-item\" ng-class=\"{active: filter == 'featured'}\" ng-click=\"changeFilter('featured')\">\n" +
    "            <i class=\"icon ion-star\"></i>\n" +
    "            Featured\n" +
    "          </a>\n" +
    "          <a class=\"tab-item\" ng-class=\"{active: type == 'video'}\" ng-click=\"changeType('video')\" style=\"border-left:1px solid #EEE !important;\">\n" +
    "            <i class=\"icon ion-ios-videocam\"></i>\n" +
    "            Videos\n" +
    "          </a>\n" +
    "          <a class=\"tab-item\" ng-class=\"{active: type == 'image'}\" ng-click=\"changeType('image')\">\n" +
    "            <i class=\"icon ion-image\"></i>\n" +
    "            Images\n" +
    "          </a>\n" +
    "           <a class=\"tab-item\" ng-class=\"{active: type == 'channel'}\" ng-click=\"changeType('channel')\">\n" +
    "            <i class=\"icon ion-person-stalker\"></i>\n" +
    "            Directory\n" +
    "          </a>\n" +
    "    \n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Scroll view -->\n" +
    "    <ion-content class=\"forced-scroll\" style=\"padding-top:80px\">\n" +
    "            \n" +
    "            <div ng-show=\"entities.length == 0\" style=\"text-align:center; font-weight:200; padding-top:50px;\">\n" +
    "                <img src=\"img/logo-transparent.png\" class=\"loading-bulb-glow\"/> <br/>\n" +
    "                Discovering..\n" +
    "            </div>\n" +
    "    \n" +
    "            <div ng-repeat=\"entity in entities\" class=\"swipe-container\" ng-if=\"filter != 'suggested'\">\n" +
    "            \n" +
    "                <div ng-switch=\"entity.type\">\n" +
    "                \n" +
    "                    <!-- Objects -->\n" +
    "                    <div ng-switch-when=\"object\">\n" +
    "                        <div class=\"list card tabs-background-white {{entity.subtype}}\" ng-include src=\"'templates/discover/entities/object.html'\" swipe swipe-disable-vertical=\"true\" swipe-on-down=\"down(entity)\" swipe-on-left=\"pass(entity)\" swipe-on-right=\"up(entity)\"></div>\n" +
    "                    </div>\n" +
    "                    \n" +
    "                    <!-- USERS -->\n" +
    "                    <div ng-switch-when=\"user\">\n" +
    "                        <div class=\"list card tabs-background-white\" ng-include src=\"'templates/discover/entities/user.html'\" swipe swipe-disable-vertical=\"true\" swipe-on-left=\"ignore(entity)\" swipe-on-right=\"subscribe(entity)\"></div>\n" +
    "                   \n" +
    "                         <div class=\"boost-tab\" style=\"margin-top:12px\">\n" +
    "                            <i class=\"icon ion-more\" ng-click=\"openActions(entity)\"></i>\n" +
    "                        </div>\n" +
    "                   </div>\n" +
    "                    \n" +
    "                </div>\n" +
    "            </div>\n" +
    "            \n" +
    "            <ion-infinite-scroll \n" +
    "                on-infinite=\"load()\" \n" +
    "                distance=\"1%\" \n" +
    "                ng-if=\"entities.length > 0 && hasMoreData == true && filter != 'search' && filter != 'suggested'\">\n" +
    "        \n" +
    "            </ion-infinite-scroll>\n" +
    "                        \n" +
    "    </ion-content>\n" +
    "    \n" +
    "</ion-view>");
  $templateCache.put("templates/discover/swipe.html",
    "<ion-view ng-controller=\"DiscoverCtrl\" class=\"view-bg\">\n" +
    "\n" +
    "    <ion-nav-title>\n" +
    "       <div class=\"bar bar-header item-input-inset\">\n" +
    "          <label class=\"item-input-wrapper\">\n" +
    "            <i class=\"icon ion-ios-search placeholder-icon\"></i>\n" +
    "            <input type=\"search\" placeholder=\"Search\" ng-model=\"query.string\" ng-keyup=\"search()\">\n" +
    "          </label>\n" +
    "          <button class=\"button button-clear\" ng-show=\"search.q\" style=\"display:none;\">\n" +
    "            Cancel\n" +
    "          </button>\n" +
    "        </div>\n" +
    "    </ion-nav-title>\n" +
    "\n" +
    "    <div class=\"tabs-striped tabs-icon-top tabs-top tabs-background-white tabs-color-light\">\n" +
    "        <div class=\"tabs\">\n" +
    "          \n" +
    "         \n" +
    "          <a class=\"tab-item\" ng-class=\"{active: filter == 'suggested'}\" ng-click=\"changeFilter('suggested')\">\n" +
    "            <i class=\"icon ion-shuffle\"></i>\n" +
    "            Suggested\n" +
    "          </a>\n" +
    "          <a class=\"tab-item\" ng-class=\"{active: filter == 'trending'}\" ng-click=\"changeFilter('trending')\">\n" +
    "            <i class=\"icon ion-arrow-graph-up-right\"></i>\n" +
    "            Trending\n" +
    "          </a>\n" +
    "          <a class=\"tab-item\" ng-class=\"{active: filter == 'featured'}\" ng-click=\"changeFilter('featured')\">\n" +
    "            <i class=\"icon ion-star\"></i>\n" +
    "            Featured\n" +
    "          </a>\n" +
    "          <a class=\"tab-item\" ng-class=\"{active: type == 'video'}\" ng-click=\"changeType('video')\" style=\"border-left:1px solid #EEE !important;\">\n" +
    "            <i class=\"icon ion-ios-videocam\"></i>\n" +
    "            Videos\n" +
    "          </a>\n" +
    "          <a class=\"tab-item\" ng-class=\"{active: type == 'image'}\" ng-click=\"changeType('image')\">\n" +
    "            <i class=\"icon ion-image\"></i>\n" +
    "            Images\n" +
    "          </a>\n" +
    "           <a class=\"tab-item\" ng-class=\"{active: type == 'channel'}\" ng-click=\"changeType('channel')\">\n" +
    "            <i class=\"icon ion-person-stalker\"></i>\n" +
    "            Directory\n" +
    "          </a>\n" +
    "    \n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Scroll view -->\n" +
    "    <ion-content class=\"forced-scroll\" ng-show=\"filter != 'suggested'\" style=\"padding-top:80px\" scroll=\"true\">\n" +
    "    		\n" +
    "    		<div ng-show=\"entities.length == 0\" style=\"text-align:center; font-weight:200; padding-top:50px;\">\n" +
    "				<img src=\"img/logo-transparent.png\" class=\"loading-bulb-glow\"/> <br/>\n" +
    "				Discovering...\n" +
    "			</div>\n" +
    "    \n" +
    "			<div ng-repeat=\"entity in entities\" class=\"swipe-container\" ng-if=\"filter != 'suggested'\">\n" +
    "			\n" +
    "	            <div ng-switch=\"entity.type\">\n" +
    "	            \n" +
    "	                <!-- Objects -->\n" +
    "	                <div ng-switch-when=\"object\">\n" +
    "	                    <div class=\"list card tabs-background-white {{entity.subtype}}\" ng-include src=\"'templates/discover/entities/object.html'\" swipe swipe-disable-vertical=\"true\" swipe-on-down=\"down(entity)\" swipe-on-left=\"pass(entity)\" swipe-on-right=\"up(entity)\"></div>\n" +
    "	                    <a g-click=\"boost(entity)\" style=\"opacity: 1; margin: 12px auto; display: block; width: 56px;\" ng-if=\"entity.owner_guid == $root.user_guid\">\n" +
    "                           <span style=\"color: #FFF;font-weight: 800;background: #4690C3;padding: 6px 8px;border-radius: 3px;\">Boost</span>\n" +
    "                        </a>\n" +
    "	                </div>\n" +
    "	                \n" +
    "	                <!-- USERS -->\n" +
    "	                <div ng-switch-when=\"user\">\n" +
    "	                    <div class=\"list card tabs-background-white\" ng-include src=\"'templates/discover/entities/user.html'\" swipe swipe-disable-vertical=\"true\" swipe-on-left=\"ignore(entity)\" swipe-on-right=\"subscribe(entity)\"></div>\n" +
    "                        \n" +
    "                        <a ng-click=\"boost(entity)\" style=\"opacity: 1; margin: 12px auto; display: block; width: 56px;\" ng-if=\"entity.guid == $root.user_guid\">\n" +
    "                           <span style=\"color: #FFF;font-weight: 800;background: #4690C3;padding: 6px 8px;border-radius: 3px;\">Boost</span>\n" +
    "                        </a>\n" +
    "\n" +
    "	               </div>\n" +
    "	                \n" +
    "	            </div>\n" +
    "			</div>\n" +
    "			\n" +
    "			<ion-infinite-scroll \n" +
    "                on-infinite=\"load()\" \n" +
    "                distance=\"1%\" \n" +
    "                ng-if=\"entities.length > 0 && hasMoreData == true && filter != 'search' && filter != 'suggested'\">\n" +
    "        \n" +
    "            </ion-infinite-scroll>\n" +
    "						\n" +
    "	</ion-content>\n" +
    "	    \n" +
    "	<ion-pane style=\"padding-top:102px\" style=\"-webkit-transform: translate3d(0px, 0px, 0px);\" ng-if=\"filter == 'suggested'\">\n" +
    "	\n" +
    "	   <div ng-if=\"type == 'channel'\" class=\"location-bar\" style=\"padding-left:12px;\">\n" +
    "	       <span ng-if=\"!nearby && hasNearby\" ng-click=\"setNearby(true);\" style=\"background: #EEE; border: 1px solid #DDD; border-radius: 3px; padding: 0 5px;\">Location off</span>\n" +
    "           <span ng-if=\"nearby\" ng-click=\"setNearby(false);\" style=\"background: #4690C3; border: 1px solid #4690C3; border-radius: 3px; padding: 0 5px; color:#FFF;\">Locating</span>\n" +
    "           <span ng-if=\"!nearby && !hasNearby\" ng-click=\"setNearby(true);\" style=\"background: #EEE; border: 1px solid #DDD; border-radius: 3px; padding: 0 5px;\">No results</span>\n" +
    "	       <!-- only show if locating is on -->\n" +
    "	       <span ng-if=\"nearby || (!nearby && !hasNearby)\">\n" +
    "    	       within \n" +
    "    	       <select style=\"-webkit-appearance: none; color:#4690C3; background:#FAFAFA; border: 1px solid #EEE; border-radius:3px;\" ng-change=\"distanceChanged()\" ng-model=\"location.distance\" ng-options=\"d.name for d in [{name:'5 miles', miles: 5}, {name:'25 miles', miles: 25}, {name:'50 miles', miles: 50}, {name:'100 miles', miles: 100}] track by d.miles\"></select>\n" +
    "               of <b>{{city}}</b> \n" +
    "           </span>\n" +
    "	   </div>\n" +
    "\n" +
    "		<div ng-show=\"entities.length == 0\" style=\"text-align:center; font-weight:200; padding-top:50px;\">\n" +
    "			<img src=\"img/logo-transparent.png\" class=\"loading-bulb-glow\"/> <br/>\n" +
    "			Discovering<span ng-if=\"nearby\"> near you</span>...\n" +
    "		</div>\n" +
    "\n" +
    "		<div ng-repeat=\"entity in entities\" class=\"swipe-container\" ng-show=\"$index <= 1\" data-instantActivate >\n" +
    "		\n" +
    "            <div ng-switch=\"entity.type\">\n" +
    "            \n" +
    "                <!-- Objects -->\n" +
    "                <div ng-switch-when=\"object\">\n" +
    "                    <div class=\"list card tabs-background-white {{entity.subtype}}\" ng-include src=\"'templates/discover/entities/object.html'\" swipe swipe-on-down=\"down(entity)\" swipe-on-left=\"pass(entity)\" swipe-on-right=\"up(entity)\"></div>\n" +
    "                </div>\n" +
    "                \n" +
    "                <!-- USERS -->\n" +
    "                <div ng-switch-when=\"user\">\n" +
    "                    <div class=\"list card tabs-background-white\" ng-include src=\"'templates/discover/entities/user.html'\" swipe swipe-on-left=\"ignore(entity)\" swipe-on-right=\"subscribe(entity)\"></div>\n" +
    "                \n" +
    "                \n" +
    "                    <div class=\"boost-tab\">\n" +
    "                   		<i class=\"icon ion-more\" ng-click=\"openActions(entity)\"></i>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                \n" +
    "            </div>\n" +
    "		</div>\n" +
    "    			                \n" +
    "	</ion-pane>\n" +
    "	\n" +
    "</ion-view>");
  $templateCache.put("templates/gatherings/chat/conversation.html",
    "<ion-view ng-controller=\"ChatConversationCtrl\" class=\"view-bg\">\n" +
    "    \n" +
    "    <ion-nav-buttons side=\"left\">\n" +
    "        <a class=\"button button-clear icon ion-arrow-left-b\" href=\"#/tab/gatherings/conversations\"></a>\n" +
    "    </ion-nav-buttons>\n" +
    "    <ion-nav-title>\n" +
    "    	<a href=\"#/tab/newsfeed/channel/{{guid}}\" style=\"vertical-align:middle; text-decoration: none;\">\n" +
    "	    	<img ng-src=\"{{node_url}}icon/{{guid}}/small}}\" style=\"margin-bottom:2px; vertical-align:middle; width:28px; border-radius:3px; box-shadow:0 0 3px #888;\"/> \n" +
    "	    	{{name}}\n" +
    "    	</a>\n" +
    "    </ion-nav-title>\n" +
    "\n" +
    "    <ion-content>\n" +
    "\n" +
    "        <ion-list>\n" +
    "        \n" +
    "            <ion-refresher\n" +
    "                pulling-text=\"Load earlier messages..\"\n" +
    "                on-refresh=\"loadMore()\">\n" +
    "            </ion-refresher>\n" +
    "\n" +
    "            <ion-item ng-repeat=\"message in messages\" class=\"message\" ng-class=\"{'message-right': message.owner_guid == $root.user_guid}\" type=\"item-text-wrap\">\n" +
    "				 <img ng-src=\"{{$root.node_url}}icon/{{message.ownerObj.guid}}/small\"/>\n" +
    "                \n" +
    "                 <div class=\"message-content\">\n" +
    "                	<decrypt message=\"{{message.message}}\"></decrypt>\n" +
    "                 </div>\n" +
    "                 \n" +
    "                 <span class=\"ts\">{{message.time_created * 1000 | date:'shortTime'}} - {{message.time_created * 1000 | date:'longDate'}}</p>\n" +
    "            </ion-item>\n" +
    "            \n" +
    "            <div ng-show=\"messages.length == 0 && inProgress\" style=\"top:100px; left: 50%; margin-left: -40px; position:fixed; text-align:center; font-weight:200; padding-top:50px; z-index:999\">\n" +
    "				<img src=\"img/logo-transparent.png\" class=\"loading-bulb-glow\"/> <br/>\n" +
    "				downloading..\n" +
    "			</div>\n" +
    "\n" +
    "        </ion-list>\n" +
    "\n" +
    "    </ion-content>\n" +
    "        \n" +
    "    <ion-footer-bar >\n" +
    "        <form ng-submit=\"send()\" class=\"message-input-form\">\n" +
    "         <input type=\"text\" class=\"message-input\" placeholder=\"Send a message...\" ng-model=\"message\" ng-min-length=\"1\" ng-max-length=\"140\" required/> <input type=\"submit\" class=\"button button-clear submit-button minds-yellow\" value=\"send\"/>\n" +
    "        </form>\n" +
    "    </ion-footer-bar>\n" +
    "    \n" +
    "</ion-view>");
  $templateCache.put("templates/gatherings/chat/list.html",
    "<ion-view title=\"Conversations\" ng-controller=\"ChatCtrl\" class=\"view-bg\">\n" +
    "\n" +
    "	<ion-nav-buttons side=\"right\">\n" +
    "		<a class=\"button button-clear\" ng-click=\"invite()\">\n" +
    "			Invite\n" +
    "		</a>\n" +
    "	</ion-nav-buttons>\n" +
    "		\n" +
    "	<div class=\"chat-search-bar tabs-top\">\n" +
    "		<div class=\"tabs\">\n" +
    "			<input placeholder=\"Search for users...\" ng-model=\"search.query\" ng-keyup=\"doSearch()\"/>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "		\n" +
    "    <ion-content style=\"padding-top:50px;\">\n" +
    "	\n" +
    "        <ion-list>\n" +
    "        \n" +
    "            <ion-refresher\n" +
    "                pulling-text=\"Pull to refresh...\"\n" +
    "                on-refresh=\"refresh()\">\n" +
    "            </ion-refresher>\n" +
    "            \n" +
    "            <div ng-repeat=\"conversation in conversations\">\n" +
    "                <ion-item class=\"conversation\" ng-if=\"conversation.subscribed && conversation.subscriber\" href=\"#/tab/gatherings/conversations/{{conversation.guid}}/{{conversation.name}}\">\n" +
    "                    <img image-cache ng-src=\"{{$root.node_url}}icon/{{conversation.guid}}/small\" style=\"float:left;\"/>\n" +
    "                    \n" +
    "                    <h2 ng-bind-html=\"conversation.name\"></h2>\n" +
    "                    <p ng-show=\"conversation.last_msg\">{{conversation.last_msg * 1000 | date:'shortTime'}} - {{conversation.last_msg * 1000 | date:'longDate'}}</p>\n" +
    "                    <span ng-show=\"conversation.unread == 1\" style=\"position:absolute; top:20px; right:12px; border-radius:100%; display:block; background:green; width:12px; height:12px\"></span>\n" +
    "                </ion-item>\n" +
    "                \n" +
    "                <ion-item class=\"conversation\" ng-if=\"!conversation.subscribed || !conversation.subscriber\" ng-click=\"subscribe($index)\" >\n" +
    "                    <img image-cache ng-src=\"{{$root.node_url}}icon/{{conversation.guid}}/small\" style=\"float:left;\"/>\n" +
    "                     <i class=\"icon ion-person-add channel-user-subscribe\" \n" +
    "                        ng-if=\"conversation.subscribed == false\"\n" +
    "                       > </i>\n" +
    "                    <h2>{{conversation.name}}</h2>\n" +
    "                </ion-item>\n" +
    "            </div>\n" +
    "            \n" +
    "        </ion-list>\n" +
    "        \n" +
    "        <ion-infinite-scroll \n" +
    "            on-infinite=\"loadMore()\" \n" +
    "            distance=\"1%\" \n" +
    "            ng-if=\"hasMoreData\">\n" +
    "        </ion-infinite-scroll>\n" +
    "\n" +
    "    </ion-content>\n" +
    "</ion-view>");
  $templateCache.put("templates/gatherings/chat/setup.html",
    "<ion-view title=\"Unlock Chat\" >\n" +
    "\n" +
    "    <ion-content ng-controller=\"ChatSetupCtrl\" class=\"view-bg\">\n" +
    "\n" +
    "		<div ng-if=\"!configured\">\n" +
    "			\n" +
    "			 <label class=\"item item-input\">\n" +
    "	            <span class=\"input-label\">Password</span>\n" +
    "	            <input type=\"password\" ng-model=\"data.password\">\n" +
    "	        </label>\n" +
    "	        <label class=\"item item-input\">\n" +
    "	            <span class=\"input-label\">Confirm Password</span>\n" +
    "	            <input type=\"password\" ng-model=\"data.password2\">\n" +
    "	        </label>\n" +
    "	        \n" +
    "	        <div class=\"padding\">\n" +
    "	\n" +
    "	            <div>\n" +
    "	                <button class=\"button button-block button-positive\" ng-click=\"setup(password)\">\n" +
    "	                    Setup chat\n" +
    "	                </button>\n" +
    "	            </div>\n" +
    "	\n" +
    "	        </div>\n" +
    "		\n" +
    "		</div>\n" +
    "	\n" +
    "		<div ng-if=\"configured\">\n" +
    "	         <label class=\"item item-input\">\n" +
    "	            <span class=\"input-label\">Password</span>\n" +
    "	            <input type=\"password\" ng-model=\"data.password\">\n" +
    "	        </label>\n" +
    "	        \n" +
    "	        <div class=\"padding\">\n" +
    "	\n" +
    "	            <div>\n" +
    "	                <button class=\"button button-block button-positive\" ng-click=\"unlock(password)\">\n" +
    "	                    Unlock chat\n" +
    "	                </button>\n" +
    "	            </div>\n" +
    "	\n" +
    "	        </div>\n" +
    "        </div>\n" +
    "        \n" +
    "        <p style=\"padding:16px; color:#666;\">\n" +
    "        	- You only need to enter this encryption password once as long as you stay signed in. <br/>\n" +
    "        	- It is important so that no one other than you and the people you are communicating with can access the content of your messages. <br/>\n" +
    "        	- By default the content of your messages is fully encrypted. For heightened security you may wish to go to your app settings and turn off push notifications in order to disallow metadata from being tracked. \n" +
    "        </p>\n" +
    "        <p>\n" +
    "            \n" +
    "        </p>\n" +
    "\n" +
    "    </ion-content>\n" +
    "</ion-view>");
  $templateCache.put("templates/invite/invite.html",
    "<ion-modal-view ng-controller=\"InviteCtrl\" class=\"view-bg\">\n" +
    "	\n" +
    "	<ion-header-bar>\n" +
    "		<div class=\"buttons\">\n" +
    "	    	<button class=\"button button-clear\" ng-click=\"modal.remove()\">Cancel</button>\n" +
    "	 	 </div>\n" +
    "	  	<h1 class=\"title\">Invite contacts</h1>\n" +
    "	  	<div class=\"buttons\">\n" +
    "	    	<button class=\"button button-positive\" ng-click=\"invite()\">Invite Selected</button>\n" +
    "	 	 </div>\n" +
    "	</ion-header-bar>\n" +
    "	\n" +
    "	<ion-content>\n" +
    "		<div class=\"list\">\n" +
    "			<div ng-repeat=\"contact in contacts\" class=\"item item-button-right\" ng-click=\"select(contact)\">\n" +
    "				<h3>{{contact.name.formatted}}</h3>\n" +
    "				<p>{{contact.emails[0].value}}</p>\n" +
    "				<button class=\"button\" ng-class=\"{'button-positive' : isSelected(contact)}\" ng-click=\"select(contact)\">\n" +
    "				  <i class=\"icon ion-checkmark-round\"></i>\n" +
    "				</button>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</ion-content>\n" +
    "</ion-modal-view>");
  $templateCache.put("templates/modals/avatar.html",
    "<ion-modal-view ng-controller=\"ChannelEditCtrl\" class=\"view-bg\">\n" +
    "	\n" +
    "\n" +
    "	<ion-header-bar>\n" +
    "		<div class=\"buttons\">\n" +
    "	    	<button class=\"button button-clear\" ng-click=\"modal.remove(); modal2.show();\">Skip</button>\n" +
    "	 	 </div>\n" +
    "	  	<h1 class=\"title\">Setup</h1>\n" +
    "	  	<div class=\"buttons\">\n" +
    "            <button class=\"button button-clear minds-blue\" style=\"color:#4690C3\"  ng-click=\"update(false); modal.remove(); modal2.show();\">Save</button>\n" +
    "         </div>\n" +
    "	</ion-header-bar>\n" +
    "	\n" +
    "	<ion-content>\n" +
    "	\n" +
    "	     <div class=\"list\">\n" +
    "           <label class=\"item item-input\" style=\"padding:16px\">\n" +
    "                <span class=\"input-label\">Bio</span>\n" +
    "                <input type=\"text\" ng-model=\"channel.briefdescription\" placeholder=\"Enter a brief description here\">\n" +
    "            </label>\n" +
    "        </div>\n" +
    "	\n" +
    "		 <img id=\"avatar\" ng-src=\"{{$root.node_url}}icon/{{$root.user_guid}}/large/{{$root.globalCB}}/{{cb}}\" style=\"width: calc(75% - 32px); margin:16px auto; display:block; height: auto; box-shadow:0 0 3px #888;\" onerror=\"this.src='img/avatar.png'\" ng-click=\"changeAvatar();\"/>\n" +
    "	     <p style=\"padding:0 20px; text-align:center;\">Select the image above to select an avatar</p>\n" +
    "	     \n" +
    "        \n" +
    "	\n" +
    "	</ion-content>\n" +
    "</ion-modal-view>");
  $templateCache.put("templates/modals/optional.html",
    "<ion-modal-view ng-controller=\"ChannelEditCtrl\" class=\"view-bg\">\n" +
    "	\n" +
    "\n" +
    "	<ion-header-bar>\n" +
    "		<div class=\"buttons\">\n" +
    "	    	<button class=\"button button-clear\" ng-click=\"toTutorial(); modal2.remove(); \">Skip</button>\n" +
    "	 	 </div>\n" +
    "	  	<h1 class=\"title\">Optional</h1>\n" +
    "	  	<div class=\"buttons\">\n" +
    "            <button class=\"button button-clear minds-blue\" style=\"color:#4690C3\" ng-if=\"!channel.city || (channel.city && channel.coordinates)\" ng-click=\"update(false); toTutorial(); modal2.remove(); \">Save</button>\n" +
    "            <button class=\"button button-clear\" ng-if=\"channel.city && !channel.coordinates\" ng-click=\"\">Save</button>\n" +
    "        </div>\n" +
    "	</ion-header-bar>\n" +
    "	\n" +
    "	<ion-content>\n" +
    "	\n" +
    "	     <div class=\"list\">\n" +
    "	     \n" +
    "	       <div class=\"item item-input gender-input\">\n" +
    "                <span class=\"input-label\">Gender</span>\n" +
    "               \n" +
    "                <a ng-class=\"{'minds-blue': channel.gender == 'male'}\"  ng-click=\"channel.gender = 'male'\">Male</a> / \n" +
    "                <a ng-class=\"{'minds-blue': channel.gender == 'female'}\" ng-click=\"channel.gender = 'female'\">Female</a> / \n" +
    "                <a ng-class=\"{'minds-blue': channel.gender == null}\" ng-click=\"channel.gender = null\">Private</a>\n" +
    "            </div>\n" +
    "            <label class=\"item item-input\">\n" +
    "              <span class=\"input-label\">Date of Birth</span>\n" +
    "              <input type=\"text\" ng-model=\"channel.dob\" onclick=\"(this.type='month')\"  onblur=\"(this.type='text')\" placeholder=\"Optional. This will be public.\">\n" +
    "            </label>\n" +
    "             <label class=\"item item-input\">\n" +
    "              <span class=\"input-label\">City</span>\n" +
    "              <input type=\"text\" ng-model=\"channel.city\" placeholder=\"Optional. This will be public.\" ng-change=\"autoSearchLocation()\">\n" +
    "            </label>\n" +
    "                           \n" +
    "           <div class=\"suggested-location-list\">\n" +
    "               <div ng-repeat=\"location in cities\" ng-click=\"selectSuggestedLocation(location)\" ng-if=\"location.address.city || location.address.town\">\n" +
    "                   \n" +
    "                   {{location.address.town}}{{location.address.city}}, {{location.address.state}}\n" +
    "                    \n" +
    "               </div>\n" +
    "           </div>\n" +
    "            \n" +
    "            <img ng-if=\"channel.coordinates\" ng-src=\"http://staticmap.openstreetmap.de/staticmap.php?center={{channel.coordinates}}&zoom=9&size=400x150&maptype=mapnik\" style=\"width:100%\"/>\n" +
    "        </div>\n" +
    "\n" +
    "	</ion-content>\n" +
    "</ion-modal-view>");
  $templateCache.put("templates/newsfeed/boost.html",
    "<ion-modal-view ng-controller=\"NewsfeedBoostCtrl\" class=\"view-bg\">\n" +
    "	\n" +
    "\n" +
    "	<ion-header-bar>\n" +
    "		<div class=\"buttons\">\n" +
    "	    	<button class=\"button button-clear\" ng-click=\"modal.remove()\">Cancel</button>\n" +
    "	 	 </div>\n" +
    "	  	<h1 class=\"title\">Boost Post</h1>\n" +
    "	  	<div class=\"buttons\">\n" +
    "	  	    <a class=\"button button-clear icon icon-bank\" href=\"#/tab/newsfeed/wallet\" ng-click=\"modal.remove()\">\n" +
    "				<wallet-counter></wallet-counter>\n" +
    "			</a>\n" +
    "	  	</div>\n" +
    "	</ion-header-bar>\n" +
    "	\n" +
    "	<ion-content>\n" +
    "	\n" +
    "	   <div ng-if=\"data.step == 1\">\n" +
    "	   \n" +
    "	       <div class=\"wallet-points-input wallet-destination-select\">\n" +
    "           \n" +
    "               <h3>Channel</h3>\n" +
    "                <input type=\"text\" ng-model=\"data.destination\" placeholder=\"Tap to search...\" ng-keyup=\"changeDestination($event)\" /> \n" +
    "                <p>Select a channel above to have your post distributed to their subscribers in exchange for points.</p>\n" +
    "               \n" +
    "               <div class=\"wallet-users-list\" ng-show=\"searching\">\n" +
    "                   <div ng-repeat=\"user in results\" ng-click=\"selectDestination(user);\">\n" +
    "                       \n" +
    "                        <img src=\"{{$root.node_url}}icon/{{user.guid}}/small\" />\n" +
    "                         @{{user.username}}\n" +
    "                   </div>\n" +
    "               </div>\n" +
    "           </div>\n" +
    "	   \n" +
    "	        <div class=\"wallet-points-input wallet-destination-select\" ng-click=\"nextStep()\">\n" +
    "               \n" +
    "               <h3>Full Network</h3>\n" +
    "               <p>Your post will appear at the top of everyone's newsfeed until your views are met.</p>\n" +
    "               <a class=\"button button-positive\" ng-click=\"nextStep()\" style=\"width:100%;\">Select</a>\n" +
    "\n" +
    "           </div>\n" +
    "	       	   \n" +
    "	   </div>\n" +
    "	   \n" +
    "	   <div ng-if=\"data.step == 2\">\n" +
    "	   \n" +
    "    		<div class=\"wallet-points-input\">\n" +
    "    			<div class=\"cell\">\n" +
    "    				<input type=\"number\" ng-model=\"data.points\" placeholder=\"Tap to enter points\"/> \n" +
    "    			</div>\n" +
    "    			<div class=\"cell\">\n" +
    "    				<label>Points</label>\n" +
    "    			</div>\n" +
    "    		</div>\n" +
    "    		\n" +
    "    		<div class=\"wallet-points-input\" ng-if=\"!data.destination\">\n" +
    "    			<div class=\"cell\">\n" +
    "    				<input type=\"number\" ng-model=\"data.impressions\" disabled/> \n" +
    "    			</div>\n" +
    "    			<div class=\"cell\">\n" +
    "    				<label>Views</label>\n" +
    "    			</div>\n" +
    "    		</div>\n" +
    "    		\n" +
    "    		<div class=\"wallet-points-input\" ng-if=\"!data.destination\">\n" +
    "    		  <p style=\"color:#888;\n" +
    "                        padding:0 16px;\n" +
    "                        font-size:11px;\">\n" +
    "    		      Transactions are non-refundable. \n" +
    "    		      You will be notified when your post reaches the requested number of views. \n" +
    "    		      The amount of time this will take depends on site activity, so don't worry if you don't hear from us for a while; we will keep it in circulation until it reaches the goal!\n" +
    "    		  </p>\n" +
    "    		</div>\n" +
    "    		\n" +
    "    		<div class=\"wallet-points-input\" ng-if=\"data.destination\">\n" +
    "              <p style=\"color:#888;\n" +
    "                        padding:0 16px;\n" +
    "                        font-size:11px;\">\n" +
    "                  You will be notified if you post is accepted or rejected by {{data.destination}}. Once they accept, this post will not be able to be deleted.\n" +
    "              </p>\n" +
    "            </div>\n" +
    "    		\n" +
    "    		<button class=\"button wallet-purchase-button\" ng-click=\"boost()\">Boost!</button>\n" +
    "		\n" +
    "		</div>\n" +
    "    \n" +
    "	\n" +
    "	</ion-content>\n" +
    "</ion-modal-view>");
  $templateCache.put("templates/newsfeed/compose.html",
    "<ion-popover-view>\n" +
    "    <ion-header-bar> \n" +
    "        <h1 class=\"title\">Write a post...</h1> \n" +
    "    </ion-header-bar> \n" +
    "    <ion-content> \n" +
    "        <form>\n" +
    "            <label class=\"item item-input item-stacked-label\">\n" +
    "                <textarea placeholder=\"Enter a message here\" ng-model=\"composerData.message\">\n" +
    "                </textarea>\n" +
    "            </label>\n" +
    "            <input type=\"submit\" value=\"Post\" class=\"button button-positive ion-paper-airplane-hide\" style=\"float:right; margin-top:10px; margin-right:10px;\" ng-click=\"post()\"/>\n" +
    "        </form>\n" +
    "    </ion-content>\n" +
    "</ion-popover-view>");
  $templateCache.put("templates/newsfeed/list.html",
    "<ion-view title=\"<img src='img/full_logo.png' class='topbar-logo'/>\" ng-controller=\"NewsfeedCtrl\" class=\"view-bg\">\n" +
    "	\n" +
    "	<ion-nav-buttons side=\"left\">\n" +
    "		<!--<a class=\"button button-clear icon ion-compose\" ng-click=\"composer.show($event)\"></a>-->\n" +
    "		<a class=\"button button-clear icon icon-bank\" href=\"#/tab/newsfeed/wallet\">\n" +
    "			<wallet-counter></wallet-counter>\n" +
    "		</a>\n" +
    "	</ion-nav-buttons>\n" +
    "	\n" +
    "	<ion-nav-buttons side=\"right\">\n" +
    "		<!--<a class=\"button button-clear icon ion-compose\" ng-click=\"composer.show($event)\"></a>-->\n" +
    "		<a class=\"button button-clear\" href=\"#/tab/newsfeed/channel/me\">\n" +
    "			<img class=\"topbar-user-icon\" ng-src=\"{{$root.node_url}}icon/{{$root.user_guid}}/small/\"/>\n" +
    "		</a>\n" +
    "	</ion-nav-buttons>\n" +
    "\n" +
    "	<ion-content>\n" +
    "        <ion-refresher\n" +
    "            pulling-text=\"Pull to refresh...\"\n" +
    "            on-refresh=\"refresh()\">\n" +
    "        </ion-refresher>\n" +
    "\n" +
    "		<ion-list>\n" +
    "\n" +
    "			<activity-view ng-repeat=\"activity in newsfeedItems track by $id(activity)\" id=\"{{activity.guid}}\" class=\"activity-item list card\">\n" +
    "			</activity-view>\n" +
    "\n" +
    "		</ion-list>\n" +
    "		\n" +
    "		<ion-infinite-scroll ng-if=\"hasMore()\" distance=\"5%\" on-infinite=\"loadMore()\"  >\n" +
    "		</ion-infinite-scroll>\n" +
    "\n" +
    "	</ion-content>\n" +
    "</ion-view>");
  $templateCache.put("templates/newsfeed/view.html",
    "<ion-view ng-controller=\"NewsfeedViewCtrl\" class=\"view-bg\">\n" +
    "\n" +
    "	<ion-nav-buttons side=\"left\">\n" +
    "        <a class=\"button button-clear icon ion-arrow-left-b\" ng-click=\"back()\"></a>\n" +
    "    </ion-nav-buttons>\n" +
    "\n" +
    "    <ion-content >\n" +
    "    	\n" +
    "    	<div ng-controller=\"NewsfeedCtrl\" style=\"margin-bottom:-42px\">\n" +
    "    	   <activity-view ng-if=\"activity.guid\" id=\"{{activity.guid}}\" class=\"activity-item list card\" ng-controller=\"NewsfeedCtrl\"></activity-view>\n" +
    "    	</div>\n" +
    "    	\n" +
    "    	<!-- show comments here -->\n" +
    "		<ion-list>\n" +
    "			<div class=\"loading\">\n" +
    "				<i class=\"icon ion-loading-d\" ng-if=\"comments.length == 0 && inprogress\"></i>\n" +
    "			</div>\n" +
    "			<div ng-repeat=\"comment in comments\" class=\"comment-item\" ng-class-future=\"$even ? 'odd' : 'even'\">\n" +
    "				\n" +
    "				<a href=\"#/tab/newsfeed/channel/{{comment.ownerObj.guid}}\">\n" +
    "					<img ng-src=\"{{$root.node_url}}icon/{{comment.ownerObj.guid}}/small\"/>\n" +
    "				</a>\n" +
    "				\n" +
    "				<div class=\"content item-text-wrap\" ng-bind-html=\"comment.description | linky\" ng-click=\"removeComment(comment)\">\n" +
    "				</div>\n" +
    "			</div>	\n" +
    "		</ion-list>\n" +
    "		\n" +
    "		<div class=\"list card\" style=\"clear:both;\" >\n" +
    "			<div class=\"item item-input-inset\">\n" +
    "			 	<label class=\"item-input-wrapper\" style=\"background:transparent\">\n" +
    "					<textarea placeholder=\"Type your comment here...\" ng-model=\"comment.body\">\n" +
    "					</textarea>\n" +
    "				</label>\n" +
    "				<button class=\"button button-clear\" ng-click=\"submit()\">\n" +
    "					Comment\n" +
    "				</button>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<ion-infinite-scroll on-infinite=\"getComments()\" distance=\"10%\" ng-if=\"hasMore\"></ion-infinite-scroll>\n" +
    "\n" +
    "    </ion-content>\n" +
    "</ion-view>");
  $templateCache.put("templates/notifications/entity.html",
    "<ion-view title=\"\" ng-controller=\"NotificationsEntityCtrl\" class=\"view-bg\">\n" +
    "\n" +
    "	<ion-nav-buttons side=\"left\">\n" +
    "        <a class=\"button button-clear icon ion-arrow-left-b\" href=\"#/tab/notifications\"></a>\n" +
    "    </ion-nav-buttons>\n" +
    "    \n" +
    "	<ion-content>\n" +
    "		<!-- kind of mish-mashy... -->\n" +
    "		\n" +
    "		<div class=\"loading\" ng-if=\"!entity\" style=\"margin:50px;\">\n" +
    "            <ion-spinner></ion-spinner>\n" +
    "        </div>\n" +
    "\n" +
    "		<div ng-switch=\"entity.type\" style=\"margin-bottom:-42px\">\n" +
    "			<div ng-switch-when=\"object\" ng-controller=\"DiscoverCtrl\">\n" +
    "				<div class=\"list card tabs-background-white {{entity.subtype}}\" ng-include src=\"'templates/discover/entities/object.html'\"></div>\n" +
    "			</div>\n" +
    "			<div ng-switch-when=\"activity\" ng-controller=\"NewsfeedCtrl\">\n" +
    "				<activity-view class=\"activity-item list card\"></activity-view>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		\n" +
    "		<!-- show comments here -->\n" +
    "		<ion-list>\n" +
    "			<div class=\"loading\">\n" +
    "				<ion-spinner ng-if=\"comments.length == 0 && inprogress\"></ion-spinner> \n" +
    "			</div>\n" +
    "			<div ng-repeat=\"comment in comments\" class=\"comment-item\" ng-class-future=\"$even ? 'even' : 'odd'\">\n" +
    "				\n" +
    "				<a href=\"#/tab/newsfeed/channel/{{comment.ownerObj.guid}}\">\n" +
    "					<img ng-src=\"{{$root.node_url}}icon/{{comment.ownerObj.guid}}/small\"/>\n" +
    "				</a>\n" +
    "				\n" +
    "				<div class=\"content item-text-wrap\" ng-bind-html=\"comment.description | linky\" ng-click=\"removeComment(comment)\">\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</ion-list>\n" +
    "		<div class=\"list card\" style=\"clear:both;\">\n" +
    "			<div class=\"item item-input-inset\">\n" +
    "\n" +
    "			 	<label class=\"item-input-wrapper\" style=\"background:transparent\">\n" +
    "					<textarea placeholder=\"Type your comment here...\" ng-model=\"comment.body\" style=\"position: relative!important; left: 0; top: 0;\">\n" +
    "					</textarea>\n" +
    "				</label>\n" +
    "				<button class=\"button button-clear\" ng-click=\"submit()\">\n" +
    "					Comment\n" +
    "				</button>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<ion-infinite-scroll on-infinite=\"getComments()\" distance=\"10%\" ng-if=\"hasMore\"></ion-infinite-scroll>\n" +
    "\n" +
    "	</ion-content>\n" +
    "</ion-view>");
  $templateCache.put("templates/notifications/list.html",
    "<ion-view title=\"Notifications\" ng-controller=\"NotificationsCtrl\" class=\"view-bg\">\n" +
    "\n" +
    "    <ion-nav-buttons side=\"left\">\n" +
    "        <!--<a class=\"button button-clear icon ion-compose\" ng-click=\"composer.show($event)\"></a>-->\n" +
    "        <a class=\"button button-clear icon ion-arrow-graph-up-right minds-blue\" style=\"color:#4690C3\" href=\"#/tab/notifications/p2p-review\"></a>\n" +
    "    </ion-nav-buttons>\n" +
    "\n" +
    "	<ion-content>\n" +
    "\n" +
    "		<ion-list>\n" +
    "		\n" +
    "			<ion-refresher\n" +
    "				pulling-text=\"Pull to refresh...\"\n" +
    "				on-refresh=\"refresh()\">\n" +
    "			</ion-refresher>\n" +
    "\n" +
    "			<div class=\"notification-item list card item-text-wrap\" ng-repeat=\"notification in notificationItems\">\n" +
    "				<div class=\"item item-avatar item-text-wrap\">\n" +
    "                   	<img ng-src=\"{{$root.node_url}}icon/{{notification.from_guid}}\" ng-click=\"goToChannel(notification.from_guid)\"/>\n" +
    "\n" +
    "                    <div ng-switch=\"notification.notification_view\">\n" +
    "                    	<!-- subscribed -->\n" +
    "                        <a href=\"#/tab/newsfeed/channel/{{notification.fromObj.guid}}\" ng-switch-when=\"friends\">\n" +
    "                    		<p ng-if=\"notification.fromObj.subscribed\">You have a match! {{notification.fromObj.name}} subscribed to you</p>\n" +
    "                    		<p ng-if=\"!notification.fromObj.subscribed\">{{notification.fromObj.name}} subscribed to you</p>\n" +
    "                    	</a>\n" +
    "                    	<!-- group inivite -->\n" +
    "                        <div ng-switch-when=\"group_invite\">\n" +
    "                        	<a>You've been invited to join {{notification.entityObj.name}}</a>\n" +
    "                        </div>\n" +
    "                        <!-- comment -->\n" +
    "                        <div ng-switch-when=\"comment\">\n" +
    "                        	<!-- need to have multiple link options... some are objects, some are newsfeed -->\n" +
    "                        	\n" +
    "                        	<div ng-switch=\"notification.entityObj.type\">\n" +
    "                        		<a ng-switch-when=\"object\" href=\"#/tab/notifications/entity/{{notification.entityObj.guid}}\">\n" +
    "                        			<p>\n" +
    "                        			 {{notification.fromObj.name}} commented on \n" +
    "                        			     <span class=\"minds-blue\" ng-if=\"notification.entityObj.title\" ng-bind-html=\"notification.entityObj.title\"></span>\n" +
    "                        			     <span class=\"minds-blue\" ng-if=\"!notification.entityObj.title\">your {{notification.entityObj.subtype}}</span>\n" +
    "                        			</p>\n" +
    "                        		</a>\n" +
    "                        		<a ng-switch-when=\"activity\" href=\"#/tab/notifications/entity/{{notification.entityObj.guid}}\">\n" +
    "                        			<p ng-if=\"notification.entityObj.owner_guid == $root.user_guid && !notification.entityObj.title\">\n" +
    "                        				{{notification.fromObj.name}} commented on <span class=\"minds-blue\">your activity</span>\n" +
    "                        			</p>\n" +
    "                        			<p ng-if=\"notification.entityObj.owner_guid != $root.user_guid  && !notification.entityObj.title\">\n" +
    "                        			{{notification.fromObj.name}} commented on <span class=\"minds-blue\">{{notification.entityObj.ownerObj.name}}'s activity</span>\n" +
    "                        			</p>\n" +
    "                        			\n" +
    "                        			<p ng-if=\"notification.entityObj.title\">\n" +
    "                        			{{notification.fromObj.name}} commented on <span class=\"minds-blue\"  ng-bind-html=\"notification.entityObj.title\"></span>\n" +
    "                        			</p>\n" +
    "                        		</a>\n" +
    "                        		<a ng-switch-default>\n" +
    "                        			<p style=\"font-style:italic\">\n" +
    "                        			There was an error viewing this notification.\n" +
    "                        			</p>\n" +
    "                        		</a>\n" +
    "                        	</div>\n" +
    "                       	</div>\n" +
    "                       	<!-- up voted content -->\n" +
    "                        <div ng-switch-when=\"like\">\n" +
    "							<a href=\"#/tab/notifications/entity/{{notification.entityObj.guid}}\" ng-if=\"notification.entityObj.type == 'object'\">\n" +
    "                        		<p>{{notification.fromObj.name}} voted up \n" +
    "                        		      <span class=\"minds-blue\" ng-if=\"notification.entityObj.title\" ng-bind-html=\"notification.entityObj.title\"></span>\n" +
    "                        		      <span class=\"minds-blue\" ng-if=\"!notification.entityObj.title\">your {{notification.entityObj.subtype}}</span>\n" +
    "                        		</p>\n" +
    "                        	</a>\n" +
    "                        	<a href=\"#/tab/notifications/entity/{{notification.entityObj.guid}}\" ng-if=\"notification.entityObj.type == 'activity'\">\n" +
    "                        		<p ng-if=\"notification.entityObj.title\">\n" +
    "                        		  {{notification.fromObj.name}} voted up <span class=\"minds-blue\"  ng-bind-html=\"notification.entityObj.title\"></span>\n" +
    "                        		</p>\n" +
    "                        		<p ng-if=\"!notification.entityObj.title\">\n" +
    "                        		  {{notification.fromObj.name}} voted up <span class=\"minds-blue\">your activity</span>\n" +
    "                        		</p>\n" +
    "                        	</a>\n" +
    "                        	<a href=\"#/tab/notifications/entity/{{notification.entityObj.parent_guid}}\" ng-if=\"notification.entityObj.type == 'comment'\">\n" +
    "                                <p>\n" +
    "                                  {{notification.fromObj.name}} voted up <span class=\"minds-blue\"> your comment </span>\n" +
    "                                </p>\n" +
    "                            </a>\n" +
    "                        	<a href=\"#/tab/notifications/entity/{{notification.entityObj.guid}}\" ng-if=\"!notification.entityObj\">\n" +
    "                        	  <p style=\"font-style:italic\">\n" +
    "                                    This post was deleted.\n" +
    "                              </p>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        <!-- down voted content -->\n" +
    "                        <div ng-switch-when=\"downvote\">\n" +
    "                            <a href=\"#/tab/notifications/entity/{{notification.entityObj.guid}}\" ng-if=\"notification.entityObj.type == 'object'\">\n" +
    "                                <p>{{notification.fromObj.name}} down voted \n" +
    "                                      <span class=\"minds-blue\" ng-if=\"notification.entityObj.title\" ng-bind-html=\"notification.entityObj.title\"></span>\n" +
    "                                      <span class=\"minds-blue\" ng-if=\"!notification.entityObj.title\">your {{notification.entityObj.subtype}}</span>\n" +
    "                                </p>\n" +
    "                            </a>\n" +
    "                            <a href=\"#/tab/notifications/entity/{{notification.entityObj.guid}}\" ng-if=\"notification.entityObj.type == 'activity'\">\n" +
    "                                <p ng-if=\"notification.entityObj.title\">\n" +
    "                                  {{notification.fromObj.name}} down voted <span class=\"minds-blue\"  ng-bind-html=\"notification.entityObj.title\"></span>\n" +
    "                                </p>\n" +
    "                                <p ng-if=\"!notification.entityObj.title\">\n" +
    "                                  {{notification.fromObj.name}} down voted <span class=\"minds-blue\">your activity</span>\n" +
    "                                </p>\n" +
    "                            </a>\n" +
    "                            <a href=\"#/tab/notifications/entity/{{notification.entityObj.parent_guid}}\" ng-if=\"notification.entityObj.type == 'comment'\">\n" +
    "                                <p>\n" +
    "                                  {{notification.fromObj.name}} down voted <span class=\"minds-blue\"> your comment </span>\n" +
    "                                </p>\n" +
    "                            </a>\n" +
    "                            <a href=\"#/tab/notifications/entity/{{notification.entityObj.guid}}\" ng-if=\"!notification.entityObj\">\n" +
    "                              <p style=\"font-style:italic\">\n" +
    "                                    This post was deleted.\n" +
    "                              </p>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        <!-- Remind --> \n" +
    "                        <div ng-switch-when=\"remind\">\n" +
    "                            <a href=\"#/tab/notifications/entity/{{notification.entityObj.guid}}\" ng-if=\"notification.entityObj.type == 'object'\">\n" +
    "                                <p>{{notification.fromObj.name}} reminded  \n" +
    "                                    <span class=\"minds-blue\"  ng-if=\"notification.entityObj.title\" ng-bind-html=\"notification.entityObj.title\"></span>\n" +
    "                                    <span class=\"minds-blue\"  ng-if=\"!notification.entityObj.title\">your {{notification.entityObj.subtype}}</span>\n" +
    "                               </p>\n" +
    "                            </a>\n" +
    "                            <a href=\"#/tab/notifications/entity/{{notification.entityObj.guid}}\" ng-if=\"notification.entityObj.type == 'activity'\">\n" +
    "                                <p ng-if=\"notification.entityObj.title\">\n" +
    "                                  {{notification.fromObj.name}} reminded <span class=\"minds-blue\"  ng-bind-html=\"notification.entityObj.title\"></span>\n" +
    "                                </p>\n" +
    "                                <p ng-if=\"!notification.entityObj.title\">\n" +
    "                                  {{notification.fromObj.name}} reminded <span class=\"minds-blue\">your activity</span>\n" +
    "                                </p>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        <!-- featured -->\n" +
    "                        <div ng-switch-when=\"feature\">\n" +
    "                        	<a href=\"#/tab/notifications/entity/{{notification.entityObj.guid}}\">\n" +
    "                        		<p><span class=\"minds-blue\" ng-bind-html=\"notification.entityObj.title\"></span> was featured</p>\n" +
    "                        	</a>\n" +
    "                        </div>\n" +
    "                        <!-- mention -->\n" +
    "                        <div ng-switch-when=\"tag\">\n" +
    "                            <!-- tags from comments link differently -->\n" +
    "                        	<a href=\"#/tab/notifications/entity/{{notification.entityObj.guid}}\" ng-if=\"notification.entityObj.type != 'comment'\">\n" +
    "                        		<p>{{notification.fromObj.name}} tagged you in a post</p>\n" +
    "                        	</a>\n" +
    "                        	<a href=\"#/tab/notifications/entity/{{notification.entityObj.parent_guid}}\" ng-if=\"notification.entityObj.type == 'comment'\">\n" +
    "                                <p>{{notification.fromObj.name}} tagged you in a comment</p>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        \n" +
    "                        <div ng-switch-when=\"boost_gift\">\n" +
    "                        	<a href=\"#/tab/notifications/entity/{{notification.entityObj.guid}}\">\n" +
    "                        		<p>{{notification.fromObj.name}} gifted you {{notification.params.impressions}} views for \n" +
    "                        		  <span class=\"minds-blue\" ng-if=\"notification.entityObj.title\" ng-bind-html=\"notification.entityObj.title\"></span>\n" +
    "                        		  <span class=\"minds-blue\" ng-if=\"!notification.entityObj.title\"> your post</span>\n" +
    "                        		</p>\n" +
    "                        	</a>\n" +
    "                        </div>\n" +
    "                        \n" +
    "                        <!-- Standard boost notification for owner -->\n" +
    "	                    <div ng-switch-when=\"boost_submitted\">\n" +
    "	                    	<a href=\"#/tab/notifications/entity/{{notification.entityObj.guid}}\">\n" +
    "	                    		<p>{{notification.params.impressions}} views for \n" +
    "	                    		 <span class=\"minds-blue\" ng-if=\"notification.entityObj.title\" ng-bind-html=\"notification.entityObj.title\"></span> \n" +
    "	                    		 <span class=\"minds-blue\" ng-if=\"!notification.entityObj.title\">your post</span>\n" +
    "	                    		 is awaiting approval.</p>\n" +
    "	                    	</a>\n" +
    "                        </div>\n" +
    "                        \n" +
    "                        <!-- P2P boost submitted -->\n" +
    "                        <div ng-switch-when=\"boost_submitted_p2p\">\n" +
    "                            <a href=\"#/tab/notifications/entity/{{notification.entityObj.guid}}\">\n" +
    "                                <p>{{notification.params.points}} points for \n" +
    "                                 <span class=\"minds-blue\" ng-if=\"notification.entityObj.title\" ng-bind-html=\"notification.entityObj.title\"></span> \n" +
    "                                 <span class=\"minds-blue\" ng-if=\"!notification.entityObj.title\">your post</span>\n" +
    "                                 is awaiting approval by <span class=\"minds-blue\">@{{notification.params.channel}}</span></p>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        \n" +
    "                        <!-- P2P Boost Request -->\n" +
    "                        <div ng-switch-when=\"boost_request\">\n" +
    "                            <a ng-click=\"loadBoostReview(notification.entityObj.guid)\">\n" +
    "                                <p>{{notification.fromObj.name}} is offering you {{notification.params.points}} points to boost \n" +
    "                                    <span class=\"minds-blue\" ng-if=\"notification.entityObj.title\" ng-bind-html=\"notification.entityObj.title\"></span>\n" +
    "                                    <span class=\"minds-blue\" ng-if=\"!notification.entityObj.title\">their activity</span>\n" +
    "                               </p>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        \n" +
    "                         <div ng-switch-when=\"boost_rejected\">\n" +
    "                        	<a href=\"#/tab/notifications/entity/{{notification.entityObj.guid}}\">\n" +
    "                        		<p>{{notification.params.impressions}} views for \n" +
    "                        		  <span class=\"minds-blue\" ng-if=\"notification.entityObj.title\" ng-bind-html=\"notification.entityObj.title\"></span> \n" +
    "                        		   <span class=\"minds-blue\" ng-if=\"!notification.entityObj.title\">your post</span> \n" +
    "                        		  were rejected. Your points have been credited back to your wallet.</p>\n" +
    "                        	</a>\n" +
    "                        </div>\n" +
    "                         <div ng-switch-when=\"boost_accepted\">\n" +
    "                        	<a href=\"#/tab/notifications/entity/{{notification.entityObj.guid}}\">\n" +
    "                        		<p ng-if=\"notification.params.impressions\">{{notification.params.impressions}} views for \n" +
    "                        		  <span class=\"minds-blue\" ng-if=\"notification.entityObj.title\" ng-bind-html=\"notification.entityObj.title\"></span> \n" +
    "                        		  <span class=\"minds-blue\" ng-if=\"!notification.entityObj.title\">your post</span> \n" +
    "                        		  were accepted.\n" +
    "                        		</p>\n" +
    "                        		<p ng-if=\"notification.params.points\">{{notification.params.points}} points for \n" +
    "                        		  <span class=\"minds-blue\" ng-if=\"notification.entityObj.title\" ng-bind-html=\"notification.entityObj.title\"></span> \n" +
    "                                  <span class=\"minds-blue\" ng-if=\"!notification.entityObj.title\">your post</span> \n" +
    "                                   were accepted.</p>\n" +
    "                        	</a>\n" +
    "                        </div>\n" +
    "                        <div ng-switch-when=\"boost_completed\">\n" +
    "                        	<a href=\"#/tab/notifications/entity/{{notification.entityObj.guid}}\">\n" +
    "                        		<p>{{notification.params.impressions}}/{{notification.params.impressions}} views for \n" +
    "                        		  <span class=\"minds-blue\"  ng-if=\"notification.entityObj.title\" ng-bind-html=\"notification.entityObj.title\"></span> \n" +
    "                        		  <span class=\"minds-blue\" ng-if=\"!notification.entityObj.title\">your post</span> \n" +
    "                        		  have been met.</p>\n" +
    "                        	</a>\n" +
    "                        </div>\n" +
    "                        <!-- Points prompt -->\n" +
    "                        <div ng-switch-when=\"custom_message\">\n" +
    "                            <a>\n" +
    "                                <p ng-bind-html=\"notification.params.message\"></p>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        <div ng-switch-when=\"welcome_points\">\n" +
    "                            <a href=\"#/tab/newsfeed/wallet\">\n" +
    "                                <p>Welcome to Minds. We have given you  <span class=\"minds-blue\">100 points</span> to get you started.</p>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        <!-- tutorial/promts -->\n" +
    "                        <div ng-switch-when=\"welcome_post\">\n" +
    "                            <a href=\"#/tab/capture\">\n" +
    "                                <p><span class=\"minds-blue\">Tap here</span> to create a post</p>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        <div ng-switch-when=\"welcome_boost\">\n" +
    "                            <a href=\"#/tab/newsfeed/channel/me\">\n" +
    "                                <p>You can gain more reach by boosting your content. Hit the blue boost icon on your posts.</p>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        <div ng-switch-when=\"welcome_chat\">\n" +
    "                            <a href=\"#/tab/gatherings/conversations\">\n" +
    "                                <p>Chat securely with your mutual subscriptions. <span class=\"minds-blue\">Tap here.</span></p>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        <div ng-switch-when=\"welcome_discover\">\n" +
    "                            <a href=\"#/tab/discover\">\n" +
    "                                <p><span class=\"minds-blue\">Tap here.</span> to discover new channels and media.</p>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        \n" +
    "                        <div ng-switch-default>\n" +
    "                        	<i>Sorry, there was an error viewing this notification</i>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    \n" +
    "                    <span class=\"ts\">{{ notification.time_created * 1000 | date : 'medium' }}</span>\n" +
    "                    \n" +
    "                    <i class=\"icon ion-person-add notification-user-subscribe\" \n" +
    "						ng-if=\"notification.fromObj.subscribed == false && $root.user_guid != notification.fromObj.guid\"\n" +
    "						ng-click=\"subscribe(notification)\"> </i>\n" +
    "                   \n" +
    "                 </div>\n" +
    "			</div>\n" +
    "\n" +
    "		</ion-list>\n" +
    "		\n" +
    "		<ion-infinite-scroll on-infinite=\"loadMore()\" distance=\"1%\" ng-if=\"hasMoreData\"></ion-infinite-scroll>\n" +
    "\n" +
    "	</ion-content>\n" +
    "</ion-view>");
  $templateCache.put("templates/notifications/p2p-review.html",
    "<ion-view title=\"Boost Review\" ng-controller=\"NotificationsP2PReviewCtrl\" class=\"view-bg\">\n" +
    "\n" +
    "    <ion-nav-buttons side=\"left\">\n" +
    "        <a class=\"button button-clear icon ion-arrow-left-b\" href=\"#/tab/notifications\"></a>\n" +
    "    </ion-nav-buttons>\n" +
    "\n" +
    "	<ion-content>\n" +
    "\n" +
    "		<ion-list>\n" +
    "		\n" +
    "			<ion-refresher\n" +
    "				pulling-text=\"Pull to refresh...\"\n" +
    "				on-refresh=\"refresh()\">\n" +
    "			</ion-refresher>\n" +
    "			\n" +
    "			<div class=\"notification-item list card item-text-wrap\" ng-repeat=\"boost in review\">\n" +
    "				<div class=\"item item-avatar item-text-wrap\">\n" +
    "				    <img ng-src=\"{{$root.node_url}}icon/{{boost.owner_guid}}\" ng-click=\"goToChannel(boost.owner_guid)\"/>\n" +
    "				     <a ng-click=\"loadBoostReview(boost.guid)\">\n" +
    "                        <p>{{boost.ownerObj.name}} is offering you {{boost.points}} points to boost \n" +
    "                            <span class=\"minds-blue\" ng-if=\"boost.title\" ng-bind-html=\"boost.title\"></span>\n" +
    "                            <span class=\"minds-blue\" ng-if=\"!boost.title\">their activity</span>\n" +
    "                       </p>\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "			</div>\n" +
    "			\n" +
    "			<div class=\"notification-item list card item-text-wrap\" ng-if=\"!review.length\">\n" +
    "                <div class=\"item item-text-wrap\">\n" +
    "                    <a>\n" +
    "                        <p>\n" +
    "                            You have no channel boosts to review.\n" +
    "                        </p>\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "		</ion-list>\n" +
    "		\n" +
    "		<ion-infinite-scroll on-infinite=\"loadMore()\" distance=\"1%\" ng-if=\"hasMoreData\"></ion-infinite-scroll>\n" +
    "\n" +
    "	</ion-content>\n" +
    "</ion-view>");
  $templateCache.put("templates/wallet/balance.html",
    "<ion-view title=\"Wallet\" ng-controller=\"WalletCtrl\" class=\"view-bg\">\n" +
    "\n" +
    "	<!--<ion-nav-buttons side=\"left\">\n" +
    "		<a class=\"button button-clear\" style=\"color:red;\" href=\"#/tab/newsfeed/wallet\">\n" +
    "			Withdraw\n" +
    "		</a>\n" +
    "	</ion-nav-buttons>-->\n" +
    "	\n" +
    "	<ion-nav-buttons side=\"right\">\n" +
    "		<a class=\"button button-clear\" style=\"color:green;\" href=\"#/tab/newsfeed/wallet/deposit\">\n" +
    "			Purchase\n" +
    "		</a>\n" +
    "	</ion-nav-buttons>\n" +
    "\n" +
    "	<ion-content>\n" +
    "\n" +
    "		<i class=\"icon icon-bank\" style=\"text-align:center; font-size:200px; line-height:220px; width:100%; display:block;\"></i>\n" +
    "		\n" +
    "		<h3 style=\"text-align:center; color:green\">{{points}} points</h3>\n" +
    "		<!--<p style=\"text-align:center\"><i class=\"icon ion-social-bitcoin\"></i> {{btc}}</p>\n" +
    "		<p style=\"text-align:center\"><i class=\"icon ion-social-usd\"></i> {{usd}}</p>-->\n" +
    "		<p style=\"text-align:center\">1 point = {{boost_rate}} view<span ng-if=\"boost_rate != 1\">s</span></p>		\n" +
    "		\n" +
    "		<!--<div class=\"wallet-buttons\">\n" +
    "			<a href=\"#/tab/newsfeed/wallet/\" class=\"wallet-button\" style=\"background:red;color:#FFF;\">Withdraw</a>\n" +
    "			<a href=\"#/tab/newsfeed/wallet/deposit\" class=\"wallet-button\" style=\"background:green;color:#FFF;\">Deposit</a>\n" +
    "		</div>-->\n" +
    "		\n" +
    "		\n" +
    "		<ion-list>\n" +
    "			<a class=\"item card transaction\" ng-repeat=\"transaction in transactions\">\n" +
    "				<span class=\"point\" ng-show=\"transaction.points > 0\">+{{transaction.points | abbr }}</span>\n" +
    "				<span class=\"point negative\" ng-show=\"transaction.points < 0\">{{transaction.points | abbr}}</span>\n" +
    "				<p>{{transaction.description}}</p>\n" +
    "				<p class=\"ts\">{{transaction.time_created * 1000 | date:\"MM/dd/yyyy 'at' h:mma\"}}</p>\n" +
    "			</a>\n" +
    "		</ion-list>\n" +
    "		<ion-infinite-scroll on-infinite=\"loadMore()\" distance=\"1%\" ng-if=\"hasMoreData\"></ion-infinite-scroll>\n" +
    "\n" +
    "	</ion-content>\n" +
    "</ion-view>");
  $templateCache.put("templates/wallet/boost.html",
    "<ion-modal-view ng-controller=\"BoostCtrl\" class=\"view-bg\">\n" +
    "	\n" +
    "\n" +
    "	<ion-header-bar>\n" +
    "		<div class=\"buttons\">\n" +
    "	    	<button class=\"button button-clear\" ng-click=\"modal.remove()\">Cancel</button>\n" +
    "	    	\n" +
    "	 	 </div>\n" +
    "	  	<h1 class=\"title\">Boost</h1>\n" +
    "	  	<div class=\"buttons\">\n" +
    "	  	   <a class=\"button button-clear icon icon-bank\" href=\"#/tab/newsfeed/wallet\" ng-click=\"modal.remove()\">\n" +
    "			<wallet-counter></wallet-counter>\n" +
    "			</a>\n" +
    "	  	</div>\n" +
    "	</ion-header-bar>\n" +
    "	\n" +
    "	<ion-content>\n" +
    "	\n" +
    "		<div class=\"wallet-points-input\">\n" +
    "			<div class=\"cell\">\n" +
    "				<input type=\"number\" ng-model=\"data.points\" placeholder=\"Tap to enter points\"/> \n" +
    "			</div>\n" +
    "			<div class=\"cell\">\n" +
    "				<label>Points</label>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		\n" +
    "		<div class=\"wallet-points-input\">\n" +
    "			<div class=\"cell\">\n" +
    "				<input type=\"number\" ng-model=\"data.impressions\" disabled/> \n" +
    "			</div>\n" +
    "			<div class=\"cell\">\n" +
    "				<label>Views</label>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		\n" +
    "		<button class=\"button wallet-purchase-button\" ng-click=\"boost()\">Boost!</button>\n" +
    "	\n" +
    "	</ion-content>\n" +
    "</ion-modal-view>");
  $templateCache.put("templates/wallet/deposit.html",
    "<ion-view title=\"Wallet\" ng-controller=\"WalletDepositCtrl\" class=\"view-bg\">\n" +
    "\n" +
    "	<ion-nav-buttons side=\"left\">\n" +
    "		<a class=\"button button-clear\" href=\"#/tab/newsfeed/wallet\">Wallet</a>\n" +
    "	</ion-nav-buttons>\n" +
    "\n" +
    "	<ion-content>\n" +
    "\n" +
    "		<div class=\"quote\" ng-if=\"step == 'quote'\">\n" +
    "			<div class=\"wallet-points-input\">\n" +
    "				<div class=\"cell\">\n" +
    "					<input type=\"number\" ng-model=\"data.points\" /> \n" +
    "				</div>\n" +
    "				<div class=\"cell\">\n" +
    "					<label>Points</label>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			\n" +
    "			<div class=\"wallet-points-input\">\n" +
    "				<div class=\"cell\">\n" +
    "					<input type=\"text\" ng-model=\"data.usd\" disabled /> \n" +
    "				</div>\n" +
    "				<div class=\"cell\">\n" +
    "					<label>$ USD</label>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			\n" +
    "			<button class=\"button wallet-purchase-button\" ng-click=\"proccessPaypal()\">Purchase Points</button>\n" +
    "		</div>\n" +
    "		\n" +
    "		<div ng-if=\"step == 'purchase'\">\n" +
    "				\n" +
    "			<div class=\"list wallet-card-input\">\n" +
    "			  <label class=\"item item-input item-stacked-label\">\n" +
    "			    <span class=\"input-label\">Card number</span>\n" +
    "			    <input type=\"number\" ng-model=\"card.number\"  placeholder=\"type here..\"/>\n" +
    "			  </label>\n" +
    "			  <label class=\"item item-input item-stacked-label\">\n" +
    "			    <span class=\"input-label\">Card Type</span>\n" +
    "			   	<select ng-model=\"card.type\">\n" +
    "			   		<option>visa</option>\n" +
    "			   		<option>mastercard</option>\n" +
    "			   		<option>amex</option>\n" +
    "			   	</select>\n" +
    "			  </label>\n" +
    "			  <label class=\"item item-input item-stacked-label\">\n" +
    "			    <span class=\"input-label\">Expiry Month (MM)</span>\n" +
    "				<input type=\"number\" ng-model=\"card.month\" placeholder=\"MM\" class=\"expiry\"/>\n" +
    "			  </label>\n" +
    "		      <label class=\"item item-input item-stacked-label\">\n" +
    "			    <span class=\"input-label\">Expiry Year (YYYY)</span>\n" +
    "				<input type=\"number\" ng-model=\"card.year\" placeholder=\"YYYY\" class=\"expiry\"/>\n" +
    "			  </label>\n" +
    "			  <label class=\"item item-input item-stacked-label\">\n" +
    "			    <span class=\"input-label\">Security (CCV/SEC)</span>\n" +
    "			    <input type=\"number\" ng-model=\"card.sec\" placeholder=\"3 digit security (usually on back of card).\"/>\n" +
    "			  </label>\n" +
    "			  <label class=\"item item-input item-stacked-label\">\n" +
    "			    <span class=\"input-label\">First name</span>\n" +
    "			    <input type=\"text\" ng-model=\"card.name\"  placeholder=\"type here..\"/>\n" +
    "			  </label>\n" +
    "			  <label class=\"item item-input item-stacked-label\">\n" +
    "			    <span class=\"input-label\">Lastname name</span>\n" +
    "			  	<input type=\"text\" ng-model=\"card.name2\" placeholder=\"type here..\"/>\n" +
    "			  </label>\n" +
    "			  \n" +
    "			  <button class=\"button wallet-purchase-button\" ng-click=\"process()\">Confirm</button>\n" +
    "			  \n" +
    "			</div>\n" +
    "				\n" +
    "		</div>\n" +
    "		\n" +
    "		<div ng-if=\"step == 'complete'\">\n" +
    "			<h3 style=\"color:green; text-align:center\">Congratulations!</h3>\n" +
    "		</div>\n" +
    "\n" +
    "	</ion-content>\n" +
    "</ion-view>");
  $templateCache.put("templates/wallet/review_boost.html",
    "<ion-modal-view ng-controller=\"BoostReviewCtrl\" class=\"view-bg\">\n" +
    "	\n" +
    "\n" +
    "	<ion-header-bar>\n" +
    "		<div class=\"buttons\">\n" +
    "	    	<button class=\"button button-clear\" ng-click=\"modal.remove()\">Close</button>\n" +
    "	 	 </div>\n" +
    "	  	<h1 class=\"title\">Review</h1>\n" +
    "	</ion-header-bar>\n" +
    "	\n" +
    "	<ion-content>\n" +
    "	\n" +
    "	   <div ng-if=\"error\">\n" +
    "	       We couldn't load this post.\n" +
    "	   </div>\n" +
    "	\n" +
    "        <div class=\"wallet-points-input\">\n" +
    "            <div class=\"cell\">\n" +
    "                <input type=\"text\" value=\"+ {{points}}\" disabled/> \n" +
    "            </div>\n" +
    "            <div class=\"cell\">\n" +
    "                <label>Points</label>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "	   \n" +
    "        <div class=\"wallet-points-input\" style=\"width:100%;\">\n" +
    "            <div class=\"cell\">\n" +
    "                <div class=\"button\" style=\"width:100%; background:green; color:#FFF;\" ng-click=\"accept()\">Accept</div>\n" +
    "            </div>\n" +
    "            <div class=\"cell\">\n" +
    "               <div class=\"button\" style=\"width:100%; background:red; color:#FFF;\" ng-click=\"reject()\">Reject</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "	   \n" +
    "	\n" +
    "	   <div ng-switch=\"entity.type\">\n" +
    "            <div ng-switch-when=\"object\" ng-controller=\"DiscoverCtrl\">\n" +
    "                <div class=\"list card tabs-background-white \" ng-include src=\"'templates/discover/entities/object.html'\"></div>\n" +
    "            </div>\n" +
    "            <div ng-switch-when=\"activity\" ng-controller=\"NewsfeedCtrl\">\n" +
    "                <activity-view class=\"activity-item list card\"></activity-view>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        \n" +
    "	\n" +
    "	</ion-content>\n" +
    "</ion-modal-view>");
}]);

});
