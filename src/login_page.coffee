class LoginPage
  constructor: ->
    @usernameInput = @selectUsernameInput()
    @passwordInput = @selectPasswordInput()
    @form = @selectForm()

  submitForm: ->
    @form.submit()

  createUserMessage: (message, color) ->
    if(color == undefined)
      color = "inherit"

    "<p style='font-weight: bold; color: " + color + ";'>" + message + "</p>"
