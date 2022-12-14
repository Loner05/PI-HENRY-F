const axios = require('axios');
const {Router}=require('express');
const {Dog, Temperament} = require('../db');
// const { getApiData , getAllDogs } = require('./modelsR');
const {api_key} = process.env
const router = Router()
let urLink = `https://api.thedogapi.com/v1/breeds?apikey={api_key}`;
// const getDbData 
// const users = await Dogs.findAll();
// console.log(users.every(user => user instanceof User)); // true
// console.log("All users:", JSON.stringify(users, null, 2))

  
const getDbData = async() =>{
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"], //atributos que quiero traer del modelo Temperament, el id lo trae automatico
            through: {
                attributes: [],//traer mediante los atributos del modelo
            },
        }
    })


}




const getApiData = async() => {
    
   let apiData = await axios.get(urLink);
    let apiInfo = await apiData.data.map(el => {
    let temperamentArray = [];
    let heightArray = [];
    let weightArray = [];
    if (el.temperament) {
        temperamentArray = el.temperament.split(", ");
    }
    if (el.height.metric) {
        heightArray = el.height.metric.split(" - ").map(parseFloat);
    }
    if (el.weight.metric) {
        weightArray = el.weight.metric.split(" - ").map(parseFloat);
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



const getAllDogs = async () => {
    let dataFromApi = await getApiData();
    let dataFromDb = await getDbData();
   
    // const dataFromDb = await getFromDb();
    // const allDataMixed = dataFromApi.concat(dataFromDb);
    let allDataMixed = [...dataFromApi,...dataFromDb];
    return allDataMixed;
}

router.get("/:id", async(req,res)=>{
    const{id}=req.params;
    numId = Number(id)
    
     let allDogs = await getAllDogs();
   try{
     let findId = allDogs.find( dog => dog.id == id)
    findId ? res.status(200).send(findId) : res.status(404).send("Dog Id's not found")

   }catch(e){
    res.send(e)

   }
  })

router.get('/', async(req,res)=>{
    const{name} = req.query;
    let allDogs = await getAllDogs()
    try{
        if(name){
            let filterName = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
            // const filterName = allDogs.find(dog => dog.name === name)
            filterName.length ? res.status(200).send(filterName) : res.status(404).send("Dog not found")

          }else{
           
            
            res.status(200).send(allDogs)}
    }
    catch(e){
    res.send(e)
    }
    })

    router.post('/', async(req,res)=>{

     let{name,min_height,max_height,min_weight,max_weight,life_span,temperaments}=req.body;
      
      const arrayHeight= []
      const minHeight = min_height;
      const maxHeight = max_height;
      //const arrayHeight =`${minHeight}}-${maxHeight}`;
      arrayHeight.push(minHeight,maxHeight)
      const arrayWeight =[]
      const minWeight =  min_weight;
      const maxWeight = max_weight;
      //const arrayWeight = `${minWeight}-${maxWeight}`;
      arrayWeight.push(minWeight,maxWeight)
      let dog = await Dog.create({
        name,
        height: arrayHeight,
        weight: arrayWeight,
        life_span
       })
      let associatedTemp = await Temperament.findAll({
        where: {name: temperaments},
         })
         //.then(associatedTemp => associatedTemp .map(account => account.name));
        dog.addTemperament(associatedTemp)
    res.send(dog)

    });

    
    


        module.exports = router;