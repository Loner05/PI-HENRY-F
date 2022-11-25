 const axios= require("axios");




//  async function getAllDogs(){
  

//     const apiDog =await axios.get('https://api.thedogapi.com/v1/breeds');
//     const apiData = await apiDog.data.map( dg =>{
//     return {
//         id: dg.id,
//         name: dg.name,
//         height: dg.height,
//         weight: dg.weight,
//         temperaments: dg.temperament,
//         life_span: dg.life_span,
//         image: dg.image.url,
//     }
//     return apiData
//     })
    
//     console.log(apiData)



// } 


let urLink = `https://api.thedogapi.com/v1/breeds`

const getApiData = async() => {
    
    const apiData = await axios.get('https://api.thedogapi.com/v1/breeds');
    const apiInfo = await apiData.data.map(el => {
    let temperamentArray = [];
    if (el.temperament) {//pregunto que exista el temperamento y lo devuelvo en un arreglo
        temperamentArray = el.temperament.split(", ");
    }
    
    let heightArray = [];
    if (el.height.metric) {
        heightArray = el.height.metric.split(" - ");
        heightArray.map(


        )
    }

    let weightArray = [];
    if (el.weight.metric) {
        weightArray = el.weight.metric.split(" - ");
    }
        return {
            id: el.id,
            name: el.name,
            height: heightArray,
            weight: weightArray,
            temperaments: temperamentArray,
            life_span: el.life_span,
            image: el.image.url,
        }
    })
return apiInfo;
}
console.log(getApiData)
//-- Get data from the database posgrest--//
// const getFromDb = async () => {
//     return await Breed.findAll({
//         include: {
//             model: Temperament,
//             attributes: ['name'], //atributos que quiero traer del modelo Temperament, el id lo trae automatico
//             through: {
//                 attributes: [],//traer mediante los atributos del modelo
//             },
//         }
//     })
// };

//combine data from API and database
const getAllDogs = async () => {
    const dataFromApi = await getApiData();
    // const dataFromDb = await getFromDb();
    // const allDataMixed = dataFromApi.concat(dataFromDb);
    const allDataMixed = [...dataFromApi];
    return allDataMixed;
}

console.log(getAllDogs())