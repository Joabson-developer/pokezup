import React from "react";
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
import { Route, Switch } from "react-router-dom";

const App = () => (
  <Switch>
    <Route exact path="/" render={(props) => <Pokedex {...props} />} />
    <Route exact path="/pokezup.io" render={(props) => <Pokedex {...props} />} />
    <Route
      exact
      path="/:idPokemon"
      render={(props) => <Pokemon {...props} />}
    />
  </Switch>
);

export default App;