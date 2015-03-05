//
//  RSA.h
//  RSA Example
//
//  Created by JS Lim on 1/7/14.
//  Copyright (c) 2014 JS Lim. All rights reserved.
//

#ifndef JS_RSA_h
#define JS_RSA_h

char *js_private_decrypt(const char *cipher_text, const char *private_key_path);
char *js_public_encrypt(const char *plain_text, const char *public_key_path);

#endif