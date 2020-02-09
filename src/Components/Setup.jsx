import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%;',
  },
  title: {
    // color: 'white',
  },
  message: {
    margin: theme.spacing(2),
    textAlign: 'center',
    padding: theme.spacing(2),
  },
}));

const Setup = ({ game }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
      <Paper className={classes.message}>
        <Typography variant="h4">{game.message}</Typography>
      </Paper>
    </div>
  );
};

export default Setup;
