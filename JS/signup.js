console.log("signup.js loaded");


var email = "";
var password = "";
var username = "";

function checkInputs() {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    username = document.getElementById("usr-name").value;
    if (username.includes(" ")) {
        alert("usernamehas spaces");
    } else {
        createAccount(username, email, password);
    }

};