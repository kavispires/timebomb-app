import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import logo from '../Images/logo.svg';

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
  },
  logo: {
    maxHeight: 45,
  },
  gameStates: {},
}));

const Header = ({ game }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} className={classes.logo} alt="Time Bomb Game logo" />
          {Boolean(game) && (
            <div className={classes.gameStats}>
              <Typography>Round X/X</Typography> |{' '}
              <Typography>Turn X/X</Typography>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
