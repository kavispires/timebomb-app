import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { CARDS } from '../Game/constants';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    maxHeight: '50px',
  },
}));

const getCardImgUrl = card => {
  const prefix = `${process.env.PUBLIC_URL}/images/card-`;
  const suffix = '.svg';

  // if (!card.isFaceUp) {
  //   return `${prefix}back.svg`;
  // }

  switch (card.value) {
    case CARDS.BOMB:
      return `${prefix}bomb${suffix}`;
    case CARDS.FUSE:
      return `${prefix}fuse${suffix}`;
    default:
      return `${prefix}blank${suffix}`;
  }
};

const Card = ({ card, classNames }) => {
  const classes = useStyles();
  // console.log(card);

  const imgUrl = getCardImgUrl(card);
  return <img className={classes.root} src={imgUrl} alt="Investigation Card" />;
};

export default Card;
