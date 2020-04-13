
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';


import { firestore, collections } from './Firebase'
import { getToken, vote } from './AdminActions'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '20vh',
    overflow: 'scroll',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));

export default function Vote ({contestUUID, programUUID}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {setOpen(true)}
  const handleClose = () => {setOpen(false)}

  const [checked, setChecked] = React.useState([]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  }

  const [contestants, setContestants] = React.useState([])
  React.useEffect(()=>{
    firestore().collection(collections.contests).doc(contestUUID).collection(collections.program).doc(programUUID).get()
    .then((programRef)=>{
      const program = programRef.data()
      setContestants(program.contestants)
    })
  },[setContestants, contestUUID, programUUID])

  const handleSend = () => {
    const votes = checked.map((check)=>{return check+''})
    getToken().then((token)=>{
      vote(token, contestUUID, programUUID, votes)
    })
    handleClose()
  }

  return (
    <div>
      <Button className={classes.button} variant="contained" color="primary" onClick={handleOpen}>vOTE</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Vote</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select at least two single contestants and one duet, a maximum of four selections can be made.
          </DialogContentText>
          <List className={classes.root}>
          {contestants.map((contestant, index) => {
            const labelId = `checkbox-list-label-${index}`;
            return (
              <ListItem key={index} role={undefined} dense button onClick={handleToggle(index)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(index) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={
                  contestant.type==='single'?
                    `${contestant.name}`:
                    `Duet of ${contestant.contestants[0].name} and ${contestant.contestants[1].name}`
                  } />
              </ListItem>
            )
          })}
        </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSend} color="primary">
            SEND
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}