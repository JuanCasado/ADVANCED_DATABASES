

import React from 'react'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import * as AdminActions from '../AdminActions'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'scroll',
    height: '85vh',
  },
  paper: {
    margin: theme.spacing(5),
    padding: theme.spacing(2),
  },
  img: {
    width: '100%',
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  buttonGroup: {
    textAlign:'right',
    marginRight: theme.spacing(5),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  correctedButtonGroup: {
    textAlign:'right',
    paddingTop: theme.spacing(-5),
    paddingBottom: theme.spacing(5),
    paddingRight: theme.spacing(7),
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));

function AdminSwitch ({checked, callback=null}) {
  const handleClick = (event) => {
    callback(event.target.checked)
  }
  return (
    <FormControlLabel
      control={
        <Switch color="primary" 
          checked={checked}
          disabled={callback===null}
          onChange={handleClick}
        />
      }
      label={checked?'Admin':'User'}
      labelPlacement="top"
    />
  )
}

export default function ManageAdmins () {
  const classes = useStyles()

  const [idToken, setIDToken] = React.useState('')
  const [userList, setUserList] = React.useState([])

  React.useEffect(()=>{
    AdminActions.getToken().then(setIDToken).catch(console.log)
    AdminActions.listUsers().then(setUserList).catch(console.log)
  },[setIDToken,setUserList])

  const changeAdmin = async (uid, currentSate) => {
    if(currentSate){
      await AdminActions.removeAdmin(uid)}
    else {
      await AdminActions.addAdmin(uid)
    }
    AdminActions.listUsers().then(setUserList).catch(console.log)
  }

  const isAdmin = (user) => {
    return user.customClaims!==undefined && user.customClaims.admin!==undefined && user.customClaims.admin
  }

  return (
    <Container className={classes.root}  maxWidth="lg">
      <Paper className={classes.paper}>
        <TextField
          fullWidth
          label="IDToken"
          value={idToken}
          variant="outlined"
        />
        <List>
          {userList.map((user, index)=>(
            <ListItem key={index}>
              <ListItemText primary={'Name: '+user.displayName} secondary={'Email: '+user.email} />
              <ListItemSecondaryAction>
                <AdminSwitch checked={isAdmin(user)} callback={()=>{changeAdmin(user.uid ,isAdmin(user))}}/>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  )
}