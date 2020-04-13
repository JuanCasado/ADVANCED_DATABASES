
import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'

import { firestore, collections } from '../Firebase'

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
    textAlign: 'left',
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    width: '100%',
    textAlign: 'center',
  },
}))(MuiExpansionPanelDetails);

const useStyles = makeStyles((theme) => ({
  contestantDescription: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: 'left',
  },
}));

export default function VoteHistory ({userUid}) {
  const classes = useStyles();

  const [contestExpanded, setContestExpanded] = React.useState(null)
  const [programExpanded, setProgramExpanded] = React.useState(null)
  const handleContestChange = (panel) => (event, newExpanded) => {
    setContestExpanded(newExpanded? panel : false);
    setProgramExpanded(false);
  }
  const handleProgramChange = (panel) => (event, newExpanded) => {
    setProgramExpanded(newExpanded? panel : false);
  }

  const [contests, setContests] = React.useState([])

  React.useEffect(()=>{
    (async () => {
      const _contests = []
      const contestRef = await firestore().collection(collections.contests).get()
      let contestCount = 0
      contestRef.forEach(async (contest)=>{
        const userRef = await contest.ref.collection(collections.users).doc(userUid).get()
        ++contestCount
        if (userRef.exists) {
          let contestData = contest.data()
          contestData.programs = []
          const programRef = await contest.ref.collection(collections.program).get()
          let programCount = 0
          programRef.forEach(async (program)=>{
            const userProgram = await userRef.ref.collection(program.data().uuid).get()
            ++programCount
            if (!userProgram.empty){
              let programData = program.data()
              programData.votes = []
              userProgram.forEach((vote)=>{
                programData.votes.push(vote.data())
              })
              contestData.programs.push(programData)
            }
            if (programCount >= programRef.size) {
              _contests.push(contestData)
              if (contestCount >= contestRef.size) {
                setContests(_contests)
              }
            }
          })
        }
      }) 
    })()
  },[setContests, userUid])

  return (
    <div>
      {contests.map((contest, index)=>(
        <ExpansionPanel square expanded={contestExpanded === index} onChange={handleContestChange(index)} key={index}>
          <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
            <Grid container>
              <Grid item xs={10}>
                <Typography>
                  {contest.name}
                </Typography>
                <Typography>
                  {contest.description}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Avatar alt={'user'} src={contest.img} />
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              {contest.programs.map((program, index)=>(
                <Grid item xs={11} key={index}>
                <ExpansionPanel square expanded={programExpanded === index} onChange={handleProgramChange(index)}>
                  <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Grid container>
                      <Grid item xs={10}>
                        <Typography>
                          {program.name}
                        </Typography>
                        <Typography>
                          {program.description}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Avatar alt={'user'} src={program.img} />
                      </Grid>
                    </Grid>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                  {program.votes.map((vote, index)=>(
                      <div key={index} className={classes.contestantDescription}>
                        {(vote.type==='single')?
                          <div>
                            <Typography>Single Contestant</Typography>
                            <Typography>Points: {vote.points}</Typography>
                            <Typography>Name: {vote.name}</Typography>
                            <Typography>Description: {vote.description}</Typography>
                          </div>
                        :
                          <div>
                            <Typography>Duet</Typography>
                            <Typography>Points: {vote.points}</Typography>
                            <Typography>Name: {vote.contestants[0].name}</Typography>
                            <Typography>Description: {vote.contestants[0].description}</Typography>
                            <Typography>Name: {vote.contestants[1].name}</Typography>
                            <Typography>Description: {vote.contestants[1].description}</Typography>
                          </div>
                        }
                      </div>
                  ))}
                </ExpansionPanelDetails>
              </ExpansionPanel>
              </Grid>
              ))}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  )
}