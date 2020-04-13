
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: 'left',
  },
}));

export default function Ranking ({sorted}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
      {sorted.map((element, index)=>(
        <Grid key={index} container item xs={12}>
          <Grid item xs={1}>
            {index + 1}
          </Grid>
          <Grid item xs={11}>
            {element}
          </Grid>
        </Grid>
      ))}
      </Grid>
    </div>
  )
}