# Form troubleshooter

**A Chrome extension to find and fix common form problems.**

![image](https://user-images.githubusercontent.com/205226/124280594-c7b74a00-db40-11eb-8770-78a857815480.png)

![image](https://user-images.githubusercontent.com/205226/124281671-d9e5b800-db41-11eb-93d4-32b268c10a74.png)

![image](https://user-images.githubusercontent.com/205226/124281578-c0447080-db41-11eb-8a13-f04b1badd920.png)

## Installation

When released, this extension will be available from the
[Chrome Web Store](https://chrome.google.com/webstore/category/extensions).

For the moment, you'll need to download the code, build, and install the extension from local files. Note that you will
need to have [Node.js 12 or later](https://nodejs.org/en/) to build the extension.

1. [Download the code](https://github.com/GoogleChromeLabs/form-troubleshooter/archive/refs/heads/main.zip) or clone the
   repo:<br><br>`git clone git@github.com:GoogleChromeLabs/form-troubleshooter.git`<br><br>
2. Install dependencies: `npm install`
3. Build the extension: `npm run build`
4. In Chrome, navigate to `chrome://extensions`<br><br>
   <img alt="Screenshot of the chrome://extensions page" src="https://user-images.githubusercontent.com/205226/124620948-c86a1c00-de71-11eb-8c9d-5d7353c13f65.png" width="75%">

5. Enable **Developer mode**
6. Click the **Load unpacked** button and select the extension's `build/` directory
7. You can pin the extension so its icon is always visible: from the Chrome **Extensions** menu, select **Form
   Troubleshooter**<br><br>
   <img alt="Screenshot of the Chrome Extensions menu" src="https://user-images.githubusercontent.com/205226/124620955-cb650c80-de71-11eb-9c99-65430ac7949b.png" width="75%">

## Usage

Visit a page you want to check, then click the extension icon. The extension retrieves and audits form elements and
attributes every time the icon is clicked.

The extension popup has three sections:

- **Overview of form and form field elements**
- **Errors**
- **Warnings**

**Save as HTML** saves the report as a local HTML file.

You can try out the extension on the test page [form-problems.glitch.me](https://form-problems.glitch.me).

## Caveats

- The extension is designed to be used as a tool, not to confirm whether code is 'right' or 'wrong'. Form usage is often
  complex (especially for high-traffic sites) so it's difficult to provide form code validation that is appropriate
  across a variety of sites.
- Some errors found by the extension may represent known problems, or be triggered by 'incorrect' code that is justified
  for reasons outside the scope of the extension. In particular, many high-traffic sites use form code in a variety of
  ways to function at scale and integrate with legacy and third-party systems. The same code may not be appropriate for
  smaller-scale sites.

However, please [File a bug](https://github.com/GoogleChromeLabs/form-troubleshooter/issues/new) for anything reported
that appear to be incorrect.

## How it works

The extension checks the current page for form and form field elements each time it's opened.

1. The extension icon is clicked to open [popup.html](src/popup.html).
1. popup.js [sends a message](src/js/popup.js#L36) to [content-script.js](src/js/content-script.js#L15) that the popup
   has opened (`popup opened`).
1. content-script.js [traverses the DOM](src/js/content-script.js#L54) including the shadow DOM and `iframe`s.
1. content-script.js [stores a DOM representation](src/js/content-script.js#L20) using `chrome.storage` which will be
   used by content-script.js.
1. content-script.js [sends a message](src/js/content-script.js#L22) via background.js that the DOM has been inspected
   (`dom inspected`).
1. content-script.js [stores form data](src/js/content-script.js#L20) using `chrome.storage`.
1. content-script.js [sends a message](src/js/content-script.js#L22) that element data has been stored
   (`stored element data`).
1. On [receiving the message](src/js/popup.js#L48), popup.js [gets the data from chrome.storage](src/js/popup.js#L51).
1. popup.js [runs the audits](src/js/popup.js#L111) defined in [audits.js](src/js/audits.js), to check the form elements
   and attributes in the page.
1. popup.js [displays an overview](src/js/popup.js#L114) of form and form field data in popup.html.
1. popup.js [displays results](src/js/popup.js#L113) of the audits in popup.html.

## Feedback and feature requests

Feedback and audit suggestions welcome!

- [Make a comment or request](https://forms.gle/Sm7DbKfLX3hHNcDp9)
- [File a bug](https://github.com/GoogleChromeLabs/form-troubleshooter/issues/new)

## TODO

- [x] Link to and/or highlight problematic elements.
  - [x] Link to items in the regular DOM.
  - [x] Link to items in shadow DOM.
  - [x] Link to items in iframes.
- [x] Move code for displaying audit results [out of audits.js](js/audits.js#L59).
- [x] Move constants to external file.
- [ ] Check for forms (or other elements) that don't have a closing tag.
- [x] Check for invalid `type` attribute values, for example `<input type="check">`.
- [x] Suggest alternatives to invalid attribute names, e.g. for `autcomplete`.
- [ ] Convert `map(field => stringifyElement(field));` to a single function.
- [ ] Sort out form field/element naming (labels and buttons are not fields).

---

This is not a Google product.
