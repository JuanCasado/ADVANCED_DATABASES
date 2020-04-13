
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles';
import { TextValidator } from 'react-material-ui-form-validator';

const useStyles = makeStyles(theme => ({
  input: {
    width: 50,
  },
}));

export default function EditContest ({
  name, setName,
  description, setDescription,
  age, setAge,}) {

  const classes = useStyles();

  return(
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <TextValidator
          fullWidth
          name="contestant-name"
          variant="outlined"
          required
          id="contestant-name"
          label="Contestant Name"
          autoFocus
          onChange={(event)=>{setName(event.target.value)}}
          value={name}
          validators={['required','isString']}
          errorMessages={['Name field is required','Invalid Contest Name']}
        />
      </Grid>
      <Grid item xs={12}>
        <TextValidator
          fullWidth
          multiline
          name="contestant-description"
          variant="outlined"
          required
          id="contestant-description"
          label="Contestant Description"
          autoFocus
          onChange={(event)=>{setDescription(event.target.value)}}
          value={description}
          validators={['required','isString']}
          errorMessages={['Name field is required','Invalid Description Name']}
        />
      </Grid>
      <Grid item xs={12} container spacing={1}>
        <Grid item xs={12}>
          Age:
        </Grid>
        <Grid item xs={10} sm={11}>
          <Slider
            value={age}
            defaultValue={20}
            step={1}
            min={20}
            max={100}
            onChange={(event, value)=>{setAge(value)}}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item xs={2} sm={1}>
          <Input
            className={classes.input}
            margin="dense"
            value={age}
            onChange={(event)=>{setAge(event.target.value === '' ? 20 : Number(event.target.value))}}
            inputProps={{
              step: 1,
              min: 20,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Grid>       
  )
}