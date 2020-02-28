
import React from 'react'
import { connect } from "react-redux";
import './PopUp.css'

import {popUpStore, setVisible } from './PopUpActions'

import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import Holder from '../Holder'

const mapStateToProps = state => {
  return { 
    visible: state.visible,
    coordinates: state.coordinates,
    content: state.content
  };
};

const popUp = (props) => {
  const popup = props.visible?
    <Container fixed className='ol-popup'>
      <IconButton aria-label="delete" onClick={()=>{popUpStore.dispatch(setVisible(false))}}>
        <Close fontSize="small" />
      </IconButton>
      {props.coordinates}
      <Holder content={props.content}/>
    </Container>:''
  return popup
}

const PopUp = connect(mapStateToProps)(popUp)
export default PopUp