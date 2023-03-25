//traitement de donnée

const axios = require("axios");

async function makePostRequest(test: any) {
  axios
    .post("http://127.0.0.1:5000", test)
    .then(function (response: any) {
      console.log("It says: ", response.data);
    })
    .catch(function (error: any) {
      console.log(error);
    });
}

const integrite = document.getElementById("integrite");
if (integrite) {
  integrite.addEventListener("click", () => {
    makePostRequest("Hello");
  });
}
