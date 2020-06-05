import React from 'react';
import {
  Button, TextField, Grid,
} from '@material-ui/core';
import ShortListStyles from './ShortListStyles';


const ShortList = () => {
  const classes = ShortListStyles();


  return (
    <Grid container item className={classes.root} xs={12}>
      <Grid item xs={7}>
        <TextField fullWidth type="string" multiline />
      </Grid>
      <Grid item xs={3}>
        <Button id="shortenURL">Link</Button>
      </Grid>
      <Grid item xs={2}>
        <Button>Copy</Button>
      </Grid>
    </Grid>
  );
};

export default ShortList;
