import React from 'react';
import {
  AppBar, Toolbar, Typography, Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import headerStyles from './headerStyle';

const Header = () => {
  const classes = headerStyles();

  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">
          URLShortener 2.0
        </Typography>
        <div>
          <Button color="inherit" component={Link} to="/auth">Sign In</Button>
          <Button color="inherit" component={Link} to="/reg">Sign Up</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
