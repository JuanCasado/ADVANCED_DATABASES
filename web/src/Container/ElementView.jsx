
import React from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import Holder from './Holder'

const useStyles = makeStyles(theme => ({
  text: {
    width:'100%',
    marginTop: theme.spacing(1),
  }
}));

export default function  ElementView (props) {
  const classes = useStyles()
  const update = props.update
  const createNew = props.createNew
  const [value, setValue] = React.useState('')
  const handleChange = event => {
    setValue(event.target.value)
  }
  const [content, setContent] = React.useState([])
  const handleUpdate = () => {
    update().then(newContent => setContent(newContent))
  }
  React.useEffect(()=>{
    update().then(newContent => setContent(newContent))
  },[update])

  return (
    <Container>
      <h3>{props.name}</h3>
      <ButtonGroup variant="contained" color="primary">
        <Button onClick={()=>{
          createNew(value).then(()=>{
            setValue('')
            handleUpdate()
          })}
          }>Create New</Button>
        <Button onClick={handleUpdate}>Update</Button>
      </ButtonGroup>
      <TextField
          label={props.name}
          value={value}
          onChange={handleChange}
          variant="outlined"
          className={classes.text}
        />
      <Holder content={content}/>
    </Container>
  )
}
