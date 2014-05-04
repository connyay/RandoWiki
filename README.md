# RandoWiki
---

## Local copy:

1. `git clone https://github.com/connyay/RandoWiki.git`
2. `http-server`
3. Done!

---
## Local dev:
1. `git clone https://github.com/connyay/RandoWiki.git`
2. Install dependencies (`bower install` & `npm install`)
3. Comment out built script and styles in index.html (b/styles.css and b/main)
4. Uncomment dev script and styles (css/styles.css and js/main)
5. `http-server -c-1`
6. Done!

Spin up a local build with `gulp fullbuild`

<br>

## Under the Hood
---
* [BackboneJS](https://github.com/jashkenas/backbone)
	- [Backbone.VirtualCollection](https://github.com/p3drosola/Backbone.VirtualCollection)
	- [Backbone.localStorage](https://github.com/jeromegn/Backbone.localStorage)
* [MarionetteJS](https://github.com/marionettejs/backbone.marionette)
* [RequireJS](https://github.com/jrburke/requirejs)
* [Bootstrap](https://github.com/twbs/bootstrap)