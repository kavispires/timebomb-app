import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, Typography } from '@material-ui/core';

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

const Home = ({ game }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        Welcome to Time Bomb!
      </Typography>
      <Paper className={classes.message}>
        <Typography>
          You and a team of investigators are trying to find and defuse a bomb
          before it goes BOOM! But some of you (including you) may not be who
          they claim to be!
          <br />
          Are you ready to play?
        </Typography>
      </Paper>
      {!game?.stage && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => game.setStage('settings')}
        >
          Start
        </Button>
      )}
    </div>
  );
};

export default Home;
