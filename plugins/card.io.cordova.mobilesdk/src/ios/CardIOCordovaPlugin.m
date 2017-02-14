//
//  CardIOCordovaPlugin.m
//
//  Copyright 2013 PayPal Inc.
//  MIT licensed
//

#import "CardIOCordovaPlugin.h"

#pragma mark -

@interface CardIOCordovaPlugin ()

@property (nonatomic, copy, readwrite) NSString *scanCallbackId;

- (void)sendSuccessTo:(NSString *)callbackId withObject:(id)objwithObject;
- (void)sendFailureTo:(NSString *)callbackId;

@end

#pragma mark -

@implementation CardIOCordovaPlugin


- (void)execute:(CDVInvokedUrlCommand *)command {
    [self scan:command];
}

- (void)scan:(CDVInvokedUrlCommand *)command {
    self.scanCallbackId = command.callbackId;
    NSDictionary* options = [command.arguments objectAtIndex:0];

    NSNumber *noCamera = [options objectForKey:@"noCamera"];
    BOOL isScanningEnabled = (noCamera != nil) ? ![noCamera boolValue] : true;

    CardIOPaymentViewController *paymentViewController = [[CardIOPaymentViewController alloc] initWithPaymentDelegate:self scanningEnabled:isScanningEnabled];

    NSNumber *collectCVV = [options objectForKey:@"requireCVV"];
    if (collectCVV) {
        paymentViewController.collectCVV = [collectCVV boolValue];
    }

    NSNumber *collectZip = [options objectForKey:@"requirePostalCode"];
    if (collectZip) {
        paymentViewController.collectPostalCode = [collectZip boolValue];
    }

    NSNumber *collectExpiry = [options objectForKey:@"requireExpiry"];
    if (collectExpiry) {
        paymentViewController.collectExpiry = [collectExpiry boolValue];
    }

    NSNumber *restrictPostalCodeToNumericOnly = [options objectForKey:@"restrictPostalCodeToNumericOnly"];
    if (restrictPostalCodeToNumericOnly) {
        paymentViewController.restrictPostalCodeToNumericOnly = [restrictPostalCodeToNumericOnly boolValue];
    }

    NSNumber *collectCardholderName = [options objectForKey:@"requireCardholderName"];
    if (collectCardholderName) {
        paymentViewController.collectCardholderName = [collectCardholderName boolValue];
    }

    NSNumber *useCardIOLogo = [options objectForKey:@"useCardIOLogo"];
    if (useCardIOLogo) {
        paymentViewController.useCardIOLogo = [useCardIOLogo boolValue];
    }

    NSNumber *scanExpiry = [options objectForKey:@"scanExpiry"];
    if (scanExpiry) {
        paymentViewController.scanExpiry = [scanExpiry boolValue];
    }

    NSString *guideColorString = [options objectForKey:@"guideColor"];
    if (guideColorString) {
        UIColor *guideColor = [CardIOCordovaPlugin colorFromHex:guideColorString];
        paymentViewController.guideColor = guideColor;
    }

    NSNumber *hideCardIOLogo = [options objectForKey:@"hideCardIOLogo"];
    if (hideCardIOLogo) {
        paymentViewController.hideCardIOLogo = [hideCardIOLogo boolValue];
    }

    NSNumber *suppressScanConfirmation = [options objectForKey:@"suppressConfirmation"];
    if (suppressScanConfirmation) {
        paymentViewController.suppressScanConfirmation = [suppressScanConfirmation boolValue];
    }

    NSNumber *disableManualEntryButtons = [options objectForKey:@"suppressManual"];
    if (disableManualEntryButtons) {
        paymentViewController.disableManualEntryButtons = [disableManualEntryButtons boolValue];
    }

    // if it is nil, its ok.
    NSString *languageOrLocale = [[[NSLocale alloc] initWithLocaleIdentifier:[options objectForKey:@"languageOrLocale"]] localeIdentifier];
    if (languageOrLocale) {
        paymentViewController.languageOrLocale = languageOrLocale;
    }

    // if it is nil, its ok.
    NSString *scanInstructions = [[[NSLocale alloc] initWithLocaleIdentifier:[options objectForKey:@"scanInstructions"]] localeIdentifier];
    if (scanInstructions) {
        paymentViewController.scanInstructions = scanInstructions;
    }

    [self.viewController presentViewController:paymentViewController animated:YES completion:nil];

}

- (void)canScan:(CDVInvokedUrlCommand *)command {
    BOOL canScan = [CardIOUtilities canReadCardWithCamera];
    [self sendSuccessTo:command.callbackId withObject:[NSNumber numberWithBool:canScan]];
}

- (void)version:(CDVInvokedUrlCommand *)command {
    NSString *version = [CardIOUtilities libraryVersion];

    if(version) {
        [self sendSuccessTo:command.callbackId withObject:version];
    } else {
        [self sendFailureTo:command.callbackId];
    }
}


#pragma mark - CardIOPaymentViewControllerDelegate methods

- (void)userDidProvideCreditCardInfo:(CardIOCreditCardInfo *)info inPaymentViewController:(CardIOPaymentViewController *)pvc {

    [pvc dismissViewControllerAnimated:YES completion:^{
      // Convert CardIOCreditCardInfo into dictionary for passing back to javascript
      NSMutableDictionary *response = [NSMutableDictionary dictionaryWithObjectsAndKeys:
                                       info.cardNumber, @"cardNumber",
                                       info.redactedCardNumber, @"redactedCardNumber",
                                       [CardIOCreditCardInfo displayStringForCardType:info.cardType
                                                                usingLanguageOrLocale:pvc.languageOrLocale],
                                       @"cardType",
                                       nil];
      if(info.expiryMonth > 0 && info.expiryYear > 0) {
        [response setObject:[NSNumber numberWithUnsignedInteger:info.expiryMonth] forKey:@"expiryMonth"];
        [response setObject:[NSNumber numberWithUnsignedInteger:info.expiryYear] forKey:@"expiryYear"];
      }
      if(info.cvv.length > 0) {
        [response setObject:info.cvv forKey:@"cvv"];
      }
      if(info.postalCode.length > 0) {
        [response setObject:info.postalCode forKey:@"postalCode"];
      }
      if(info.cardholderName.length > 0) {
        [response setObject:info.cardholderName forKey:@"cardholderName"];
      }

      [self sendSuccessTo:self.scanCallbackId withObject:response];
    }];
}

- (void)userDidCancelPaymentViewController:(CardIOPaymentViewController *)pvc {

    [pvc dismissViewControllerAnimated:YES completion:^{
      [self sendFailureTo:self.scanCallbackId];
    }];
}

#pragma mark - Cordova callback helpers

- (void)sendSuccessTo:(NSString *)callbackId withObject:(id)obj {
    CDVPluginResult *result = nil;

    if([obj isKindOfClass:[NSString class]]) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:obj];
    } else if([obj isKindOfClass:[NSDictionary class]]) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:obj];
    } else if ([obj isKindOfClass:[NSNumber class]]) {
        // all the numbers we return are bools
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:[obj intValue]];
    } else if(!obj) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    } else {
        NSLog(@"Success callback wrapper not yet implemented for class %@", [obj class]);
    }

    [self.commandDelegate sendPluginResult:result callbackId:callbackId];
}

- (void)sendFailureTo:(NSString *)callbackId {
    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    [self.commandDelegate sendPluginResult:result callbackId:callbackId];
}

#pragma mark - Private helper method

+ (UIColor *)colorFromHex:(NSString *)hexColor {
    // Extract an ASCII c string from matchedString.  The '#' character should not be
    // included.
    const char *hexColorCString = [[hexColor substringFromIndex:1] cStringUsingEncoding:NSASCIIStringEncoding];

    // Convert hexColorCString into an integer.
    unsigned long hexColorCode = strtoul(hexColorCString, NULL, 16);

    CGFloat red, green, blue;

    if ([hexColor length] - 1 > 3)
        // If the color code is in six digit notation...
    {
        // Extract each color component from the integer representation of the
        // color code.  Each component has a value of [0-255] which must be
        // converted into a normalized float for consumption by UIColor.
        red = ((hexColorCode & 0x00FF0000) >> 16) / 255.0f;
        green = ((hexColorCode & 0x0000FF00) >> 8) / 255.0f;
        blue = (hexColorCode & 0x000000FF) / 255.0f;
    }
    else
        // The color code is in shorthand notation...
    {
        // Extract each color component from the integer representation of the
        // color code.  Each component has a value of [0-255] which must be
        // converted into a normalized float for consumption by UIColor.
        red = (((hexColorCode & 0x00000F00) >> 8) | ((hexColorCode & 0x00000F00) >> 4)) / 255.0f;
        green = (((hexColorCode & 0x000000F0) >> 4) | (hexColorCode & 0x000000F0)) / 255.0f;
        blue = ((hexColorCode & 0x0000000F) | ((hexColorCode & 0x0000000F) << 4)) / 255.0f;
    }

    // Create and return a UIColor object with the extracted components.
    return [UIColor colorWithRed:red green:green blue:blue alpha:1.0f];
}

@end
