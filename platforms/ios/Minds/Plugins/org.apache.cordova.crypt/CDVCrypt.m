/*
 License TBC
 */

#import <Cordova/CDV.h>
#import "CDVCrypt.h"
#include "RSA.h"
#include <stdio.h>
#include <string.h>
#include <openssl/rsa.h>
#include <openssl/pem.h>
#include <openssl/err.h>

@interface CDVCrypt () {}
@end

@implementation CDVCrypt

- (void)testme:(CDVInvokedUrlCommand*)command
{
    char *string = "you get this";
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[NSString stringWithUTF8String:string]];

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)encrypt:(CDVInvokedUrlCommand*)command
{
    
    //arguments passed from cordova
    NSString* dataString = [command.arguments objectAtIndex:0];
    NSString* publickeyString = [command.arguments objectAtIndex:1];
    
    //NSLog(@"Attempting to encrypt: %@", dataString);
    
    //load the public key
    const char *publickey = [publickeyString UTF8String];
    BIO *bio = BIO_new_mem_buf((void*)publickey, (int)strlen(publickey)+1000);
    RSA *rsa_publickey = PEM_read_bio_RSA_PUBKEY(bio, NULL, 0, NULL);
    BIO_free(bio);
    
    
    NSData *data = [dataString dataUsingEncoding:NSUTF8StringEncoding];
    
    // Allocate a buffer
    int maxSize = RSA_size(rsa_publickey);
    unsigned char *output = (unsigned char *) malloc(maxSize * [data length]);
    
    // Fill buffer with encrypted data
    int bytes = RSA_public_encrypt((int)[data length], [data bytes], output, rsa_publickey, RSA_PKCS1_PADDING);
    
    // If you want a NSData object back
    NSData *raw_cipher = [NSData dataWithBytes:output length:bytes];
    NSString* encrypted_string = [raw_cipher base64EncodedString];
    
    //NSLog(@"with cipher: %@", encrypted_string);

    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:encrypted_string];
    [pluginResult setKeepCallbackAsBool:YES]; 
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (BOOL)decrypt:(CDVInvokedUrlCommand*)command{

    //arguments passed from cordova
    NSString* dataString = [command.arguments objectAtIndex:0];
    NSString* privatekeyString = [command.arguments objectAtIndex:1];
    
    //NSLog(@"Attempting to decrypt: %@", dataString);
 //   NSLog(@"with the following private key: %@", privatekeyString);

    //load the private key
    const char *private_key = [privatekeyString UTF8String];
    BIO *bio = BIO_new_mem_buf((void *)private_key, 10000);
    RSA *rsa_privatekey = PEM_read_bio_RSAPrivateKey(bio, NULL, NULL, NULL);
    BIO_free(bio);
    
    if(rsa_privatekey == NULL){
        NSLog(@"Error with the private key");
        return nil;
    }
 
    NSData *decodedData = [[NSData alloc] initWithBase64EncodedString:dataString options:0];

    int maxSize = RSA_size(rsa_privatekey);
    char *decrypted = (unsigned char *)malloc(maxSize * [decodedData length]);
    char *err = NULL;
    if (RSA_private_decrypt([decodedData length], [decodedData bytes], decrypted, rsa_privatekey, RSA_PKCS1_PADDING) == -1) {
        ERR_load_CRYPTO_strings();
        fprintf(stderr, "Error %s\n", ERR_error_string(ERR_get_error(), err));
        fprintf(stderr, "Error %s\n", err);
        NSLog(@"Hmm, there was an error decrypting");
        return nil;
        
    }
    RSA_free(rsa_privatekey);

    //NSLog(@"with output: %@", [NSString stringWithUTF8String:(char *)decrypted]);
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[NSString stringWithUTF8String:(char *)decrypted]];
    [pluginResult setKeepCallbackAsBool:YES]; 
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    
    return true;
}

// decode the base64 string
+ (NSData *)base64DataFromString: (NSString *)string
{
    unsigned long ixtext, lentext;
    unsigned char ch, inbuf[4], outbuf[3];
    short i, ixinbuf;
    Boolean flignore, flendtext = false;
    const unsigned char *tempcstring;
    NSMutableData *theData;

    if (string == nil)
    {
        return [NSData data];
    }

    ixtext = 0;

    tempcstring = (const unsigned char *)[string UTF8String];

    lentext = [string length];

    theData = [NSMutableData dataWithCapacity: lentext];

    ixinbuf = 0;

    while (true)
    {
        if (ixtext >= lentext)
        {
            break;
        }

        ch = tempcstring [ixtext++];

        flignore = false;

        if ((ch >= 'A') && (ch <= 'Z'))
        {
            ch = ch - 'A';
        }
        else if ((ch >= 'a') && (ch <= 'z'))
        {
            ch = ch - 'a' + 26;
        }
        else if ((ch >= '0') && (ch <= '9'))
        {
            ch = ch - '0' + 52;
        }
        else if (ch == '+')
        {
            ch = 62;
        }
        else if (ch == '=')
        {
            flendtext = true;
        }
        else if (ch == '/')
        {
            ch = 63;
        }
        else
        {
            flignore = true;
        }

        if (!flignore)
        {
            short ctcharsinbuf = 3;
            Boolean flbreak = false;

            if (flendtext)
            {
                if (ixinbuf == 0)
                {
                    break;
                }

                if ((ixinbuf == 1) || (ixinbuf == 2))
                {
                    ctcharsinbuf = 1;
                }
                else
                {
                    ctcharsinbuf = 2;
                }

                ixinbuf = 3;

                flbreak = true;
            }

            inbuf [ixinbuf++] = ch;

            if (ixinbuf == 4)
            {
                ixinbuf = 0;

                outbuf[0] = (inbuf[0] << 2) | ((inbuf[1] & 0x30) >> 4);
                outbuf[1] = ((inbuf[1] & 0x0F) << 4) | ((inbuf[2] & 0x3C) >> 2);
                outbuf[2] = ((inbuf[2] & 0x03) << 6) | (inbuf[3] & 0x3F);

                for (i = 0; i < ctcharsinbuf; i++)
                {
                    [theData appendBytes: &outbuf[i] length: 1];
                }
            }

            if (flbreak)
            {
                break;
            }
        }
    }

    return theData;
}


@end
