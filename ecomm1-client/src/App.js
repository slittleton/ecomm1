import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminRoute from "./components/auth/AdminRoute";
import PrivateRoute from "./components/auth/PrivateRoute";

import Home from "./components/home/Home";
import Signin from "./components/login/Signin";
import Signup from "./components/login/Signup";
import Contact from "./components/contact/Contact";
import SearchResults from "./components/product/SearchResults";
import AccountAdmin from "./components/account/AccountAdmin";
import AdminProducts from "./components/account/AdminProducts";
import AdminCreate from "./components/account/AdminCreate";
import AdminMessages from "./components/account/AdminMessages";
import AdminSettings from "./components/account/AdminSettings";
import AccountUser from "./components/account/AccountUser";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/searchresults" exact component={SearchResults} />

        <PrivateRoute path="/account/user" exact component={AccountUser}/>
        <AdminRoute path="/account/admin" exact component={AccountAdmin}/>
        <AdminRoute path="/account/admin/products" exact component={AdminProducts}/>
        <AdminRoute path="/account/admin/create" exact component={AdminCreate}/>
        <AdminRoute path="/account/admin/messages" exact component={AdminMessages}/>
        <AdminRoute path="/account/admin/settings" exact component={AdminSettings}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
