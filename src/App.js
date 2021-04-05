import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route} from "react-router-dom";

import Navbar from "./components/navbar"
import FoodsList from "./components/foods-list";
import EditFood from "./components/edit-food";
import CreateFood from "./components/create-food";
import CreateUser from "./components/create-user";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Switch>
        <Route exact path="/" component={FoodsList} />
        <Route exact path="/edit/:id" component={EditFood} />
        <Route exact path="/create" component={CreateFood} />
        <Route exact path="/user" component={CreateUser} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
