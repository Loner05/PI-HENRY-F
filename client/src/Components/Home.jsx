
import React, { useEffect, useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import CardDog from "./CardDog"
import { getAllDogs,filterByName,filterByWeight,filterByTemperament,getAllTemperaments} from "../redux/actions"
import Pagination from "./Pagination"
import axios from "axios"
import Posts from "./Posts"
import style from "./StyleComponents/Home.module.css"
import SearchBar from "./SearchBar"
import NavBar from "./NavBar"
// en este sitio debemos contenplar las siguentes caracteristicas.
// cargar la lista de perros deben ser ocho por pagina
// debemos tener paginado.
// filtro de perros lis-dropdown: por peso,orden alfabetico
// filtrar perros por temperamento(seleccionar de lista) y raza(seleccionar de lista).
 
const Home = () =>{
  const dispatch = useDispatch();
  const DogsFront = useSelector(state => state.Dogs)
    const[currentPage,setCurrentPage]= useState(1);
    const[loading,setLoading] = useState(false)
    const[posts,setPosts]=useState([])
    const cardsPerPage  = 8
  

    const [postsPerPage] = useState(10);
    const TempsFront = useSelector(state =>state.Temperaments)
    const[ orden, setOrden] = useState("")
    
    useEffect(() => {
        //acciones a depachar luego de montar el componente
        dispatch(getAllDogs());
        dispatch(getAllTemperaments());
        const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    };

    
      }, [dispatch]);
 console.log(currentPage)
 const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
 const lastDogIndex = currentPage * cardsPerPage
 const firstDogIndex = lastDogIndex - cardsPerPage
 const  currentCardsPage = DogsFront.slice(firstDogIndex,lastDogIndex)
 const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
 console.log(currentCardsPage)  
 const paginate = pageNumber =>{ setCurrentPage(pageNumber)}
 console.log(`soy currentpage${currentPage}`)

const sortByName = (e) =>{
  e.preventDefault()
dispatch(filterByName(e.target.value))
setOrden(`Orden ${e.target.value}`)
}

const sortByWeight = (e) =>{
e.preventDefault();
dispatch(filterByWeight(e.target.value))
setOrden(`Orden ${e.target.value}`)

}
const filterTemp = (e)=>{
 e.preventDefault();
 dispatch(filterByTemperament(e.target.value))
setOrden(`Orden ${e.target.value}`)
}

return(
<div className={style.Home_supercontainer}>
  <NavBar/>
  <SearchBar/>
    <div>
<select onChange={sortByName}>
<option disabled defaultValue>Sort By Name</option>
<option value={"A-Z"}>Order A-Z</option>
<option value={"Z-A"}>Order Z-A</option>
</select>
<select onChange={sortByWeight}>
<option disabled  defaultValue>Sort By Weight</option>
<option value="min">Min first</option>  
<option value="max">Max first</option>  
</select>
<select onChange={filterTemp}>
<option disabled defaultValue>Sort By Temp</option> 
{TempsFront.map(item => (<option value={item.name} key={item.id}>{item.name}</option>))} 

</select>
</div>

<div className={style.Home_cardsbox}>
{
currentCardsPage?.map(e => <CardDog  key={e.id} id={e.id} image={e.image} name={e.name} weight={e.weight} temperaments = {e.temperaments}  />)



}
</div>
<div className={style.HOME_pagination}>
<Pagination cardsPerPage={cardsPerPage} totalCards={DogsFront.length} paginate={paginate}/>
</div>
</div>



)
}
export default Home;