var cordova = require('cordova');

function SaveToPhotoAlbum() {
}
SaveToPhotoAlbum.prototype.save = function(url, onSuccess, onError){
  cordova.exec(onSuccess || function(result){
    console.log(result);
  }, onError || function(err){
    console.error(err);
  }, "SaveToPhotoAlbum", "save", [url]);
}

module.exports = new SaveToPhotoAlbum();