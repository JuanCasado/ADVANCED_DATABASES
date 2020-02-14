
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function  Holder (props) {
  const classes = useStyles()
  return (
    <List className={classes.root}>
      {props.content.map((element, index) => {
        const divider = index<(props.content.length-1)? <Divider /> : ''
        return(
          <div>
            <ListItem key={index}>
              {element}
            </ListItem>
            {divider}
          </div>
      )})}
    </List>
  )
}
