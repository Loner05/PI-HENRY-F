import axios from "axios";

export const CREATE_DOG = 'CREATE_DOG';
export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_ALL_TEMPERAMENTS = 'GET_ALL_TEMPERAMENTS';
export const GET_DOG = 'GET_DOG';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const FILTER_BY_WEIGHT = 'FILTER_BY_WEIGHT';
export const GET_DOG_DETAILS = "GET_DOG_DETAILS"
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT"

export function createDog(payload) {
    console.log(payload)
return async function (){
    console.log(`soypayload${payload}`)
const data = await axios.post("http://localhost:3001/dogs",payload)
 return data
}

}

export function getAllDogs () {
    return function(dispatch){
     fetch('http://localhost:3001/dogs')
    .then(res => res.json())
    .then( data => { dispatch({type: GET_ALL_DOGS, payload: data})})
    }
}

export function getAllTemperaments(){
    return function(dispatch){
     fetch('http://localhost:3001/temperament')
    .then(res => res.json())
    .then( data => { dispatch({type: GET_ALL_TEMPERAMENTS, payload: data})})
   
}}

// busca a un perro por el nombre de su raza
export const getDog = (name) => dispatch => {
    return  fetch(`http://localhost:3001/dogs?name=${name}`)
    .then(res => res.json())
    .then( data => { dispatch({type: GET_DOG, payload: data})})
}


export  const filterByName= (data)=> {
return{
    type: FILTER_BY_NAME,
    payload: data
}
}

export const filterByWeight = (data) =>{
return{
    type: FILTER_BY_WEIGHT,
    payload: data
      }
}

export const getDogDetails = (id) =>{
return async function (dispatch){
try{
let findDog = await axios.get(`http://localhost:3001/dogs/${id}`)
console.log(findDog.data)
return dispatch({ type: GET_DOG_DETAILS, payload: findDog.data}) 
} 
catch(e){
 console.log(`soy error action getdogdetail${e}`)
}
}   
}

export const filterByTemperament = (temp) =>{
return {
type: FILTER_BY_TEMPERAMENT,
payload: temp

}
}