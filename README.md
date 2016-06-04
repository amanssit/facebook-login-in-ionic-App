# facebook-login-in-ionic-App
facebook login in ionic App

## Installation

* $ bower install ngCordova
* $ bower install ng-cordova-oauth -S

The JavaScript library must then be added to your **index.html** file found in your projects **www**
directory:

     <script src="js/ng-cordova.min.js"></script>
    <script src="lib/ng-cordova-oauth/dist/ng-cordova-oauth.min.js"></script>

### Injecting:

Once added to your index.html file, you must inject the library into your **app.js** module.  Make your
**app.js** file look something like the following:

    angular.module('starter', ['ionic','ngCordova', 'ngCordovaOauth']) 
    
    
    
    ### Configure App-ID Here
   
```javascript
 $scope.login = function() {
    $cordovaOauth.facebook("APP ID Here", ["email","user_website", "user_location", "user_relationships"]).then(function(result) {
      localStorage.accessToken = result.access_token;
      $location.path("/chats");
    }, function(error) {
      alert("There was a problem signing in!  See the console for logs");
      console.log(error);
    });
  };
```
