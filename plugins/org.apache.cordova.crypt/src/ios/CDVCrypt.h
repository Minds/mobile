/*
 Licence TBC
 */

#import <UIKit/UIKit.h>
#import <Cordova/CDVPlugin.h>

@interface CDVCrypt : CDVPlugin

- (NSString *)decryptFromCipherText:(NSString *)cipherText;

@end
