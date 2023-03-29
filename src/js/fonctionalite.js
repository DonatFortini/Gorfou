"use strict";
/* module lié aux fonctionnalités principales de gorfou celles changeants page par page*/
// event listener pour le bouton de vérification de l'intégrité
const integrite = document.getElementById("integrite");
if (integrite) {
    integrite.addEventListener("click", () => {
        alert("int");
    });
}
