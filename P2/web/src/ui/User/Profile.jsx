
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import { isLoggedWithGoogle, getUserData, setUserData, setUserVisibility } from '../Firebase'
import { makeStyles } from '@material-ui/core/styles'
import LinkWithGoogle from '../Google/LinkWithGoogle'
import SelectFile from '../SelectFile'
import VoteHistory from './VoteHistory'

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'scroll',
    height: '85vh',
  },
  paper: {
    margin: theme.spacing(5),
    padding: theme.spacing(2),
  },
  img: {
    width: '100%',
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  buttonGroup: {
    textAlign:'right',
    marginRight: theme.spacing(5),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  correctedButtonGroup: {
    textAlign:'right',
    paddingTop: theme.spacing(-5),
    paddingBottom: theme.spacing(5),
    paddingRight: theme.spacing(7),
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));

function ProfileSwitch ({checked, callback}) {
  const handleClick = (event) => {
    callback(event.target.checked)
  }
  return (
    <FormControlLabel
      control={
        <Switch color="primary" 
          checked={checked}
          disabled={callback===null}
          onChange={handleClick}
        />
      }
      label={checked?'Public':'Private'}
      labelPlacement="top"
    />
  )
}

function ViewProfileBlock ({title, value, checked, callback = null}) {
  const classes = useStyles()

  return (
    <Grid container spacing={1}>
      <Grid item xs={9} sm={8}>
        <Typography className={classes.title}>
          {title}:
        </Typography>
        {value}
      </Grid>
      <Grid item xs={3} sm={4}>
        <ProfileSwitch checked={checked} callback={callback}/>
      </Grid>
    </Grid>
  )
}

function EditProfileBlock ({title, value, callback, multiline=false}) {
  const classes = useStyles()

  const handleChange = (event) => {
    callback(event.target.value);
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography className={classes.title}>
          {title}:
        </Typography>
        <TextField
          multiline={multiline}
          fullWidth
          label={title}
          defaultValue={value}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  )
}

export default function Profile () {
  const classes = useStyles()

  const [uid, setUid] = React.useState('')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [img, setImg] = React.useState('')
  const [description, setDescription] = React.useState('')

  const [publicName, setPublicName] = React.useState(true)
  const [publicEmail, setPublicEmail] = React.useState(true)
  const [publicDescription, setPublicDescription] = React.useState(true)
  const [publicImg, setPublicImg] = React.useState(true)
  const [editing, setEditing] = React.useState(false)

  React.useEffect(()=>{
    getUserData().then((user) => {
      if (user != null) {
        setUid(user.uid)
        setName(user.displayName)
        setEmail(user.email)
        setImg(user.img)
        setDescription(user.description)
        setPublicName(user.visibility.displayName)
        setPublicEmail(user.visibility.email)
        setPublicDescription(user.visibility.description)
        setPublicImg(user.visibility.img)
      }
    })
  },[editing])

  const save = () => {
    const publicData = {
      displayName: publicName?name:'',
      email: publicEmail? email:'',
      img: publicImg?img:'',
      description: publicDescription?description:'',
    }
    const privateData = {
      displayName: !publicName?name:'',
      email: !publicEmail? email:'',
      img: !publicImg?img:'',
      description: !publicDescription?description:'',
    }
    Promise.all([
      setUserData(publicData, true),
      setUserData(privateData, false)
    ]).catch(console.log)
  }

  return (
    <Container className={classes.root}  maxWidth="lg">
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5} md={6}>
            <img className={classes.img} src={img} alt={name}/>
            {editing? <SelectFile setImg={setImg}/> : 
              <ViewProfileBlock title={'Profile Image'} value={''} checked={publicImg} callback={(visibility)=>{setUserVisibility(visibility, img, 'img').then(setPublicImg(visibility))}}/>
            }
          </Grid>
          <Grid item xs={12} sm={7} md={6} container spacing={1}>
              {editing? <EditProfileBlock title={'Name'} value={name} callback={setName}/>:
                <ViewProfileBlock title={'Name'} value={name} checked={publicName}/>}
              {editing? <EditProfileBlock title={'Email'} value={email} callback={setEmail}/>:
                <ViewProfileBlock title={'Email'} value={email} checked={publicEmail} callback={(visibility)=>{setUserVisibility(visibility, email, 'email').then(setPublicEmail(visibility))}}/>}
              {editing? <EditProfileBlock title={'Description'} value={description} callback={setDescription} multiline={true}/>:
                <ViewProfileBlock title={'Description'} value={description} checked={publicDescription} callback={(visibility)=>{setUserVisibility(visibility, description, 'description').then(setPublicDescription(visibility))}}/>}
          </Grid>
        </Grid>
        <Container className={classes.buttonGroup} maxWidth="lg">
          <Button variant='contained' color='default' className={classes.button} onClick={save}>SAVE</Button>
        </Container>
      </Paper>
      <Container className={classes.correctedButtonGroup} maxWidth="lg">
        <Button variant='contained' color='default' className={classes.button} disabled={!editing} onClick={()=>{setEditing(false)}}>BACK</Button>
        <Button variant='contained' color='primary' className={classes.button} disabled={ editing} onClick={()=>{setEditing(true)}}>EDIT</Button>
      </Container>
      {isLoggedWithGoogle()? null :
        <Container className={classes.correctedButtonGroup} maxWidth="sm">
          <LinkWithGoogle/>
        </Container>
      }
      {uid===''? null :
        <VoteHistory userUid={uid}/>
      }
    </Container>
  )
}