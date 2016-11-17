#import <Cordova/CDVPlugin.h>
#import <objc/message.h>
#import <AssetsLibrary/AssetsLibrary.h>

@interface SaveToPhotoAlbum : CDVPlugin {}

- (void)save:(CDVInvokedUrlCommand*)command;

@end
