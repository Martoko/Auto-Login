#=require login_page.coffee

class ItuWayfLoginPage extends LoginPage
  constructor: ->
    super()

  selectUsernameInput: ->
    document.querySelector("input#username")

  selectPasswordInput: ->
    document.querySelector("input#user_pass")

  selectForm: ->
    document.querySelector("input#btnLogin").form

  displayMessageToUser: (message, color) ->
    hook = document.querySelector(".LoginMessage")
    hook.insertAdjacentHTML("beforeBegin", @createUserMessage(message, color))

  textIsErrorText: (text) ->
    lowerCaseText = text.toLowerCase()
    lowerCaseText.includes('error') || lowerCaseText.includes('incorrect')


  hasError: () ->
    parent = document.querySelector("td.LoginBodyCell")

    boldElements = parent.querySelectorAll("p > b")

    for element in boldElements
      parentElement = element.parentElement
      if (parentElement.style.color == "red" &&
          this.textIsErrorText(parentElement.textContent))
        return true

    return false
