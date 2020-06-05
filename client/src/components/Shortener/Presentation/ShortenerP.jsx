import React from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import fullURLForm from './ShortenerStyles';

const ShortenerP = () => {
  const fullURLFormCls = fullURLForm();

  return (
    <form className={fullURLFormCls.form} validate="true">
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <TextField required id="fullURL" label="Shorten your link" variant="outlined" className={fullURLFormCls.input} />
        </Grid>
        <Grid item xs={4}>
          <Button type="submit" variant="outlined" className={fullURLFormCls.btn}>Shorten</Button>
        </Grid>
      </Grid>
    </form>
  );
};


export default ShortenerP;
