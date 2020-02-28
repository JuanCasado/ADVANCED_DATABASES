
import React from 'react'
import ListItemText from '@material-ui/core/ListItemText';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';

import { addPoint } from '../OLMap/MapFeatures'

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
});

export function Element (props) {
  const classes = useStyles();
  const valuetext = (value) => {
    addPoint(props.route[value])
    return props.route[value]
  }
  return (
    <div>
      <ListItemText primary={props.name} secondary={props.type} />
      {props.costs?
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Area</TableCell>
                  <TableCell align="right">Distance</TableCell>
                  <TableCell align="right">Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.costs.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.cost.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.distance.toFixed(3)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Slider
            defaultValue={0}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            step={1}
            min={0}
            max={props.route.length-1}
            valueLabelDisplay="auto"
          />
        </div>
      :null}
    </div>
  )
}