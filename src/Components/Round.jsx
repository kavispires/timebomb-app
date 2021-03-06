import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, CircularProgress } from '@material-ui/core';

import Player from './Player';

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

const Round = ({ game }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {game.CPUPlayers.map(player => (
        <Player key={player.id} player={player} />
      ))}
      <div>
        <CircularProgress />
        <Paper className={classes.message} bgcolor="red">
          <Typography variant="h4">{game.message}</Typography>
        </Paper>
      </div>
    </div>
  );
};

export default Round;
