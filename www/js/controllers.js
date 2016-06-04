angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$cordovaOauth, $location) {

  $scope.login = function() {
    $cordovaOauth.facebook("APP ID Here", ["email","user_website", "user_location", "user_relationships"]).then(function(result) {
      localStorage.accessToken = result.access_token;
      $location.path("/chats");
    }, function(error) {
      alert("There was a problem signing in!  See the console for logs");
      console.log(error);
    });
  };
})

.controller('ChatsCtrl', function($scope, Chats,$http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // $scope.chats = Chats.all();
  // $scope.remove = function(chat) {
  //   Chats.remove(chat);
  // };
  $scope.init = function() {
    if(localStorage.hasOwnProperty("accessToken") === true) {
      $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: localStorage.accessToken, fields: "id,name,email,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
        $scope.profileData = result.data;
      }, function(error) {
        alert("There was a problem getting your profile.  Check the logs for details.");
        console.log(error);
      });
    } else {
      alert("Not signed in");
      $location.path("/login");
    }
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $http, $location) {
  $scope.init = function() {
    if(localStorage.hasOwnProperty("accessToken") === true) {
      $http.get("https://graph.facebook.com/v2.2/me/feed", { params: { access_token: localStorage.accessToken, format: "json" }}).then(function(result) {
        $scope.feedData = result.data.data;
        alert(result.data.data);
        $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: localStorage.accessToken, fields: "picture", format: "json" }}).then(function(result) {
          $scope.feedData.myPicture = result.data.picture.data.url;
        });
      }, function(error) {
        alert("There was a problem getting your profile.  Check the logs for details.");
        console.log(error);
      });
    } else {
      alert("Not signed in");
      $location.path("/login");
    }
  };
});
