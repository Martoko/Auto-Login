class LoginPage {
  constructor(page) {
    this.page = page;
  }

  login() {
    if(this.page.must_have_selector !== "") {
      let must_have_element =   document.querySelector(this.page.must_have_selector);
      if (must_have_element === null) {
        console.log("Canceling since page does not have: \"" + this.page.must_have_selector + "\"")
        return;
      }
    }

    if(this.page.run_before !== "") {
      eval(this.page.run_before);
    }
    this.inputValues();
    this.submitForm();
  }

  inputValues() {
    let username_input = document.querySelector(this.page.username_selector);
    let password_input = document.querySelector(this.page.password_selector);

    if(username_input === null) {
      console.error("Can't find username using: \"" + this.page.username_selector + "\"");
    } else {
      username_input.value = this.page.username;
    }

    if(password_input === null) {
      console.error("Can't find password using: \"" + this.page.password_selector + "\"");
    } else {
      password_input.value = this.page.password;
    }
  }

  submitForm() {
    let button_selector = this.page.submit_button_selector;
    if(button_selector !== "") {
      let submit_button = document.querySelector(button_selector);

      if(submit_button === null) {
        console.error("Can't find submit button using: \"" + button_selector + "\"");
      } else {
        submit_button.click();
      }
    }

    let form_selector = this.page.form_selector;
    if(form_selector !== "") {
      let form = document.querySelector(form_selector);

      if(form === null) {
        console.error("Can't find form using: \"" + form_selector + "\"");
      } else {
        form.submit();
      }
    }

    if(button_selector === "" && form_selector === "") {
      console.error("Cannot submit, not button or form selector provided");
    }
  }
}
