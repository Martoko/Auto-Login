#=require login_page.coffee

class GithubItuLoginPage extends LoginPage
  constructor: ->
    super()

  selectUsernameInput: ->
    document.querySelector("#login_field")

  selectPasswordInput: ->
    document.querySelector("#password")

  selectForm: ->
    document.querySelector("form[action='/session']")

  displayMessageToUser: (message, color) ->
    hook = document.querySelector("#js-flash-container")
    hook.insertAdjacentHTML("beforeEnd", @createUserMessage(message, color))

  textIsErrorText: (text) ->
    text.toLowerCase().includes('incorrect')

  hasError: () ->
    error = document.querySelector(".flash.flash-full.flash-error")

    return error != null
