import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      <Link color="inherit" href="http://mrblissfulgrin.com">
        mrblissfulgrin
      </Link>
      {'  >  '}
      <Link color="inherit" href="https://github.com/JuanCasado">
        GitHub
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
  },
  footer: {
    padding: theme.spacing(1),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function Footer () {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">Advanced Databases</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}