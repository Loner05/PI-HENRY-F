import './App.css';
import { Route } from 'react-router-dom';
import CreateDog from './Components/CreateDog';
import Home from './Components/Home';
import CardDog from './Components/CardDog';
import DogDetails from './Components/DogDetails';
import Landing from './Components/Landing';
function App() {
  return (
    <div className="App">
       <Route exact path={"/"}><Landing/></Route>
       <Route exact path={"/createdog"}><CreateDog/></Route>
       <Route exact path={"/home"}><Home/></Route>
       <Route exact path={"/dogs/:id"}><DogDetails/></Route>
      
    </div>
  );
}

export default App;
