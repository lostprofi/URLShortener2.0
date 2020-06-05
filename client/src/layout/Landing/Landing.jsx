import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RegForm from '../../components/forms/RegForm';
import AuthForm from '../../components/forms/AuthForm';
import Shortener from '../../components/Shortener/Container/Shortener';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';


const Landing = () => (
  <Switch>
    <Route path="/reg">
      <RegForm />
    </Route>
    <Route path="/auth">
      <AuthForm />
    </Route>
    <PrivateRoute path="/" component={Shortener} />
    <PrivateRoute path="/stat" component={Shortener} exact />
  </Switch>
);

export default Landing;
