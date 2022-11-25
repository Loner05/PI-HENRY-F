import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const useCreateDog = (initialData,onValidate)=>{
const[form,setForm] = useState(initialData)
const [loading,setLoading] = useState(false)
const [errors,setErrors]=useState({})

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

 
}
}


return{form,errors,loading, handleChange, handleSubmit}




}

export default useCreateDog