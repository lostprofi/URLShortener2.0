import React from 'react';
import { connect } from 'react-redux';
import { Alert } from '@material-ui/lab';
import alertStyles from './alertStyle';

const Alerts = ({ alerts }) => {
  const classes = alertStyles();

  return alerts.map((alert) => (
    <Alert
      key={alert.id}
      severity={alert.type}
      className={classes.root}
    >
      {alert.msg}
    </Alert>
  ));
};

const mapStateToProps = (store) => ({
  alerts: store.alerts,
});


export default connect(mapStateToProps, null)(Alerts);
