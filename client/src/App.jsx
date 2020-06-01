import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { store, persistor } from './store';
import Header from './layout/Header/Headers';
import Landing from './layout/Landing/Landing';
import Alerts from './components/Alert/Alert';
import { PersistGate } from 'redux-persist/integration/react'

const App = () => (

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Router>
      <Grid container justify="center">
        <Header />
        <Alerts />
        <Grid item xs={8}>
          <Landing />
        </Grid>
      </Grid>
    </Router>
  </PersistGate>
  </Provider>

);


export default App;
