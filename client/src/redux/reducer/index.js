import { FILTER_BY_TEMPERAMENT,FILTER_BY_NAME, FILTER_BY_WEIGHT, GET_ALL_DOGS, GET_ALL_TEMPERAMENTS, GET_DOG, GET_DOG_DETAILS } from "../actions/index.js";

const initialState = {
Dogs: [],
allDogs: [],
Temperaments: [],
 Details: []

};

export default function rootReducer( state = initialState, action){
switch(action.type){
  
case GET_ALL_DOGS: 
  return{
  ...state,
  Dogs: action.payload,
  allDogs: action.payload

  }
case GET_ALL_TEMPERAMENTS:
    const filteresTemp = action.payload.filter((temp) => temp.name !== "")
    return{
    ...state,
    Temperaments: action.payload


    }
    case GET_DOG:
        return{
       ...state,
        Dogs: action.payload

        }
    case GET_DOG_DETAILS:

        let myDetails = action.payload
        if (!myDetails.temperaments) { //agregamos "no-temperaments" a arreglos sin elementos dentro
          myDetails.temperaments = "no-temperaments"
        }
        return {
          ...state,
          Details: myDetails
        };


    case FILTER_BY_NAME:
    
const listByName = 
       
        action.payload === "order" ?
        state.Dogs.sort((a,b)=>{
        if(a.name > b.name){
            return 1;  
        }
        if(a.name < b.name){
            return -1;  
        }
        
        return 0
        
        }) :  state.Dogs.sort((a,b)=>{
            if(a.name > b.name){
                return -1;  
            }
            if(a.name < b.name){
                return  1;  
            }
            
            return 0
            
            }) 
            return{
             ...state,
             Dogs: listByName

            }
        case FILTER_BY_WEIGHT:

       const listByWeight =  action.payload === 'order'?
       state.Dogs.sort((a,b)=>{
        if(parseInt(a.weight[1]) > parseInt(b.weight[1])){
            return 1;  
        }
        if(parseInt(b.weight[1]) > parseInt(a.weight[1])){
            return -1;  
        }
        
        return 0
        
        }) :  state.Dogs.sort((a,b)=>{
            if(parseInt(a.weight[1]) > parseInt(b.weight[1])){
                return -1;  
            }
            if(parseInt(b.weight[1]) > parseInt(a.weight[1])){
                return  1;  
            }
            
            return 0
            
            }) 
            return{
             ...state,
             Dogs: listByWeight
            }
            case FILTER_BY_TEMPERAMENT:
                let dogTempArray = []
             for(let i=0; i < state.allDogs.length; i++){
              let dogsfilterTemp = state.allDogs[i].temperaments.find(item => item === action.payload)
               if(dogsfilterTemp) dogTempArray.push(state.allDogs[i]) 
             } return{
            ...state,
            Dogs: dogTempArray
             }
         default: return{ ...state}
}
}