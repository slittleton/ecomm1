import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/layout/Home";
import Signin from "./components/user/Signin";
import Signup from "./components/user/Signup";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
