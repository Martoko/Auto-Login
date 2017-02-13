#=require login_page.coffee

class MitItuLoginPage extends LoginPage
  constructor: ->
    super()

  selectUsernameInput: ->
    document.querySelector("input[name=auth_login]")

  selectPasswordInput: ->
    document.querySelector("input[name=auth_password]")

  selectForm: ->
    document.querySelector("form[name=login]")

  displayMessageToUser: (message, color) ->
    hook = @form.querySelector("table")
    hook.insertAdjacentHTML("beforeEnd", @createUserMessage(message, color))

  textIsErrorText: (text) ->
    errors = ["email and password do not match"
              "enter email and password"]
    lowerCaseText = text.toLowerCase()
    for error in errors
      return true if lowerCaseText.includes(error)
    return false
    
  hasError: () ->
    trElements = document.querySelectorAll("tr")

    for element in trElements
      if this.textIsErrorText(element.textContent)
        return true
    return false
