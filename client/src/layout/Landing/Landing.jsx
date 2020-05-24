import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RegForm from '../../components/forms/RegForm';


const Landing = () => (
  <Switch>
    <Route path="/reg">
      <RegForm />
    </Route>
  </Switch>
);

export default Landing;
