class PagesConfig {
  constructor() {
    this.loadPages();
    this.pagesDiv = document.createElement("div");

    let title = document.createElement("h1");
    title.innerText = "Auto login";
    document.body.appendChild(title);

    document.body.appendChild(this.pagesDiv);

    for (let page of this.pages) {
      this.pagesDiv.appendChild(this.createPageDiv(page));
    }

    this.pagesDiv.appendChild(this.createBottomPageDiv());

    let delete_all_button = document.createElement("button");
    delete_all_button.innerText = "delete all";
    delete_all_button.addEventListener("click", () => {
      this.pages = [];
      this.savePages();
      location.reload();
    });
    document.body.appendChild(document.createElement("br"));
    document.body.appendChild(delete_all_button);
  }

  savePages() {
    GM_setValue("pages", JSON.stringify(this.pages));
  }

  loadPages() {
    let pages_text = GM_getValue("pages");

    if (pages_text === undefined) {
      this.pages = [];
    } else {
      this.pages = JSON.parse(pages_text);
    }
  }

  createBottomPageDiv() {
    return this.createPageDiv(
      {"url": "",
      "username": "", "username_selector": "",
      "password": "", "password_selector": "",
      "form_selector": "", "submit_button_selector": "",
      "run_before": "", "must_have_selector": "",
      "bottom": true}
    );
  }

  createPageDiv(page) {
    let div = document.createElement("div");

    this.createAndAddTextField(div, page, "url");
    this.createAndAddTextField(div, page, "username");
    this.createAndAddTextField(div, page, "username_selector");
    this.createAndAddTextField(div, page, "password");
    this.createAndAddTextField(div, page, "password_selector");
    this.createAndAddTextField(div, page, "form_selector");
    this.createAndAddTextField(div, page, "submit_button_selector");
    this.createAndAddTextField(div, page, "run_before");
    this.createAndAddTextField(div, page, "must_have_selector");
    let delete_button = document.createElement("button");
    delete_button.innerText = "delete";
    delete_button.addEventListener("click", () => {
      if(page.bottom !== true) {
        this.pages.splice(this.pages.indexOf(page), 1);
        div.remove();
        this.savePages();
      }
    });
    div.appendChild(delete_button);

    return div;
  }

  createAndAddTextField(div, page, type) {
    let text_field = this.createTextField(page, type);
    div.appendChild(text_field);
  }

  createTextField(page, type) {
    let text_field = document.createElement("input");
    if(type === "password") {
      text_field.type = "password";
    } else {
      text_field.type = "text";
    }
    text_field.value = page[type];
    text_field.placeholder = type.replace(/_/g, " ");
    text_field.addEventListener("change", () => {
      page[type] = text_field.value.trim();

      if(page.bottom === true) {
        this.pages.push(page);
        this.pagesDiv.appendChild(this.createBottomPageDiv());
        delete page.bottom;
      }

      this.savePages();
    });

    return text_field;
  }
}
