#=require itu_wayf_login_page.coffee
#=require itu_adfs_login_page.coffee
#=require mit_itu_login_page.coffee
#=require github_itu_login_page.coffee

class AutoLogin
  constructor: (loginPage) ->
    this.loginPage = loginPage

    if this.loginPage.hasError()
      this.loginPage.displayMessageToUser("Deleting stored credentials",
                                          "#292929")
      this.username = GM_deleteValue("username")
      this.password = GM_deleteValue("password")

    this.tryReadCredentials()

    if this.hasCredentials == true
      this.fillFormInputs()
      this.loginPage.submitForm()

  tryReadCredentials: () ->
    this.username = GM_getValue("username")
    this.password = GM_getValue("password")

    if this.username != undefined && this.password != undefined
      this.hasCredentials = true
      this.loginPage.displayMessageToUser("Signing in as " + this.username,
                                          "#292929")
    else
      this.hasCredentials = false

      this.loginPage.displayMessageToUser(
        "Saving user credentials", "#bc7100"
      )

      useCapture = false
      @loginPage.form.addEventListener("submit", (e) =>
        @username = @loginPage.usernameInput.value
        @password = @loginPage.passwordInput.value

        GM_setValue("username", @username)
        GM_setValue("password", @password)

        @loginPage.displayMessageToUser("Saved credentials", "green")
      , useCapture)

  fillFormInputs: () ->
    this.loginPage.usernameInput.value = this.username
    this.loginPage.passwordInput.value = this.password

document.addEventListener("DOMContentLoaded", (event) ->
  if window.location.hostname == "wayf.itu.dk"
    new AutoLogin(new ItuWayfLoginPage())
  else if window.location.hostname == "adfs.itu.dk"
    new AutoLogin(new ItuAdfsLoginPage())
  else if window.location.hostname == "mit.itu.dk"
    new AutoLogin(new MitItuLoginPage())
  else if window.location.hostname == "github.itu.dk"
    new AutoLogin(new GithubItuLoginPage())
)
