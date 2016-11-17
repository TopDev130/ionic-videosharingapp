// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

    });
})


.config(function ($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
    $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS
})

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
      })

      .state('settings', {
          url: '/settings',
          templateUrl: 'templates/settings.html',
          controller: 'SettingsCtrl'
      })

  .state('search', {
      url: '/search',
      templateUrl: 'templates/search.html',
      controller: 'SearchCtrl'
  })

  .state('likes', {
      url: '/likes',
      templateUrl: 'templates/Likes.html',
      controller: 'LikesCtrl'
  })

  .state('comments', {
      url: '/comments',
      templateUrl: 'templates/Comments.html',
      controller: 'CommentsCtrl'
  })

  .state('shadows', {
      url: '/shadows',
      templateUrl: 'templates/Shadows.html',
      controller: 'ShadowsCtrl'
  })

   .state('contacts', {
      url: '/contacts',
      templateUrl: 'templates/contacts.html',
      controller: 'ContactsCtrl'
  })

  .state('shadowing', {
      url: '/shadowing',
      templateUrl: 'templates/Shadowing.html',
      controller: 'ShadowingCtrl'
  })

  .state('walkthrough', {
      url: '/walkthrough',
      templateUrl: 'templates/walkthrough.html',
      controller: 'DashCtrl'
  })

  .state('userprofile', {
      url: '/userprofile',
      templateUrl: 'templates/UserProfile.html',
      controller: 'UserProfileCtrl'
  })

  .state('post', {
      url: '/post',
      templateUrl: 'templates/Post.html',
      controller: 'PostCtrl'
  })

  .state('signup', {
      url: '/signup',
      templateUrl: 'templates/SignUp.html',
      controller: 'SignupCtrl'
  })

  .state('resetpassword', {
      url: '/resetpassword',
      templateUrl: 'templates/ResetPassword.html',
      controller: 'resetpasswordctrl'
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

    .state('app.dash', {
        url: '/dash',
        views: {
            'app-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('app.shocked', {
        url: '/shocked',
        views: {
            'app-shocked': {
                templateUrl: 'templates/tab-shocked.html',
                controller: 'ShockedCtrl'
            } 
        }
    })

    .state('app.shoot', {
        url: '/shoot',
        views: {
            'app-shoot': {
                templateUrl: 'templates/tab-shoot.html',
                controller: 'ShootCtrl'
            }
        }
    })   

    .state('app.chats', {
        url: '/chats',
        views: {
            'app-chats': {
                templateUrl: 'templates/tab-chats.html',
                controller: 'ChatsCtrl'
            }
        }
    })

    .state('app.account', {
        url: '/account',
        views: {
            'app-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    if (!localStorage.getItem("walkthrough")) {
        localStorage.setItem("walkthrough", true);
        $urlRouterProvider.otherwise('/walkthrough');
    }
    else if (localStorage.getItem("UserName") && localStorage.getItem("walkthrough")) {
        $urlRouterProvider.otherwise('/app/dash');
    }
    else {
        $urlRouterProvider.otherwise('/login');
    }
});
