

// esta pagina debe tener una imagen del fondo alusiva a perros y un boton entrar que al 
// dar click me lleve al home 

import { Link } from 'react-router-dom';
import style from './StyleComponents/Landing.module.css';



const Landing = ()=>{

return(

<div className={style.Landing_container}>
    
<h1 className={style.Landing_title}>DogsPedia</h1>
<Link to="/home">
<button className={style.Landing_button}>ENTER</button>
</Link>

</div>




)    





}

export default Landing