Minds Mobile App
======

The minds mobile apps source code repository.

##Platforms
- iOS
- Android

##Tech

#####Cordova (http://cordova.apache.org/)
_Cordova (phonegap) is a fantastic tool which lets you run HTML5 in native apps._

#####Ionic (http://ionicframework.com/)
_Ionic is a framework for making ui/ux work well with your app._

#####Angularjs (https://angularjs.org/)
_Angularjs is a MVC framework which make maintaing and development app easy_

#####Requirejs (http://requirejs.org/)
_RequireJS is a file and module loader used to improve speed and quality of code and bring sanity to developers_

##Contributing

You will need to a few tools in order to contribute to this project:

#### NPM

Ubuntu:
```
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install -y nodejs
```

Mac:
```
brew install node
```
Don't have brew?
```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### Grunt
```
sudo npm -g install grunt-cli
```

#### Run-once setup

```
npm install
```

### Compiling / Building

You will need to run the following command to compile the css files.

```
grunt compile
```

##TODO:

- [x] Architect the base stucture
- [ ] Create controllers and views for:
  - [x] Newsfeed
  - [ ] Chat/Gatherings
  - [ ] Profile
  - [ ] Archive
    - [ ] Capture
    - [ ] View
- [ ] Build services to interact with API
  - [ ] Newsfeed
  - [ ] Chat/Gatherings
  - [ ] Profile
  - [ ] Archive
- [ ] Improve UI/UX
- [ ] Unit tests
