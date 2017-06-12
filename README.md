# Auto Login
A userscript that automatically logins to the sites you have configured under [about:blank#auto_login](about:blank#auto_login)

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

Build es6 to es5
```
gulp
```

The compiled JavaScript can then be found under `out/main.user.js`

To automatically build upon file changes in the `src` directory run
```
gulp watch
```
