#!/bin/sh

FWNAME=openssl
libtool=/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/libtool

if [ ! -d lib ]; then
    echo "Please run build-libssl.sh first!"
    exit 1
fi

if [ -d $FWNAME.framework ]; then
    echo "Removing previous $FWNAME.framework copy"
    rm -rf $FWNAME.framework
fi

if [ "$1" == "dynamic" ]; then
    LIBTOOL_FLAGS="-dynamic -undefined dynamic_lookup"
else
    LIBTOOL_FLAGS="-static"
fi

echo "Creating $FWNAME.framework"
mkdir -p $FWNAME.framework/Headers
$libtool -no_warning_for_no_symbols  $LIBTOOL_FLAGS -o $FWNAME.framework/$FWNAME lib/iOS/libcrypto.a lib/iOS/libssl.a
cp -r openssl-1.0.1m/include/$FWNAME/* $FWNAME.framework/Headers/
echo "Created $FWNAME.framework"
