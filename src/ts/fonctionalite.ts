/* module lié aux fonctionnalités principales de gorfou celles changeants page par page*/
import axios from "axios";
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
    axios
    .post("http://127.0.0.1:5000/rd", {
      tuple: [3,4]
    })
    .then(function (response: any) {
      console.log("It says: ", response.data);
    })
    .catch(function (error: any) {
      console.log(error);
    }); 
  });
}