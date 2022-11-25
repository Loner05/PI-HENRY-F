
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDogDetails } from "../redux/actions";
import NavBar from "./NavBar";


const DogDetails =()=>{
    
    
const {id} = useParams()
const dispatch = useDispatch();
useEffect(()=>{dispatch(getDogDetails(id))},[dispatch,id])
const details = useSelector((state) => state.Details)
let values = Object.values(details)

let nameDog, imageDog, temperamentDog = [], heightDog, weightDog, lifeSpanDog;


    if (details) { //una vez ya se hayan traido los datos renderizalos
        nameDog = details.name;
        imageDog = details.image;
        heightDog = details.height;
        weightDog = details.weight;
        lifeSpanDog = details.life_span;
    
           
        if (details.temperaments) {
            console.log("soy details dogcard"  )
            console.log(details)
            const temps = () =>{
                if(typeof(details.temperaments[0])=== "object"){
                    let tempas = []
                   let temps = details.temperaments.filter(item =>{ tempas.push(item.name)})
                   temps?.map(temp => temp.name.value)   
                   return tempas
                }if(typeof(details.temperaments[0])=== "string") return details.temperaments     
               }
               let temps2= temps()
            temperamentDog = [temps2]
        }


        // if (details.temperaments.name) {
        //     temperamentDog = details.temperaments.map(temp => temp.name)
        // }
    };

    

    return(
        <div >
              <NavBar/>
            <div >
                    <div >

                        <div>
                            <img src={imageDog} alt={`imagen de ${nameDog}`}/>
                        </div>
                        
                        <div>
                            <h1>{nameDog}</h1>
                            <h3>{`Height: ${heightDog && heightDog[0]} - ${heightDog && heightDog[1]} CM`}</h3>
                            <h3>{`Weight: ${heightDog &&  weightDog[0]} - ${weightDog && weightDog[1]} KG`}</h3>
                            <h3>{`Lifespan: ${lifeSpanDog}`}</h3>
                            <div>
                                <h3>Temperaments</h3>
                                <ul>
                                    {temperamentDog.map(t => <li key={t}>{t}</li>)}
                                </ul>
                            </div>
                        </div>   
                </div>
            </div>
        </div>
    )
}

export default DogDetails