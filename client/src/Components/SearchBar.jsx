import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDog } from "../redux/actions";
import style from "./StyleComponents/SearchBar.module.css"
import logo from "../media/search-logo.png"



const SearchBar = () =>{
    const[input,setInput] = useState("")
    const dispatch = useDispatch()
    const handleChange = (e) =>{
        e.preventDefault()
        setInput(e.target.value)
         dispatch(getDog(input))
      

}
return(
    <div className={style.Searchcontainer}>
    <div className={style.input_wrapper} >
      <input className={style.SearchBar_inputsearch} type="text" placeholder="Search" onChange={handleChange}/>
      <img className={style.SearchBar_inputlogo} src={logo} alt="" />
    </div>
    </div>
)
}

export default SearchBar