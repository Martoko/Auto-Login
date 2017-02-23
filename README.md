# ITU-auto-login
A userscript that automatically logins to several ITU login pages

## Installing

You can fetch the latest release from the releases tab.
Installation requires [GreaseMonkey](http://www.greasespot.net/) and opening the *.user.js file in your browser.

## Building

Install node (for dealing with JavaScript)
```
apt install node
```

Install package dependencies
```
node install
```

Build coffeescript
```
gulp
```

The compiled JavaScript can then be found under `out/auto_login.user.js` and `out/auto_login.min.user.js`

To automatically build upon file changes in the `src` directory run
```
gulp watch
```
