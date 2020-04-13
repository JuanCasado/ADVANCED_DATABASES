
import React from 'react'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import PointList from '../PointList'
import DuetList from '../DuetList'
import { makeStyles } from '@material-ui/core/styles';
import NumberSelector from '../NumberSelector'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import Grid from '@material-ui/core/Grid'

import { createProgram, createUuid, firestore, collections } from '../Firebase'
import SelectFile from '../SelectFile'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '85vh',
  },
  container: {
    height: '80vh',
    overflow: 'scroll',
  },
  paper: {
    padding: theme.spacing(8),
    margin: theme.spacing(8),
  },
  input: {
    width: 42,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  buttonGroup: {
    textAlign:'right',
    paddingTop: theme.spacing(5),
  },
}));

export default function ProgramBuilder ({contest}) {
  const classes = useStyles();

  const [uuid, ] = React.useState(createUuid())
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [img, setImg] = React.useState('https://source.unsplash.com/random')

  const [numberOfDuets, setNumberOfDuets] = React.useState(1)
  const [points, setPoints] = React.useState([])
  const [duets, setDuets] = React.useState([])
  const [contestants, setContestants] = React.useState([])

  React.useEffect(()=>{
    firestore().collection(collections.contests).doc(contest.uuid).collection(collections.contestants).onSnapshot((snapshot)=>{
      let contestants_ = []
      snapshot.forEach((contestant)=>{
        contestants_.push(contestant.data())
      })
      setContestants(contestants_)
    })
  }, [setContestants,contest.uuid])
  
  const save = () => {
    const program = {
      uuid: uuid,
      name: name,
      description: description,
      img: img,
      contestants: [
        ...contestants.map((contestant, index)=>{return {
          type: 'single',
          ...contestant,
          points: points[index],
        }}),
        ...duets,
      ]
    }
    createProgram(contest, program)
  }

  return (
    <Container className={classes.container} maxWidth='lg'>
      <Paper className={classes.paper}>
        Program Number: {contest.programs+1}
        <ValidatorForm
            instantValidate={true}
            className={classes.form}
            onSubmit={()=>{}}
          >
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextValidator
                fullWidth
                name="program-name"
                variant="outlined"
                required
                id="program-name"
                label="Program Name"
                autoFocus
                onChange={(event)=>{setName(event.target.value)}}
                value={name}
                validators={['required','isString']}
                errorMessages={['Name field is required','Invalid Contest Name']}
              />
              </Grid>
              <Grid item xs={12}>
              <TextValidator
                fullWidth
                multiline
                name="program-description"
                variant="outlined"
                required
                id="program-description"
                label="Program Description"
                autoFocus
                onChange={(event)=>{setDescription(event.target.value)}}
                value={description}
                validators={['required','isString']}
                errorMessages={['Name field is required','Invalid Description Name']}
              />
              </Grid>
              <Grid item xs={8}>
              <TextValidator
                fullWidth
                name="program-img"
                variant="outlined"
                required
                id="program-img"
                label="Program Image"
                autoFocus
                onChange={(event)=>{setImg(event.target.value)}}
                value={img}
                validators={['isUrl']}
                errorMessages={['Invalid Image Url']}
              />
            </Grid>
            <Grid item xs={4}>
              <SelectFile setImg={setImg} uuid={uuid}/>
            </Grid>
          </Grid>
          {contestants.length<=0?null:
            <div>
              <NumberSelector title='Number of Duets:' max={contestants.length} value={numberOfDuets} setValue={setNumberOfDuets} />
              Contestants:
              <PointList callbackPoints={setPoints} contestants={contestants}/>
              Duets:
              <DuetList callbackDuets={setDuets} contestants={contestants} numberOfDuets={numberOfDuets}/>
              <div className={classes.buttonGroup}>
                <Button variant="contained" color="primary" onClick={save}>
                  SAVE
                </Button>
              </div>
            </div>
          }
        </ValidatorForm>
      </Paper>
    </Container>
  )
}