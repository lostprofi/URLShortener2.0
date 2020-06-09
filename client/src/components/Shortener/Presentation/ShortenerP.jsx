import React from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import fullURLForm from './ShortenerStyles';

const ShortenerP = ({ onChange, onCutURL }) => {
  const fullURLFormCls = fullURLForm();

  return (
    <form className={fullURLFormCls.form} validate="true" onSubmit={onCutURL}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <TextField
            required
            id="fullURL"
            label="Shorten your link"
            variant="outlined"
            className={fullURLFormCls.input}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={4}>
          <Button type="submit" variant="outlined" className={fullURLFormCls.btn}>Shorten</Button>
        </Grid>
      </Grid>
    </form>
  );
};

ShortenerP.propTypes = {
  onChange: PropTypes.func.isRequired,
  onCutURL: PropTypes.func.isRequired,
};

export default ShortenerP;
