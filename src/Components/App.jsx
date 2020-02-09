import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import GameEngine from '../Game';
import initialState from '../Game/initial-state';

import Header from './Header';
import Home from './Home';
import Settings from './Settings';
import Setup from './Setup';
import Round from './Round';

const styles = theme => ({
  root: {
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
    };
  }

  componentDidMount() {
    this.setState({
      game: new GameEngine(this, initialState),
    });
  }

  render() {
    const { classes } = this.props;
    const { game } = this.state;

    return (
      <div className={classes.root}>
        <Header />
        <div className={classes.container}>
          {Boolean(!game?.stage) && <Home game={game} />}
          {Boolean(game?.stage === 'settings') && <Settings game={game} />}
          {Boolean(game?.stage === 'setup') && <Setup game={game} />}
          {Boolean(game?.stage === 'round') && <Round game={game} />}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
