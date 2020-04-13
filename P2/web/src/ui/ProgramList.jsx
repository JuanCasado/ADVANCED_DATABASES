
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MSGWriter from './Messages/MSGWriter';

import { firestore, collections, auth } from './Firebase'
import MSGList from './Messages/MSGList';
import Vote from './Vote';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  programDescription: {
    width: '100%',
    textAlign: 'left',
    paddingTop: theme.spacing(2),
  },
  msgButton: {
    width: '100%',
    display: 'flex',
    margin: theme.spacing(2),
    flexDirection:'row',
  },
}));

export default function ProgramList ({contest}) {
  const classes = useStyles();

  const [programs, setPrograms] = React.useState([])
  const [selectedProgram, setSelectedProgram] = React.useState(null)

  const displayProgram = React.useCallback((program) => {
    return (
      <div className={classes.programDescription}>
        <Typography gutterBottom variant="h5" component="h2">
          {program.name}
        </Typography>
        <Typography>
          {program.description}
        </Typography>
        {auth().currentUser===null?null:
          <div>
            <div className={classes.msgButton}>
              <MSGWriter contestUUID={contest.uuid} programUUID={program.uuid} text={'WRITE MESSAGE'}/>
              {((contest.programs-1)===program.number)? <Vote contestUUID={contest.uuid} programUUID={program.uuid}/>:null }
            </div>
            <MSGList contestUUID={contest.uuid} programUUID={program.uuid} msgs={[]}/>
          </div>
        }
      </div>
    )
  },[classes.programDescription, classes.msgButton, contest])

  React.useEffect(()=>{
    const unsubscribe = firestore().collection(collections.contests).doc(contest.uuid).onSnapshot(()=>{
      firestore().collection(collections.contests).doc(contest.uuid).collection(collections.program).get().then((response)=>{
        let programs_ = []
        response.docs.sort((program1, program2)=>{
          return program1.number < program2.number
        }).forEach((program)=>{
          programs_.push(program.data())
        })
        if (programs_.length>0){
          programs_ = programs_.reverse()
          setPrograms(programs_)
          setSelectedProgram(displayProgram(programs_[0]))
        }
      })
    })
    return unsubscribe
  },[contest, setPrograms, setSelectedProgram, displayProgram])

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.2}>
        {programs.map((program, index) => (
          <GridListTile key={index}>
            <img src={program.img} alt={program.name} />
            <GridListTileBar
              title={program.name+': '+program.description}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <Button variant="contained" color="primary" onClick={()=>{setSelectedProgram(displayProgram(program))}}> VIEW </Button>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      {selectedProgram}
    </div>
  )
}