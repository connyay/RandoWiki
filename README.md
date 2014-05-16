# RandoWiki
---

## Local copy:

1. `git clone https://github.com/connyay/RandoWiki.git`
2. `http-server`
3. Navigate to http://localhost:8080
4. Done!

---
## Local dev:
1. `git clone https://github.com/connyay/RandoWiki.git`
2. Install dependencies (`bower install` & `npm install`)
5. `http-server -c-1`
6. Navigate to http://localhost:8080/dev.html
7. Done!

**Use `gulp fullbuild` to build for production**

## Local testing:
Option A. `gulp mocha`  
Option B. Navigate to http://localhost:8080/SpecRunner.html  

<br>

## Under the Hood
---
* [BackboneJS](https://github.com/jashkenas/backbone)
	- [Backbone.VirtualCollection](https://github.com/p3drosola/Backbone.VirtualCollection)
	- [Backbone.localStorage](https://github.com/jeromegn/Backbone.localStorage)
* [MarionetteJS](https://github.com/marionettejs/backbone.marionette)
* [RequireJS](https://github.com/jrburke/requirejs)
* [Bootstrap](https://github.com/twbs/bootstrap)

## Supporting
* [Gulp](https://github.com/gulpjs/gulp)
* [Mocha](https://github.com/visionmedia/mocha)
* [Chai](https://github.com/chaijs/chai)