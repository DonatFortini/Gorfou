"use strict";
//traitement de donnée
const axios = require("axios");
let test = "Hello";
async function makePostRequest(test) {
    axios
        .post("http://127.0.0.1:5000/test", test)
        .then(function (response) {
        console.log("It says: ", response.data);
    })
        .catch(function (error) {
        console.log(error);
    });
}
const integrite = document.getElementById("integrite");
if (integrite) {
    integrite.addEventListener("click", () => {
        makePostRequest(test);
    });
}
