$(document).ready(function () {
});

angular.module('starter.controllers', ['ionic', 'ui.router'])

.controller('DashCtrl', function ($scope,$ionicSlideBoxDelegate, $ionicPopover, LoginService, $cordovaFile, $cordovaToast, $ionicPopup, $cordovaDevice, $ionicLoading, $state, $cordovaFileTransfer, $timeout) {
    $scope.startApp = function() {
        $state.go('login');
    };
    $scope.next = function() {
        $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };
    $scope.data = {}

    $scope.gosettings = function () {
        $state.go('settings');
    }

    $scope.gosearch = function () {
        $state.go('search');
    }

    $scope.GoLikes = function () {
        $state.go('likes');
    }

    $scope.GoComments = function () {
        $state.go('comments');
    }

    $scope.share = function () {
        window.plugins.socialsharing.share('Powered by jifflo.com', 'The subject');
    }


    $scope.goContacts = function () {
        $state.go('contacts');
    }

    $scope.gologout = function () {
        localStorage.clear();
        $state.go('login');
    } 


    $scope.gouserprofile = function () {
        $state.go('userprofile');
    }

    $scope.saveImage = function () {

        var platform = $cordovaDevice.getPlatform();
        if (platform.toLowerCase() == "android") {
            var url = "http://cdn.osxdaily.com/wp-content/uploads/2013/07/dancing-banana.gif";
            var filename = url.substring(url.lastIndexOf('/') + 1);
            var targetPath = cordova.file.externalRootDirectory + filename;
            var trustHosts = true;
            var options = {};
            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                .then(function (result) {
                  refreshMedia.refresh(targetPath);
                  $cordovaToast
                .show('Image Downloaded Successfully!', 'long', 'center')
                .then(function (success) {
                    // success
                }, function (error) {
                    // error
                });
            }, function (err) {
                  // Error
                  alert(JSON.stringify(err));
            }, function (progress) {
                  $timeout(function () {
                      $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                  });
              });
            //
        }
        else if (platform.toLowerCase() == "ios") {
            var url = "http://cdn.osxdaily.com/wp-content/uploads/2013/07/dancing-banana.gif";
            var filename = url.substring(url.lastIndexOf('/') + 1);
            cordova.plugins.saveToPhotoAlbum.save(url, function (nativeURL) {
                $cordovaToast
            .show('Image Downloaded Successfully!', 'long', 'center')
            .then(function (success) {
                // success
            }, function (error) {
                // error
            });
            }, function (err) {
                console.error(err);
            });
        }

    }


})

.controller('ShockedCtrl', function ($scope,$ionicSlideBoxDelegate, $ionicPopover, LoginService, $cordovaFile, $cordovaToast, $ionicPopup, $cordovaDevice, $ionicLoading, $state, $cordovaFileTransfer, $timeout) {
    $scope.data = {}

    $scope.gosettings = function () {
        $state.go('settings');
    }

    $scope.gosearch = function () {
        $state.go('search');
    }

    $scope.GoLikes = function () {
        $state.go('likes');
    }

    $scope.GoComments = function () {
        $state.go('comments');
    }

    $scope.share = function () {
        window.plugins.socialsharing.share('Powered by jifflo.com', 'The subject');
    }


    $scope.goContacts = function () {
        $state.go('contacts');
    }

    $scope.gologout = function () {
        localStorage.clear();
        $state.go('login');
    } 


    $scope.gouserprofile = function () {
        $state.go('userprofile');
    }

    $scope.saveImage = function () {

        var platform = $cordovaDevice.getPlatform();
        if (platform.toLowerCase() == "android") {
            var url = "http://cdn.osxdaily.com/wp-content/uploads/2013/07/dancing-banana.gif";
            var filename = url.substring(url.lastIndexOf('/') + 1);
            var targetPath = cordova.file.externalRootDirectory + filename;
            var trustHosts = true;
            var options = {};
            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
              .then(function (result) {
                  refreshMedia.refresh(targetPath);
                  $cordovaToast
.show('Image Downloaded Successfully!', 'long', 'center')
.then(function (success) {
    // success
}, function (error) {
    // error
});
              }, function (err) {
                  // Error
                  alert(JSON.stringify(err));
              }, function (progress) {
                  $timeout(function () {
                      $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                  });
              });
            //
        }
        else if (platform.toLowerCase() == "ios") {
            var url = "http://cdn.osxdaily.com/wp-content/uploads/2013/07/dancing-banana.gif";
            var filename = url.substring(url.lastIndexOf('/') + 1);
            cordova.plugins.saveToPhotoAlbum.save(url, function (nativeURL) {
                $cordovaToast
.show('Image Downloaded Successfully!', 'long', 'center')
.then(function (success) {
    // success
}, function (error) {
    // error
});
            }, function (err) {
                console.error(err);
            });
        }

    }


})

.controller('LoginCtrl', function ($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function () {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function (data) {
            localStorage.setItem("UserName", $scope.data.username);
            $state.go('app.dash');
        }).error(function (data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Incorrect Username or Password'  
            });
        });
    }
    $scope.gosignup = function () {
        $state.go('signup');
    }

    $scope.goresetpassword = function () {
        $state.go('resetpassword');
    }
})

.controller('ShootCtrl', function ($scope, $state, $cordovaDialogs, $sce, $cordovaCapture, $cordovaCamera) {
    $scope.getFileInfo = function (File) {
        var myVideos = [];
        var file = File.files["0"];
        myVideos.push(file);
        var video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = function () {
            window.URL.revokeObjectURL(this.src)
            if (video.duration <= 9) {
                var URLMain = $sce.trustAsResourceUrl(URL.createObjectURL(file));
                $scope.videoPlay = $sce.trustAsHtml('<video width="100%" id="videoData" autobuffer height="240" controls playsinline><source src="" ></video>')
                $scope.videoPlay = $sce.trustAsHtml('<video width="100%" id="videoData" autobuffer height="240" controls playsinline><source src="' + URLMain + '" ></video>')
                $state.reload();
            }
            else {
                $cordovaDialogs.alert('Video must be 9 seconds long or shorter', 'Error', 'OK')
    .then(function () {
        // callback success
    });
            }
        }
        video.src = URL.createObjectURL(file);
    }
    $scope.captureVideo = $scope.captureVideo = function () {
        var options = { limit: 1, duration: 9 };
        $cordovaCapture.captureVideo(options).then(
     function (videoData) {
         $scope.videoPlay = $sce.trustAsHtml('<video width="100%" id="videoData" autobuffer height="240" controls playsinline><source src="" ></video>')
         $scope.videoPlay = $sce.trustAsHtml('<video width="100%" id="videoData" autobuffer height="240" controls playsinline><source src="' + videoData[0].fullPath + '" ></video>')
     }, function (err) {
         console.log(err);
     })
    }

     $scope.gologout = function () {
        localStorage.clear();
        $state.go('login');
    } 
})

.controller('ChatsCtrl', function ($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.gosettings = function () {
        $state.go('settings');
    }

    $scope.gosearch = function () {
        $state.go('search');
    }

    $scope.GoPost = function () {
        $state.go('post');
    }

    $scope.GoUserProfile = function () {
        $state.go('userprofile');
    }

     $scope.goContacts = function () {
        $state.go('contacts');
    }

     $scope.gologout = function () {
        localStorage.clear();
        $state.go('login');
    } 

})

.controller('AccountCtrl', function ($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.gosettings = function () {
        $state.go('settings');
    }

    $scope.gosearch = function () {
        $state.go('search');
    }

    $scope.GoLikes = function () {
        $state.go('likes');
    }

    $scope.GoComments = function () {
        $state.go('comments');
    }

    $scope.share = function () {
        window.plugins.socialsharing.share('Powered by jifflo.com', 'The subject');
    }

    $scope.GoShadows = function () {
        $state.go('shadows');
    }

    $scope.GoShadowing = function () {
        $state.go('shadowing');
    }

     $scope.goContacts = function () {
        $state.go('contacts');
    }

     $scope.gologout = function () {
        localStorage.clear();
        $state.go('login');
    } 

})

.controller('SignupCtrl', function ($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.goback = function () {
        $state.go('login');
    }
})

.controller('resetpasswordctrl', function ($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.goback = function () {
        $state.go('login');
    }

})

.controller('SettingsCtrl', function ($scope, $cordovaCamera, LoginService, $cordovaDialogs, $ionicPopup, $ionicHistory, $state) {
    $scope.data = {};

    $scope.goback = function () {

        $ionicHistory.goBack();

    }

    $scope.gologout = function () {
        localStorage.clear();
        $state.go('login');
    } 

    $scope.openGallery = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: Camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $cordovaDialogs.alert(imageData, 'Image Path', 'OK')
.then(function () {
    // callback success
});
        }, function (err) {
            // error
        });
    }

})

.controller('SearchCtrl', function ($scope, LoginService, $ionicPopup, $state, $ionicHistory) {
    $scope.data = {};

    $scope.goback = function () {
        $ionicHistory.goBack();
    }

})

.controller('ContactsCtrl', function ($scope, LoginService, $ionicPopup, $state, $ionicHistory, $timeout) {
    $scope.data = {};

    $scope.goback = function () {
        $ionicHistory.goBack();
    }

    try{
            $timeout(function(){
                     function onSuccess(contacts) {
                        $scope.contacts = contacts;
                        console.log(contacts);
                        //alert('Found ' + contacts.length + ' contacts.');
                     };

                     function onError(contactError) {
                        //alert('onError!');
                     };

                     // find all contacts with 'Bob' in any name field
                     var options      = new ContactFindOptions();
                     options.hasPhoneNumber = true;
                     var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
                     navigator.contacts.find(fields, onSuccess, onError, options);

             });
    }catch(e){
          console.log(e);
    }
})

.controller('LikesCtrl', function ($scope, LoginService, $ionicPopup, $state, $ionicHistory) {
    $scope.data = {};

    $scope.goback = function () {
        $ionicHistory.goBack();
    }

    $scope.GoUserProfile = function () {
        $state.go('userprofile');
    }

})

.controller('CommentsCtrl', function ($scope, LoginService, $ionicPopup, $state, $ionicHistory) {
    $scope.data = {};

    $scope.goback = function () {
        $ionicHistory.goBack();
    }

    $scope.GoUserProfile = function () {
        $state.go('userprofile');
    }

})

.controller('ShadowsCtrl', function ($scope, LoginService, $ionicPopup, $state, $ionicHistory) {
    $scope.data = {};

    $scope.goback = function () {
        $ionicHistory.goBack();
    }

    $scope.GoUserProfile = function () {
        $state.go('userprofile');
    }

})
.controller('ShadowingCtrl', function ($scope, LoginService, $ionicPopup, $state, $ionicHistory) {
    $scope.data = {};

    $scope.goback = function () {
        $ionicHistory.goBack();
    }

    $scope.GoUserProfile = function () {
        $state.go('userprofile');
    }

})

.controller('UserProfileCtrl', function ($scope, LoginService, $ionicPopup, $state, $ionicHistory) {
    $scope.data = {};

    $scope.goback = function () {
        $ionicHistory.goBack();
    }

    $scope.GoLikes = function () {
        $state.go('likes');
    }

    $scope.GoComments = function () {
        $state.go('comments');
    }

    $scope.share = function () {
        window.plugins.socialsharing.share('Powered by jifflo.com', 'The subject');
    }

    $scope.GoShadows = function () {
        $state.go('shadows');
    }

    $scope.GoShadowing = function () {
        $state.go('shadowing');
    }

})

.controller('AppCtrl', function ($scope, $state, $ionicHistory) {
  $scope.goback = function () {

      $ionicHistory.goBack();
  }

  $scope.gosettings = function () {
      $state.go('settings');
  }

  $scope.gosearch = function () {
      $state.go('search');
  }

  $scope.goContacts = function () {
      $state.go('contacts');
  }

    $scope.gologout = function () {
        localStorage.clear();
        $state.go('login');
    } 

})

.controller('PostCtrl', function ($scope, LoginService, $ionicPopup, $state, $ionicHistory) {
    $scope.data = {};

    $scope.goback = function () {
        $ionicHistory.goBack();
    }

    $scope.GoUserProfile = function () {
        $state.go('userprofile');
    }

    $scope.GoLikes = function () {
        $state.go('likes');
    }

    $scope.GoComments = function () {
        $state.go('comments');
    }

    $scope.share = function () {
        window.plugins.socialsharing.share('Powered by jifflo.com', 'The subject');
    }
});
