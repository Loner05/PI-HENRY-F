const { default: axios } = require("axios");

axios.get('https://api.thedogapi.com/v1/breeds').then(response => console.log(respose.data))