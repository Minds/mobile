# Photo Viewer  
> This plugin is intended to show a picture from an URL into a Photo Viewer with zoom features.

## How to Install

```bash
cordova plugin add com-sarriaroman-photoviewer
```

### Android
> Out of the box

### iOS
> Out of the box


### API

#### Show an image

```
PhotoViewer.show('http://my_site.com/my_image.jpg', 'Optional Title');
```

Optionally you can pass third parameter which can be used to hide the share button [ONLY FOR ANDROID]

##### Usage

```
PhotoViewer.show('http://my_site.com/my_image.jpg', 'Optional Title', {share:false});
```

### Versions  
(1.0.2) Removed Podfile and the dependency  
(1.1.0)
- Removing project dependencies.  
- Moving to Gradle  
- Adding Square's Picasso as Image Loader  
- New Optional Title
- Share button and title bar
- Automatic close on error.
- Support for content:// Uris from Cordova
- Replaced old namespace
- Published to NPM  

(1.1.1)
- Fix for sharing due to online restriction

(1.1.2)
- Fix issues on iOS
- iOS title not updating

(1.1.3)
- Issue fixes

(1.1.4)
- Base64 Support on Android

(1.1.5)
- Option to hide and show share button on Android

(1.1.7)  
- Fix OOM issues on Android

(1.1.9/10)  
- Fix how image is shown on Android