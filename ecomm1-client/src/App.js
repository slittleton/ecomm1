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
import UserSettings from "./components/account/UserSettings";
import AccountUser from "./components/account/AccountUser";
import ProductView from "./components/product/ProductView";
import Cart from "./components/cart/Cart";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/searchresults" exact component={SearchResults} />
        <Route path="/productview/:id" exact component={ProductView} />
        <Route path="/cart" exact component={Cart}/>
        
        <PrivateRoute path="/account/user" exact component={UserSettings}/>
        
        <AdminRoute path="/account/admin" exact component={AccountAdmin}/>
        <AdminRoute path="/account/admin/products" exact component={AdminProducts}/>
        <AdminRoute path="/account/admin/create" exact component={AdminCreate}/>
        <AdminRoute path="/account/admin/messages" exact component={AdminMessages}/>
        <AdminRoute path="/account/admin/settings" exact component={UserSettings}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
