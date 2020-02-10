import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

import Card from './Card';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatar: {
    maxHeight: '200px',
    borderRadius: '50% 50% 0',
    margin: theme.spacing(1),
  },
  info: {
    minWidth: '200px',
    display: 'block',
  },
  name: {
    fontWeight: 'bold',
  },
  speechBuble: {
    background: 'white',
    border: '1px solid black',
    borderRadius: '20px',
    padding: theme.spacing(0, 2),
  },
  cards: {
    display: 'flex',
    padding: theme.spacing(1),
  },
}));

const Player = ({ player }) => {
  const classes = useStyles();

  const imgUrl = `${process.env.PUBLIC_URL}/images/player-${player.color}-${player.gender}.svg`;
  return (
    <Paper className={classes.root}>
      <img className={classes.avatar} src={imgUrl} alt={`CPU Player: ${player.name}`} />
      <div className={classes.info}>
        <Typography className={classes.name}>{player.name}</Typography>
        <Typography className={classes.speechBuble}>{player.speech || 'Hello!'}</Typography>
        <div className={classes.cards}>
          {player.hand.map(card => (
            <Card key={card.id} card={card} classNames="card-mini" />
          ))}
        </div>
      </div>
    </Paper>
  );
};

export default Player;
