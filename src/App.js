import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import Login from "./components/Login"
import Products from "./components/Products"
import Checkout from "./components/Checkout"
import Thanks from "./components/Thanks"
import {
  Switch,
  Route,
} from "react-router-dom";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() { 
  return (
    <div className="App">
      <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
           <Login />
          </Route>
          <Route exact path="/">
            <Products />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
          <Route exact path="/thanks">
            <Thanks />
          </Route>
        </Switch>
   
    </div>
        
    
  );
}

export default App;
