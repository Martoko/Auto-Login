#=require login_page.coffee

class ItuAdfsLoginPage extends LoginPage
  constructor: ->
    super()

  selectUsernameInput: ->
    document.querySelector("#ctl00_ContentPlaceHolder1_UsernameTextBox")

  selectPasswordInput: ->
    document.querySelector("#ctl00_ContentPlaceHolder1_PasswordTextBox")

  selectForm: ->
    document.querySelector("form[name=aspnetForm]")

  submitForm: ->
    document.querySelector("#ctl00_ContentPlaceHolder1_SubmitButton").click()

  displayMessageToUser: (message, color) ->
    hook = document.querySelector("td.TextSizeSmall.TextColorError")
    hook.insertAdjacentHTML("beforeEnd", @createUserMessage(message, color))

  textIsErrorText: (text) ->
    text.toLowerCase().includes('incorrect')

  hasError: () ->
    error = document.querySelector("#ctl00_ContentPlaceHolder1_ErrorTextLabel")

    return error? && this.textIsErrorText(error.textContent)
