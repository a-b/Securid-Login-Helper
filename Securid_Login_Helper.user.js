// ==UserScript==
// @name          Securid Login Helper
// @namespace     https://openuserjs.org/users/a-b
// @description   Securid login helper prepopulates username and focus OTP
// @author        a-b
// @copyright     2020, a-b (https://github.com/a-b)
// @license       MIT
// @version       0.2
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

        var userName = localStorage.getItem('securidUsername') || prompt("Please enter Securid username:", "your username");

        if (userName === null || userName === "") {
            alert("Securid Login Helper configureation canceled; reload page to retry");
        }
        else {
            localStorage.setItem("securidUsername", userName)
        }

        const waitUntilElementExists = (selector, callback) => {
            const el = document.querySelector(selector);

            if (el) {
                return callback(el);
            }

            setTimeout(() => waitUntilElementExists(selector, callback), 500);
        }

        waitUntilElementExists("#username", (el) => {
            document.querySelector("#username").value = userName;
            document.querySelector("#input_otp_secret").focus();
        });
    });

})();
