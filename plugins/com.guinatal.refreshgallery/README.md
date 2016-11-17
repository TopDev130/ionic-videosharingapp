# Phonegap Plugin Refresh Gallery

I've created this plugin because when you save an image on android device, this image does not appears on gallery. This plugin updates the image gallery.

## Usage

You just need to include the following line in the config.xml

```xml
<gap:plugin name="com.guinatal.refreshgallery" />
```

After that, you invoke the method to refresh the image gallery.

```javascript
refreshMedia.refresh(path);
```

## Full Example

```javascript
window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {

  var fileTransfer = new FileTransfer();
  var uri = encodeURI("http://www.example.com/image");
  var path = fileSystem.root.toURL() + "appName/example.jpg";

  fileTransfer.download(
    uri,
    path,
    function(entry) {
      refreshMedia.refresh(path); // Refresh the image gallery
    },
    function(error) {
      console.log(error.source);
      console.log(error.target);
      console.log(error.code);
    },
    false,
    {
      headers: {
        "Authorization": "dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
      }
    }
  );

});
```

![Album](http://blog.guinatal.com/wp-content/uploads/2015/04/album.jpg)
