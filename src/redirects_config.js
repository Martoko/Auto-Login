class RedirectsConfig {
  constructor() {
    this.loadRedirects();
    this.redirectsDiv = document.createElement("div");

    let title = document.createElement("h1");
    title.innerText = "Redirects";
    document.body.appendChild(title);

    document.body.appendChild(this.redirectsDiv);

    for (let redirect of this.redirects) {
      this.redirectsDiv.appendChild(this.createRedirectDiv(redirect));
    }

    this.redirectsDiv.appendChild(this.createBottomRedirectDiv());

    let delete_all_button = document.createElement("button");
    delete_all_button.innerText = "delete all";
    delete_all_button.addEventListener("click", () => {
      this.redirects = [];
      this.saveRedirects();
      location.reload();
    });
    document.body.appendChild(document.createElement("br"));
    document.body.appendChild(delete_all_button);
  }

  saveRedirects() {
    GM_setValue("redirects", JSON.stringify(this.redirects));
  }

  loadRedirects() {
    let redirects_text = GM_getValue("redirects");

    if (redirects_text === undefined) {
      this.redirects = [];
    } else {
      this.redirects = JSON.parse(redirects_text);
    }
  }

  createBottomRedirectDiv() {
    return this.createRedirectDiv(
      {"url": "", "must_have_selector": "", "redirect_to": "",
      "bottom": true}
    );
  }

  createRedirectDiv(redirect) {
    let div = document.createElement("div");

    this.createAndAddTextField(div, redirect, "url");
    this.createAndAddTextField(div, redirect, "must_have_selector");
    this.createAndAddTextField(div, redirect, "redirect_to");
    let delete_button = document.createElement("button");
    delete_button.innerText = "delete";
    delete_button.addEventListener("click", () => {
      if(redirect.bottom !== true) {
        this.redirects.splice(this.redirects.indexOf(redirect), 1);
        div.remove();
        this.saveRedirects();
      }
    });
    div.appendChild(delete_button);

    return div;
  }

  createAndAddTextField(div, redirect, type) {
    let text_field = this.createTextField(redirect, type);
    div.appendChild(text_field);
  }

  createTextField(redirect, type) {
    let text_field = document.createElement("input");
    text_field.type = "text";
    text_field.value = redirect[type];
    text_field.placeholder = type.replace(/_/g, " ");
    text_field.addEventListener("change", () => {
      redirect[type] = text_field.value.trim();

      if(redirect.bottom === true) {
        this.redirects.push(redirect);
        this.redirectsDiv.appendChild(this.createBottomRedirectDiv());
        delete redirect.bottom;
      }

      this.saveRedirects();
    });

    return text_field;
  }
}
