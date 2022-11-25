const {Router}=require('express');
const router = Router()
const axios = require('axios');
const {Temperament} = require('../db');
let urLink = "https://api.thedogapi.com/v1/breeds";
// const DogMoods = async() =>{
//   let data = await axios.get(urLink);
//    let filterData = await data.filter(item => item.temperament);
//    console.log(filterData)
//   return filterData
  
//   }
  
//   const getterDogMoods = async()=>{
//    const moodDogs = await DogMoods()
//   return moodDogs
  
//   }
//   console.log(getterDogMoods())
const getDogMoods = async() =>{
  let apiData = await axios.get(urLink)
     let data = apiData.data
     let temp = data.map( item => item.temperament)

     let temp2 =temp.toString().split(",")
  let unicos = [];
  for(var i = 0; i < temp2.length; i++) {

    const elemento = temp2[i].trim();
    if (!unicos.includes(temp2[i])) {
      unicos.push(elemento)
    }
  }
  return unicos
 
} 

const apiMoods = async() =>{
let api = getDogMoods()
return api

}


  router.get('/', async(req,res)=>{
    // aqui debo utilizar axios para conectarme a la base de datos 
    let moods = await apiMoods()
           try{
            moods.forEach(item => Temperament.findOrCreate({ where: { name: item }}))
            let dbtemp = await Temperament.findAll();
            res.send(dbtemp)

           }catch(e){
           res.send(e)
           
           }
           })


           module.exports = router;