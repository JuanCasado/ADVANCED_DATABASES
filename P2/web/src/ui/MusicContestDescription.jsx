

import React from 'react';
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ProgramList from './ProgramList';
import RankingUsers from './Rankings/RankingUsers';
import RankingContestants from './Rankings/RankingContestants';


const useStyles = makeStyles((theme) => ({
  container: {
    height: '75vh',
    overflow: 'scroll',
  },
  paper: {
    padding: theme.spacing(4),
    margin: theme.spacing(4),
  },
  centered: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
  },
  img: {
    width: '100%',
  }
}));

const names = {
  programs: 'PROGRAMS',
  participants: 'PARTICIPANTS',
  contestants: 'CONTESTANTS',
}
const getDisplay = (display, contest) => {
  switch (display) {
    case names.programs: return <ProgramList contest={contest}/>
    case names.participants: return <RankingUsers contest={contest}/>
    case names.contestants: return <RankingContestants contest={contest}/>
    default: return <div/>
  }
}

export default function MusicContestDescription ({contest}) {
  const classes = useStyles();

  const [viewing, setViewing] = React.useState(names.programs)
  const display = getDisplay (viewing, contest)

  return (
    <Container className={classes.container} maxWidth='lg'>
      <Paper className={classes.paper}>
        <Container className={classes.centered}>
          <Grid container>
            <Grid item xs={12}>
              <img className={classes.img} src={contest.img} alt={contest.name}/>
            </Grid>
          </Grid>
        </Container>
        <Typography gutterBottom variant="h5" component="h2">
          {contest.name}
        </Typography>
        <Typography>
          {contest.description}
        </Typography>
        <Typography>
          Current program: #{contest.programs}
        </Typography>
        <Container className={classes.centered}>
          <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button disabled={viewing===names.programs} onClick={()=>setViewing(names.programs)}>{names.programs}</Button>
            <Button disabled={viewing===names.participants} onClick={()=>setViewing(names.participants)}>{names.participants}</Button>
            <Button disabled={viewing===names.contestants} onClick={()=>setViewing(names.contestants)}>{names.contestants}</Button>
          </ButtonGroup>
        </Container>
        <Container className={classes.centered}>
          {display}
        </Container>
      </Paper>
    </Container>
  )
}