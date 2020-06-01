import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './formStyles';
import { login as loginAction } from '../../actions/auth';

const AuthForm = ({ login }) => {
  const classes = styles();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(formData);
  };

  return (
    <form noValidate autoComplete="off" className={classes.root} onSubmit={handleSubmit}>

      <TextField
        id="email"
        label="Enter your email"
        type="email"
        name="email"
        onChange={handleChange}
      />
      <TextField
        id="password"
        label="Enter your password"
        type="password"
        name="password"
        onChange={handleChange}
      />
      <Button type="submit" className={classes.submitBtn} variant="outlined">Submit</Button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login(formData) {
    dispatch(loginAction(formData));
  },
});
export default connect(null, mapDispatchToProps)(AuthForm);

AuthForm.propTypes = {
  login: PropTypes.func.isRequired,
};
