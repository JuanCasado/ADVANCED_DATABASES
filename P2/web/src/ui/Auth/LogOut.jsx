import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { getTab, TabID } from '../Navigation/Tab'
import { Link } from 'react-router-dom'

import { logOut } from '../Firebase'

const LinkBehavior = React.forwardRef((props, ref) => (
  <Link ref={ref} to={getTab(TabID.Home).path} {...props} />
))

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  text: {
    margin: theme.spacing(4),
  },
}));

export default function LogOut () {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log Out
        </Typography>
        <Typography className={classes.text}>
          Hope to see you soon
        </Typography>
        <Button
          variant="contained"
          color='primary'
          onClick={logOut}
          component={LinkBehavior}
        >
          Confirm Log out
        </Button>
      </div>
    </Container>
  )
}