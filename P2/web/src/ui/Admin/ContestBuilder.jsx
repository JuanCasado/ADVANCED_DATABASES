
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditContest from './EditContest';
import CreateContestant from './CreateContestant'

import { createContest, createUuid } from '../Firebase'

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon({ active, completed }) {
  const classes = useQontoStepIconStyles();

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};


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

const configureContest = 'Configure Contest'
const createContestant = 'Create Contestant #'

function getSteps(contestants) {
  contestants = contestants >= 1? contestants : 1
  return [configureContest, ...[...Array(contestants).keys()].map(contestantNumber=>createContestant+(contestantNumber+1))];
}

export default function ContestBuilder() {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0);
  
  const [uuid, ] = React.useState(createUuid())
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [img, setImg] = React.useState('https://source.unsplash.com/random')
  const [contestants, setContestants] = React.useState(1)
  const [contestContestants, setContestContestants] = React.useState([{name: '', description: '', age: 30}])

  const updateContestants = (_contestants) => {
    let _contestContestants = []
    for (let i = 0; i < _contestants; ++i){
      if (contestants < i && contestContestants[i]!==undefined) {
        _contestContestants.push(contestContestants[i])
      } else {
        _contestContestants.push({
          name: '', description: '', age: 30,
        })
      }
    }
    setContestContestants(_contestContestants)
    setContestants(_contestants)
  }
  const updateSingleContestantName = (name, number) => {
    contestContestants[number].name = name
    setContestContestants([...contestContestants])
  }
  const updateSingleContestantDescription = (description, number) => {
    contestContestants[number].description = description
    setContestContestants([...contestContestants])
  }
  const updateSingleContestantAge = (age, number) => {
    contestContestants[number].age = age
    setContestContestants([...contestContestants])
  }

  const getStepContent = (step) => {
    if (step === 0)
      return <EditContest uuid={uuid}
        name={name} setName={setName} 
        description={description} setDescription={setDescription}
        img={img} setImg={setImg} 
        contestants={contestants} setContestants={updateContestants}/>
    else
      return <CreateContestant
        name={contestContestants[activeStep-1].name} setName={(value)=>{updateSingleContestantName(value, activeStep-1)}}
        description={contestContestants[activeStep-1].description} setDescription={(value)=>{updateSingleContestantDescription(value, activeStep-1)}}
        age={contestContestants[activeStep-1].age} setAge={(value)=>{updateSingleContestantAge(value, activeStep-1)}}
      />
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleReset = () => {
    setName('')
    setDescription('')
    setImg('')
    setContestants(0)
    updateContestants(1)
    setActiveStep(0)
  }

  const steps = getSteps(contestants)

  const handleCreateContest = () => {
    createContest({
      uuid: uuid,
      name: name,
      description: description,
      img: img,
    }, contestContestants)
    handleReset()
  }

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Container className={classes.container} maxWidth='lg'>
        <Paper className={classes.paper}>
          <ValidatorForm
            instantValidate={true}
            className={classes.form}
            onSubmit={()=>{}}
          >
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed
                </Typography>
                <Container className={classes.buttonGroup} >
                  <Button 
                    onClick={handleCreateContest} 
                    className={classes.button}
                    color='primary' 
                    variant='contained'
                    type='submit'
                  >
                    CREATE THE CONTEST
                  </Button>
                </Container>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions} variant='h3'>
                  {steps[activeStep]}
                </Typography>
                  {getStepContent(activeStep)}
                  <Container className={classes.buttonGroup} >
                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Container>
              </div>
            )}
          </ValidatorForm>
        </Paper>
      </Container>
    </div>
  );
}