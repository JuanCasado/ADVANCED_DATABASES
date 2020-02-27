
import React from 'react'
import ListItemText from '@material-ui/core/ListItemText';

export class Element extends React.Component {
  render () {
    return (
      <ListItemText primary={this.props.name} secondary={this.props.type} />
    )
  }
}