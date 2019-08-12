import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Signin from "./components/login/Signin";
import Signup from "./components/login/Signup";
import Contact from "./components/contact/Contact";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/contact" exact component={Contact} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
