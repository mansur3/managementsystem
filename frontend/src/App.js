
import './App.css';
import {Navbar} from "./Components/Navbar/navbar";
import {Student} from "./Components/Student/Student";
import {Main} from "./Components/Mainpage/Main";
import {Switch, Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Switch>
        <Route exact path = "/">
          <Main />
        </Route>
        <Route path = "/admin" >
        <Student />
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
