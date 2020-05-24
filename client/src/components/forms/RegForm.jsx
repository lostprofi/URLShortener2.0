import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './formStyles';
import regAction from '../../actions/reg';

const RegForm = ({ registration }) => {
  const classes = styles();

  const [formData, setformData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (event) => {
    setformData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registration(formData);
  };


  return (
    <form noValidate autoComplete="off" className={classes.root} onSubmit={handleSubmit}>
      <TextField
        id="name"
        label="Enter your name"
        type="text"
        name="username"
        onChange={handleChange}
      />
      <TextField
        id="email"
        label="Enter your email"
        type="email"
        name="email"
        onChange={handleChange}
      />
      <TextField
        id="password1"
        label="Enter your password"
        type="password"
        name="password"
        onChange={handleChange}
      />
      <TextField
        id="password2"
        label="Please confirm password"
        type="password"
        name="passwordConfirm"
        onChange={handleChange}
      />
      <Button type="submit" className={classes.submitBtn} variant="outlined">Submit</Button>
    </form>
  );
};


const mapDispatchToProps = (dispatch) => ({
  registration(formData) {
    dispatch(regAction(formData));
  },

});

RegForm.propTypes = {
  registration: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(RegForm);
