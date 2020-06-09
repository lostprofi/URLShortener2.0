import React from 'react';
import {
  Button, TextField, Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ShortListStyles from './ShortListStyles';


const ShortListP = ({ fullURL, shortenURL }) => {
  const classes = ShortListStyles();


  return (
    <Grid container item className={classes.root} xs={12}>
      <Grid item xs={7}>
        <TextField fullWidth type="string" value={fullURL} multiline />
      </Grid>
      <Grid item xs={3}>
        <Button id="shortenURL">{shortenURL}</Button>
      </Grid>
      <Grid item xs={2}>
        <Button>Copy</Button>
      </Grid>
    </Grid>
  );
};

ShortListP.propTypes = {
  fullURL: PropTypes.string.isRequired,
  shortenURL: PropTypes.string.isRequired,
};

export default ShortListP;
