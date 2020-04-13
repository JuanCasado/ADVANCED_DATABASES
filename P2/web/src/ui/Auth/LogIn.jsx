import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { ValidatorForm } from 'react-material-ui-form-validator'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import LogInWithGoogle from '../Google/LogInWithGoogle'
import { logIn } from '../Firebase'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    height: '85vh',
  },
  paper: {
    paddingTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    flexGrow: 1,
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogIn() {
  const classes = useStyles();
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [openSuccess, setOpenSuccess] = React.useState(false)
  const [openError, setOpenError] = React.useState(false)
  
  const submitLogIn = () => {
    logIn(email, password)
    .then(()=>{
      setOpenSuccess(true)
    })
    .catch(()=>{
      setOpenError(true)
    })
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <ValidatorForm 
          className={classes.form}
          onSubmit={submitLogIn}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event)=>{setEmail(event.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event)=>{setPassword(event.target.value)}}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <LogInWithGoogle/>
        </ValidatorForm>
      <Snackbar open={openSuccess} autoHideDuration={5000} onClose={()=>{setOpenSuccess(false)}}>
        <Alert onClose={()=>{setOpenSuccess(false)}} severity="success">
          Logged In!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={5000} onClose={()=>{setOpenError(false)}}>
        <Alert onClose={()=>{setOpenError(false)}} severity="error">
          Something went wrong, try again later.
        </Alert>
      </Snackbar>
      </div>
    </Container>
  );
}