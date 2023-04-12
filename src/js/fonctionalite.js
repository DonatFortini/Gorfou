"use strict";
/* module lié aux fonctionnalités principales de gorfou celles changeants page par page*/
const Axios = require("axios");
// event listener pour le bouton de vérification de l'intégrité
const integrite = document.getElementById("integrite");
if (integrite) {
    integrite.addEventListener("click", () => {
        alert("int");
    });
}
const RandForest = document.getElementById("randforest");
if (RandForest) {
    RandForest.addEventListener("click", () => {
        Axios
            .post("http://127.0.0.1:5000/randForest", {
            tuple: 4,
            tuple2: 3
        })
            .then(function (response) {
            console.log("It says: ", response.data);
        })
            .catch(function (error) {
            console.log(error);
        });
    });
}
