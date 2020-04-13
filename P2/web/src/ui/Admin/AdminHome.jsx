
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import MusicContestList from '../MusicContestList'
import ProgramBuilder from './ProgramBuilder'
import MusicContestDescription from '../MusicContestDescription'

import { Link } from 'react-router-dom'
import { TabID, getTab } from '../Navigation/Tab'

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

export default function AdminHome() {
  const classes = useStyles();
  const [contest, setContest] = React.useState(null)
  const [action, setAction] = React.useState('VIEW')

  const actions = [
    {callback:(contest)=>{setAction('EDIT');setContest(contest)}, name:'NEXT PROGRAM'},
    {callback:(contest)=>{setAction('VIEW');setContest(contest)}, name:'VIEW'},
  ]

  const display = contest===null? 
    <Container className={classes.cardGrid} >
      <MusicContestList actions={actions}/> 
    </Container>:
    action==='EDIT'?<ProgramBuilder contest={contest}/>:<MusicContestDescription contest={contest}/>

  return (
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Music Contests
            </Typography>
            {contest===null?
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" component={Link} to={getTab(TabID.ContestBuilder).path}>
                    Create new Contest
                  </Button>
                </Grid>
              </Grid>
            :
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
          {display}
      </main>
  )
}