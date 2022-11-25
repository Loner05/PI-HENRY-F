import React from "react";
import {NavLink } from "react-router-dom";
import style from "./StyleComponents/Navbar.module.css"



export default function NavBar(){
return(
<div className={style.Nav_container}>
    <div className={style.Nav_textLogo}>
        <h1>DogsPedia</h1>
    </div>
<NavLink to="/home"><button className={style.Navbar_button} >Home</button></NavLink>
<NavLink to="/createdog"><button className={style.Navbar_button}>Create Dog</button></NavLink>
</div>
)
}