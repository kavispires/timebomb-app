import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  red,
  orange,
  yellow,
  green,
  teal,
  blue,
  purple,
  pink,
} from '@material-ui/core/colors';
import {
  Paper,
  Button,
  Typography,
  Slider,
  TextField,
  Select,
  Radio,
  MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%;',
  },
  title: {
    color: 'white',
  },
  options: {
    margin: theme.spacing(2),
    padding: theme.spacing(3),
  },
}));

const numPlayerMarks = [
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 8,
    label: '8',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

const GENDERS = [
  {
    value: 'any',
    text: 'Any',
  },
  {
    value: 'male',
    text: 'Male',
  },
  {
    value: 'female',
    text: 'Female',
  },
];

const COLORS = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'purple',
  'pink',
];

const COLORS_CORE = {
  red: red,
  orange: orange,
  yellow: yellow,
  green: green,
  teal: teal,
  blue: blue,
  purple: purple,
  pink: pink,
};

const ColorRadioButtons = COLORS.reduce((acc, colorOpt) => {
  const RadioComponent = withStyles({
    root: {
      color: COLORS_CORE[colorOpt][400],
      '&$checked': {
        color: COLORS_CORE[colorOpt][600],
      },
    },
    checked: {},
  })(props => <Radio color="default" {...props} />);

  acc[colorOpt] = RadioComponent;
  return acc;
}, {});

const Settings = ({ game }) => {
  const classes = useStyles();
  const [numPlayers, setNumPlayers] = useState(6);
  const [name, setName] = useState('Player');
  const [gender, setGender] = useState(GENDERS[0].value);
  const [color, setColor] = useState('red');

  const handleNumPlayersChange = (_, newValue) => {
    setNumPlayers(newValue);
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleGenderChange = event => {
    setGender(event.target.value);
  };

  const handleColorChange = event => {
    setColor(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.options}>
        <Typography id="num-players" gutterBottom>
          Number of Players
        </Typography>
        <Slider
          defaultValue={numPlayers}
          getAriaValueText={valuetext}
          aria-labelledby="num-players"
          step={1}
          marks={numPlayerMarks}
          min={4}
          max={8}
          onChange={handleNumPlayersChange}
        />

        <Typography id="name" gutterBottom>
          Name
        </Typography>
        <TextField
          id="name"
          label={name}
          variant="outlined"
          onChange={handleNameChange}
        />

        <Typography id="gender" gutterBottom>
          Preferred Gender
        </Typography>
        <Select
          id="gender"
          value={gender}
          onChange={handleGenderChange}
          labelWidth={100}
        >
          {GENDERS.map(({ value, text }) => (
            <MenuItem key={value} value={value}>
              {text}
            </MenuItem>
          ))}
        </Select>

        <Typography id="color" gutterBottom>
          Color
        </Typography>
        {COLORS.map(colorOpt => {
          const ColorRadioButton = ColorRadioButtons[colorOpt];
          return (
            <ColorRadioButton
              key={colorOpt}
              checked={color === colorOpt}
              onChange={handleColorChange}
              value={colorOpt}
              name="radio-button-colors"
              inputProps={{ 'aria-label': color }}
            />
          );
        })}
      </Paper>

      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          game.setPlayerSettings({ numPlayers, gender, name, color })
        }
      >
        Confirm
      </Button>
    </div>
  );
};

export default Settings;
