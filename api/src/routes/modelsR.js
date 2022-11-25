// en este archivo vamos a agrupar toda la logica para que a las rutas de express esten mas limpias
// y todo el procesamiento ocurra en este archivo


let urLink = "https://api.thedogapi.com/v1/breeds";

module.exports = {

 getApiData :  async function () {
        
        const apiData = await axios.get(urLink);
        const apiInfo = await apiData.data.map(el => {
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
    },

     getAllDogs:  async function(){
        const dataFromApi = await getApiData();
        // const dataFromDb = await getFromDb();
        // const allDataMixed = dataFromApi.concat(dataFromDb);
        const allDataMixed = [...dataFromApi];
        return allDataMixed;
    }













    
}