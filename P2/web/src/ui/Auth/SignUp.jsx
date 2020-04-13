import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { Link } from 'react-router-dom'
import { getTab, TabID } from '../Navigation/Tab'

import { signUp } from '../Firebase'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const LinkBehavior = React.forwardRef((props, ref) => (
  <Link ref={ref} to={getTab(TabID.Home).path} {...props} />
))

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp () {
  const classes = useStyles();
  const [name, setName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [repeatedPassword, setRepeatedPassword] = React.useState('')
  const [success, setSuccess] =  React.useState(false)

  const [openSuccess, setOpenSuccess] = React.useState(false)
  const [openError, setOpenError] = React.useState(false)
  
  React.useEffect(()=>{
    ValidatorForm.addValidationRule('passwordMatch', () => {
      return password === repeatedPassword
    })
    return ()=>{ValidatorForm.removeValidationRule('passwordMatch')}
  },[password,repeatedPassword])

  const submitSignUp = () => {
    signUp(name+' '+lastName, email, password)
    .then((response)=>{
      setOpenSuccess(true)
      setSuccess(true)
    })
    .catch((error)=>{
      console.log(error)
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
          Sign up
        </Typography>
        <ValidatorForm
          onSubmit={submitSignUp}
          instantValidate={true}
          className={classes.form}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextValidator
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(event)=>{setName(event.target.value)}}
                value={name}
                validators={['required','isString']}
                errorMessages={['Name field is required','Invalid name']}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(event)=>{setLastName(event.target.value)}}
                value={lastName}
                validators={['required','isString']}
                errorMessages={['Last name field is required','Invalid last name']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event)=>{setEmail(event.target.value)}}
                value={email}
                validators={['required', 'isEmail', 'minStringLength:10']}
                errorMessages={['Email field is required', 'Email is not valid','Email is not valid']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event)=>{setPassword(event.target.value)}}
                value={password}
                validators={['required','minStringLength:10']}
                errorMessages={['Password field is required','Password must be at least 10 characters long']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                name="repeat-password"
                label="Repeat Password"
                type="password"
                id="repeat-password"
                autoComplete="current-password"
                onChange={(event)=>{setRepeatedPassword(event.target.value)}}
                value={repeatedPassword}
                validators={['required', 'passwordMatch']}
                errorMessages={['Password field is required', 'Repeated password do not match']}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </ValidatorForm>
        {success? 
          <Button
            variant="contained"
            component={LinkBehavior}
          >
            Log In
          </Button>
        : null}
        <Snackbar open={openSuccess} autoHideDuration={5000} onClose={()=>{setOpenSuccess(false)}}>
          <Alert onClose={()=>{setOpenSuccess(false)}} severity="success">
            Signed Up!, Log In to you account
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