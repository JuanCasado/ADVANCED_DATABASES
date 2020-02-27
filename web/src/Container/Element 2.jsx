
import React from 'react'
import ListItemText from '@material-ui/core/ListItemText';

export const FIR = 'FIR'
export const UIR = 'UIR'
export const FLIGHT = 'FLIGHT'


export default function createElement (element, name) {
  switch (element) {
    case FIR: return <Element name={name} type={FIR}/>
    case UIR: return <Element name={name} type={UIR} />
    case FLIGHT: return <Element name={name} type={FLIGHT} />
    default: return null
  }
}

class Element extends React.Component {
  render () {
    return (
      <ListItemText primary={this.props.name} secondary={this.props.type} />
    )
  }
}