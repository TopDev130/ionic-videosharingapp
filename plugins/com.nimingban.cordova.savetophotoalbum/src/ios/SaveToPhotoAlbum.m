#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVPluginResult.h>
#import <Foundation/NSException.h>
#import "SaveToPhotoAlbum.h"

@implementation SaveToPhotoAlbum

- (void)save:(CDVInvokedUrlCommand*)command {
	[self.commandDelegate runInBackground:^{
		NSString *url  = [command.arguments objectAtIndex:0];
        NSData *image = nil;

        if ([url hasPrefix:@"file://"]) {
          image = [NSData dataWithContentsOfFile:[NSURL URLWithString:url]];
        } else {
          image = [NSData dataWithContentsOfURL:[NSURL URLWithString:url]];
        } 
	    
        if (image != nil) {
          ALAssetsLibrary *assetLib = [[ALAssetsLibrary alloc] init];
          [assetLib writeImageDataToSavedPhotosAlbum:image metadata:nil completionBlock:^(NSURL *assetURL, NSError *error) {
            if (error) {
                CDVPluginResult * pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error.localizedDescription];
                [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            } else {
                NSString* urlString = [[self urlTransformer:assetURL] absoluteString];
                CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:urlString];
                [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            }
          }];
        }
        else {
            CDVPluginResult * pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"invalid url"];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
		
	}];
}

- (NSURL*) urlTransformer:(NSURL*)url
{
    NSURL* urlToTransform = url;

    SEL sel = NSSelectorFromString(@"urlTransformer");
    if ([self.commandDelegate respondsToSelector:sel]) {
        NSURL* (^urlTransformer)(NSURL*) = ((id(*)(id, SEL))objc_msgSend)(self.commandDelegate, sel);
        if (urlTransformer) {
            urlToTransform = urlTransformer(url);
        }
    }
    
    return urlToTransform;
}

@end
