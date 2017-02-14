//
//  CardIOCordovaPlugin.h
//
//  Copyright 2013 PayPal Inc.
//  MIT licensed
//

#import <Cordova/CDV.h>
#import "CardIO.h"


@interface CardIOCordovaPlugin : CDVPlugin<CardIOPaymentViewControllerDelegate>

- (void)scan:(CDVInvokedUrlCommand *)command;
- (void)canScan:(CDVInvokedUrlCommand *)command;
- (void)version:(CDVInvokedUrlCommand *)command;

@end
