// =require login_page.js
// =require pages_config.js
// =require redirects_config.js


let pages_text = GM_getValue("pages");
let pages = [];

if (pages_text !== undefined) {
  pages = JSON.parse(pages_text);
}


for (let page of pages) {
  let reg_exp = new RegExp("^" + page.url.split("*").join(".*") + "$");

  if(reg_exp.test(window.location.href)) {
    console.log("Using autologin with the following filter " + reg_exp);
    let login_page = new LoginPage(page);
    login_page.login();
    break;
  }
}

let redirects_text = GM_getValue("redirects");
let redirects = [];

if (redirects_text !== undefined) {
  redirects = JSON.parse(redirects_text);
}


for (let redirect of redirects) {
  let reg_exp = new RegExp("^" + redirect.url.split("*").join(".*") + "$");

  if(reg_exp.test(window.location.href)) {
    console.log("Using redirect with the following filter " + reg_exp);
    console.log("Redirecting to " + redirect.redirect_to);

    if(redirect.must_have_selector !== "") {
      let must_have_element =   document.querySelector(redirect.must_have_selector);
      if (must_have_element === null) {
        console.log("Canceling since page does not have: \"" + redirect.must_have_selector + "\"")
        break;
      }
    }

    if(window.location.href !== redirect.redirect_to) {
      window.location = redirect.redirect_to;
    }
    break;
  }
}

function setFavIcon(sizes) {
  (function() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.sizes = sizes;
    link.href = 'https://raw.githubusercontent.com/Martoko/Auto-Login/master/favicon/favicon-' + sizes + '.png';
    document.getElementsByTagName('head')[0].appendChild(link);
  })();
}

if (window.location.href === "about:blank#auto_login") {
  document.title = "Auto login configuration";
  setFavIcon("16x16");
  setFavIcon("32x32");
  setFavIcon("96x96");
  new PagesConfig();
  new RedirectsConfig();
}
