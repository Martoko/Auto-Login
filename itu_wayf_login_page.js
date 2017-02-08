var ItuWayfLoginPage = (function() {
  function ItuWayfLoginPage() {}

  ItuWayfLoginPage.prototype.displayMessageToUser = function(message, color) {
    if(color === undefined) {
      color = "inherit";
    }

    var hook = document.querySelector(".LoginMessage");
    hook.insertAdjacentHTML("beforeBegin", "<p style='font-weight: bold; color: " + color + ";'>" + message + "</p>");
  };

  ItuWayfLoginPage.prototype.getUsernameInput = function() {
    if(this.usernameInput === undefined) {
      this.usernameInput = document.querySelector("input#username");
    }

    return this.usernameInput;
  };

  ItuWayfLoginPage.prototype.getPasswordInput = function() {
    if(this.passwordInput === undefined) {
      this.passwordInput = document.querySelector("input#user_pass");
    }

    return this.passwordInput;
  };

  ItuWayfLoginPage.prototype.getForm = function() {
    if(this.form === undefined) {
      this.form = document.querySelector("input#btnLogin").form;
    }

    return this.form;
  };

  function textIsErrorText(text) {
    lowerCaseText = text.toLowerCase();
    return lowerCaseText.includes("error") ||
           lowerCaseText.includes("incorrect");
  }

  ItuWayfLoginPage.prototype.hasError = function() {
    parent = document.querySelector("td.LoginBodyCell");

    boldElements = parent.querySelectorAll("p > b");

    for (var element of boldElements) {
      var parentElement = element.parentElement;
      if (parentElement.style.color == "red" && textIsErrorText(parentElement.textContent))
      {
        return true;
      }
    }

    return false;
  };

  return ItuWayfLoginPage;
})();
