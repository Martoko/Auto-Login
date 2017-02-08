// ==UserScript==
// @name        ITU WAYF auto login
// @namespace   mbas.itu.dk
// @include     https://wayf.itu.dk/module.php/core/loginuserpass.php*
// @require     itu_wayf_login_page.js
// @version     1.0
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// ==/UserScript==

var AutoLogin = (function() {
  function AutoLogin(loginPage) {
    this.loginPage = loginPage;

    if(this.loginPage.hasError()) {
      this.loginPage.displayMessageToUser("Deleting stored credentials");
      this.username = GM_deleteValue("username");
      this.password = GM_deleteValue("password");
    }

    this.tryReadCredentials();

    if(this.hasCredentials === true) {
      this.fillFormInputs();
      this.submitForm();
    }
  }

  AutoLogin.prototype.tryReadCredentials = function() {
    this.username = GM_getValue("username");
    this.password = GM_getValue("password");

    if(this.username !== undefined && this.password !== undefined) {
      this.hasCredentials = true;
      this.loginPage.displayMessageToUser("Signing in as " + this.username);
    } else {
      this.hasCredentials = false;

      this.loginPage.displayMessageToUser(
        "Saving user credentials", "#bc7100"
      );

      var _this = this;
      var useCapture = false;
      this.loginPage.getForm().addEventListener("submit", function(e) {
        _this.username = _this.loginPage.getUsernameInput().value;
        _this.password = _this.loginPage.getPasswordInput().value;

        GM_setValue("username", _this.username);
        GM_setValue("password", _this.password);

        _this.loginPage.displayMessageToUser("Saved credentials", "green");
      }, useCapture);
    }
  };

  AutoLogin.prototype.fillFormInputs = function() {
    this.loginPage.getUsernameInput().value = this.username;
    this.loginPage.getPasswordInput().value = this.password;
  };

  AutoLogin.prototype.submitForm = function() {
    this.loginPage.getForm().submit();
  };

  return AutoLogin;
})();

document.addEventListener("DOMContentLoaded", function(event) {
  var autoLogin;

  if(window.location.hostname === "wayf.itu.dk") {
    autoLogin = new AutoLogin(new ItuWayfLoginPage());
  }
});
