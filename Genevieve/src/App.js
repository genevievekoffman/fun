import React, {useState} from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App(){
   
  return(
    <Router>
      <div>
        <ul>
          <li>
            <Link to = "/">Home</Link>
          </li>
          <li>
            <Link to = "/information">Information</Link>
          </li>
        </ul>

        <hr />
        <Switch>
          <Route exact path ="/">
            <Home />
          </Route>
          <Route path = "/information">
            <Information />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home(){
  const [infoList, setInfoList] = useState('');
  return (
    <div className = "title">
      <h2>Home</h2>
      <p1>
        Welcome Home. Add a user below. 
      </p1>
      <form onSubmit = {getInfo}>
          <input type = "text" name = "name" placeholder = "enter name"  />
           
          <input type = "submit" value = "ok"/>
      </form>   
      <h>{infoList}</h>
    </div>
  );

  function getInfo(e){ //event listener
    e.preventDefault();
    let info = { //recieves the name input
      name: e.target.elements.name.value,
    }
    console.dir(info)
    setList(e); 
  }

  function setList(e){
    setInfoList(e.target.elements.name.value)
  }
}
function Information(){
  return (
    <div className = "title">
      <h2>Information</h2>
    </div>
  );
}


// import Card from './view/card/Card'

// function App() {
//   let names = [];
//   //const [infoList, setInfoList] = useState('');

//   return (
//     <div className="App">
//           <form onSubmit = {getInfo}>
//             <input type = "text" name = "name" placeholder = "enter name"  />
//             <input type='number' name='age' placeholder='Enter your age' />
//             {/* <input type = "text" age = "age" placeholder = "enter age" /> */}
//             <input type = "submit" value = "ok"/>
//           </form>   

//           {/* <h>{infoList}</h> */}
    
//       </div>
         
//   );
//   function setList(){  
//     names.map((info, index) =>{
//       return (<Card info = {info} key = {index}/>)
//     }) 
//   }

//   function getInfo(e){ //event listener
//     e.preventDefault();
//     let info = { //recieves the name input
//       name: e.target.elements.name.value,
//       age: e.target.elements.age.value
//     }
//     console.dir(info)
//     names.push(info) //adds the new info to the names list
//     console.dir(names)
//     setList();
//     // saveInputs(info);
//   }

// }

// export default App;
