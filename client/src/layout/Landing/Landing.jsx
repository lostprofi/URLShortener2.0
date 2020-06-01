import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RegForm from '../../components/forms/RegForm';
import AuthForm from '../../components/forms/AuthForm';


const Landing = () => (
  <Switch>
    <Route path="/reg">
      <RegForm />
    </Route>
    <Route path="/auth">
      <AuthForm />
    </Route>
  </Switch>
);

export default Landing;
