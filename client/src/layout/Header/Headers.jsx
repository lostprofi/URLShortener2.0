import React from 'react';
import {
  AppBar, Toolbar, Typography, Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import headerStyles from './headerStyle';
import { signOut as signOutAction } from '../../actions/auth';

const Header = ({ isAuth, signOut }) => {
  const classes = headerStyles();

  const handleLogOut = () => {
    signOut();
  };

  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">
          URLShortener 2.0
        </Typography>
        {isAuth === true
          ? (
            <div>
              <Button color="inherit" component={Link} to="/stat">Statistic</Button>
              <Button color="inherit" component={Link} to="/auth" onClick={handleLogOut}>Sign out</Button>
            </div>
          )
          : (
            <div>
              <Button color="inherit" component={Link} to="/auth">Sign in</Button>
              <Button color="inherit" component={Link} to="/reg">Sign Up</Button>
            </div>
          )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (store) => ({
  isAuth: store.auth.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
  signOut() {
    dispatch(signOutAction());
  },
});

Header.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
