// ==UserScript==
// @name          Securid Login Helper
// @namespace     https://openuserjs.org/users/a-b
// @description   Securid login helper prepopulates username and focus OTP
// @author        a-b
// @copyright     2020, a-b (https://github.com/a-b)
// @license       MIT
// @version       0.3
// @match         https://*.auth.securid.com/saml-fe/sso*
// @require       http://code.jquery.com/jquery-latest.js
// @grant none
// ==/UserScript==

// ==OpenUserJS==
// @author a-b
// ==/OpenUserJS==

// run `localStorage.removeItem('securidUsername')` in your browser console to reset username

(function () {
  'use strict';

  $(document).ready(function () {

    const waitUntilElementExists = (selector, callback) => {
      const el = document.querySelector(selector);

      if (el) {
        return callback(el);
      }

      setTimeout(() => waitUntilElementExists(selector, callback), 500);
    }

    waitUntilElementExists("input#username", (el) => {
      document.querySelector("input#username").value = localStorage.getItem('securidUsername');
      document.querySelector("input#input_otp_secret").focus();

      document.getElementById("btn_verify_securid").onclick = function(){
          localStorage.setItem("securidUsername", document.querySelector("input#username").value);
          console.log("localStorage['securidUsername'] = ", document.querySelector("input#username").value);
      }
    });
  });

})();
