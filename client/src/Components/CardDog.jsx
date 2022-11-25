
import React from "react"
import { Link } from "react-router-dom"
import apoloImage  from "../media/apoloDphoto.jpg"
import style from './StyleComponents/CardDog.module.css'
const CardDog = ({image,name,weight, temperaments,id}) =>{
   const temps = () =>{
      if(typeof(temperaments[0])=== "object"){
          let tempas = []
         let temps = temperaments.filter(item =>{ tempas.push(item.name)})
         temps?.map(temp => temp.name.value)   
         return tempas
      }if(typeof(temperaments[0])=== "string") return temperaments     
     }

return(
<div className={style.Card_container}>

      <img src={image ? image : apoloImage } alt={name}/>

 <Link to={`/dogs/${id}`}>
 <h1>{name}</h1>
 </Link>
  
  <h2> Weight: {weight[0]}-{weight[1]} Kg</h2>     
  <div> <h2>Temperaments:</h2>{
      
     temps()?.map(temp => <p key={temp+Math.random}>{temp}</p>)    
     }
   </div>
</div>
)



}

export default CardDog