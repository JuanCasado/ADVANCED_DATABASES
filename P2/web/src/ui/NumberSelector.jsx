

import React from 'react'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  input: {
    width: 50,
  },
}));

export default function NumberSelector ({title, value, setValue, initial=1, max=100, min=1, step=1}) {
  const classes = useStyles()
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {title}
      </Grid>
      <Grid item xs={10} sm={11}>
        <Slider
          value={value}
          defaultValue={initial}
          step={step}
          min={min}
          max={max}
          onChange={(event, value)=>{setValue(value)}}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item xs={2} sm={1}>
        <Input
          className={classes.input}
          margin="dense"
          value={value}
          onChange={(event)=>{setValue(event.target.value === '' ? initial : Number(event.target.value))}}
          inputProps={{
            step: step,
            min: min,
            max: max,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
        />
      </Grid>
    </Grid>
  )
}