
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import MusicContestList from './MusicContestList'
import MusicContestDescription from './MusicContestDescription'


const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(2),
  },
  cardGrid: {
    height: '75vh',
    overflow: 'scroll',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  }
}));

export default function Home() {
  const classes = useStyles();

  const [contest, setContest] = React.useState(null)

  const actions = [
    {callback:setContest, name:'VIEW'},
  ]

  const display = contest===null? <MusicContestList actions={actions}/> : 
                  <MusicContestDescription contest={contest}/>

  return (
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Music Contests
            </Typography>
            {contest===null? null:
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="default" onClick={()=>{setContest(null)}}>
                    Go back to Contest List
                  </Button>
                </Grid>
              </Grid>
            }
          </Container>
        </div>
        <Container className={classes.cardGrid} >
          {display}
        </Container>
      </main>
  )
}