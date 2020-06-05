import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component, isAuth, path, ...rest
}) => (
  <Route
    path={path}
    {...rest}
    render={
        () => (isAuth === true
          ? <Component />
          : <Redirect to="/auth" />)
}
  />
);

const mapStateToProps = (store) => ({
  isAuth: store.auth.isAuth,

});

export default connect(mapStateToProps, null)(PrivateRoute);
