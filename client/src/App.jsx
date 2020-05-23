import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import store from './store';
import Header from './layout/Header/Headers';
import Landing from './layout/Landing/Landing';
import Alerts from './components/Alert/Alert';

const App = () => (

  <Provider store={store}>
    <Router>
      <Grid container justify="center">
        <Header />
        <Alerts />
        <Grid item xs={8}>
          <Landing />
        </Grid>
      </Grid>
    </Router>
  </Provider>

);


export default App;
