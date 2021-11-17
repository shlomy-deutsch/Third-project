import { Redirect, Route, Switch } from "react-router-dom";
import Add from "../Pages/Add-Vecation/Add-Vecation";
import canvas from "../Pages/canvas/canvas";
import  Edit  from "../Pages/Edit/Edit";
import Login from "../Pages/Login/Login";
import Page404 from "../Pages/Page404/Page404";
import ProductList from "../Pages/ProductList/ProductList";
import ProductListAdmin from "../Pages/ProductList/ProductList-Admin";
import Register from "../Pages/Register/Register";

export default function Routing(): JSX.Element {
  return (
    <Switch>
      <Route path="/home" component={canvas} exact />
      <Route path="/products" component={ProductList} exact />
      <Route path="/admin/edit" component={Edit} exact />
      <Route path="/admin/add" component={Add} exact />
      <Route path="/admin" component={ProductListAdmin} exact />
       <Route path="/login" component={Login} exact />
       <Route path="/register" component={Register} exact />\
      <Redirect from="/" to="/login" exact />
      <Route path="*" component={Page404} />
    </Switch>
  );
}
