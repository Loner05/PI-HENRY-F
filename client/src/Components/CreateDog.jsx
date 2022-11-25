



import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {createDog, filterByTemperament, getAllTemperaments} from "../redux/actions"
import NavBar from "./NavBar"
import style from "./StyleComponents/CreateDog.module.css"

const CreateDog = () =>{

const initialData = {
name:'',
min_height:'',
max_height: '',
min_weight: '',
max_weight: '',
life_span:'',
temperaments: []
}
const dispatch = useDispatch()
const[form,setForm] = useState(initialData)
const [errors,setErrors]= useState({})
const DBtemperaments = useSelector(state => state.Temperaments)
useEffect(()=>{
dispatch(getAllTemperaments())


},[dispatch])
const onValidate = (form) =>{
let errors = {}
let regexName =  /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/
///^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
let regexlife =  /[0-9]{1,2}(-[0-9]{1,2})/
///^[0-9]{1,2}(-[0-9]{1,2})?$/;
//
if(!form.name.trim()){
 errors.name = "Name is required"


}else if(!regexName.test(form.name)){
   errors.name = " Enter a valid name" 
}
// if(!form.min_height.trim() || !form.min_height.trim()){
//  errors.height ="Height is required"
// }else
 if(form.min_height < 15 || form.max_height > 110){
errors.height = "height mesures can't be less than 15cm and more than 115cm"

}
if(!form.min_weight.trim()||!form.max_weight.trim()){
errors.weight="Weight is required"
}else if(form.min_weight < 1 || form.max_weight > 95){
    errors.weight= "weight can't be less than 1Kg and more than 80Kg"
  
    }
 if(!form.life_span.trim()){
   errors.life_span="lifeSpan is required"
 }else if(!regexlife.test(form.life_span)){
    errors.life_span = "Unnvalid format: must be enter with a script in the middle of the numbers for Example: 8-12" 
 }

return errors 
}
const handleChange = (e) =>{
   setForm({...form, [e.target.name]: e.target.value})
   }
const handleSubmit = (e)=>{
   
   e.preventDefault()
   const err = onValidate(form)
   // if(err === null){
   // console.log("enviando formulario")
   // }else{
   setErrors(err)
   if(Object.keys(err).length=== 0){
   
    dispatch(createDog(form))
    alert("The new dog was added successfully");
    setForm(initialData)
   }
   }
   const handleSetTemp = (e) =>{
      e.preventDefault()
      console.log(form.temperaments)
      if(!form.temperaments.includes(e.target.value)){
     setForm({...form, temperaments: [...form.temperaments, e.target.value]})
      }
   }

   const handleDelete = (item) =>{
      setForm({...form, temperaments:form.temperaments.filter(dog => dog !== item)})
       
   }

// const{errors,loading,handleChange,handleSubmit}= onValidate(form)
return(

<div> 
   <div><NavBar/></div>

 <div  className={style.Container}> 
   <div className={style.Formcard}>
<form className={style.Form} onSubmit = {handleSubmit}>

<div className={style.Form_labelinputs}>
<label >Name:</label>
<input className={style.Form_inputs} value={form.name}  type="text"  name="name" onChange={handleChange}/>
{errors.name && <div className="alert">{errors.name}</div>}
</div>
{/* <div className={style.Form_labelinputs}>
<label>Height-min:</label>
<input className={style.Form_inputs}  value={form.min_height} type="number" name="height_min" onChange={handleChange}/>
<label>Height-max:</label>
<input className={style.Form_inputs}  value={form.max_height} type="number" name="height_max" onChange={handleChange}/>
{errors.height &&<div className="alert">{errors.height}</div>}
</div> */}
<div className={style.Form_labelinputs}>
<label>Height-min:</label>
<input className={style.Form_inputs}  value={form.min_height}  type="number" name="min_height" onChange={handleChange}/>
<label>Height-max:</label>
<input className={style.Form_inputs}  value={form.max_height}  type="number" name="max_height" onChange={handleChange}/>
{errors.height &&<div className="alert">{errors.height}</div>}
</div>
<div className={style.Form_labelinputs}>
<label>Weight-min:</label>
<input className={style.Form_inputs}  value={form.min_weight}  type="number" name="min_weight" onChange={handleChange}/>
<label>Weight-max:</label>
<input className={style.Form_inputs}  value={form.max_weight}  type="number" name="max_weight" onChange={handleChange}/>
{errors.weight &&<div className="alert">{errors.weight}</div>}
</div>
<div className={style.Form_labelinputs}>
<label>Life Span:</label>
<input className={style.Form_inputs}  value={form.life_span}  type="text" name="life_span" onChange={handleChange}/>
{errors.life_span && <div className="alert">{errors.life_span}</div>}
</div>
<select className={style.Form_select} onChange={handleSetTemp}>
<option selected disabled defaultValue>Add Temperaments:</option>
   {
DBtemperaments.map(item => (
   <option key={item.name+"b"+ Math.random()}>{item.name}</option>


))

}</select>
<div className={style.temperamentsArrow}>{
         form.temperaments?.map(item =>(
            <div key={item+Math.random()} onClick={()=>handleDelete(item)}>
            <button className={style.Form_buttontemp} >{item} X</button> 
            </div>
     ) )}   
      </div> 
<button className={style.Form_buttonsubmit} vtype="submit">Create Dog</button>
</form>
</div>
</div>
 </div>  
)
}

export default CreateDog