# cordova-save-to-photoalbum

iOS only. Save image file(gif, jpg, png) to photo album. Tested in iPhone4(iOS 7) and Simulator(iOS 9.0).

```js
document.addEventListener("deviceready", function(){
    var url = "http://example.com/images/1.gif" 
             || "file:///var/mobile/Applications/1.gif"
             || "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
    cordova.plugins.saveToPhotoAlbum.save(url, function(nativeURL){
        console.log(nativeURL);
    }, function(err){
        console.error(err);
    });
});
```


    
    
