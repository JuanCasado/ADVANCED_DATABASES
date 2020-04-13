
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { auth, firestore, collections, createUuid } from '../Firebase'

export default function MSGWriter ({contestUUID, programUUID, msgs, text='REPLAY'}) {
  const [open, setOpen] = React.useState(false)
  const [msg, setMsg] = React.useState('')

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleSend = () => {
    if (contestUUID && programUUID) {
      let msgCollection = firestore().collection(collections.contests).doc(contestUUID).collection(collections.program).doc(programUUID).collection(collections.msg)
      if (msgs){
        for (let msg of msgs) {
          msgCollection = msgCollection.doc(msg).collection(collections.msg)
        }
      }
      const uuid = createUuid()
      msgCollection.doc(uuid).set({
        uuid: uuid,
        msg: msg,
        from: auth().currentUser.uid,
      }).catch(console.log)
    }
    handleClose()
  }

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>{text}</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New msg</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write the content of your msg and click send
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="msg"
            type="msg"
            value={msg}
            onChange={(event)=>{setMsg(event.target.value)}}
            fullWidth
          />
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