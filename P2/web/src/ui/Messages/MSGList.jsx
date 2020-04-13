
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import UserBox from './UserBox';
import MSGWriter from './MSGWriter';

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
  },
}))(MuiExpansionPanelDetails);


export default function MSGList ({contestUUID, programUUID, msgs}) {
  
  const [expanded, setExpanded] = React.useState(null)
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded? panel : false);
  }
  const [messages, setMessages] = React.useState([])

  React.useEffect(()=>{
    let unsubscribe = ()=>{}
    if (contestUUID && programUUID) {
      let msgCollection = firestore().collection(collections.contests).doc(contestUUID).collection(collections.program).doc(programUUID).collection(collections.msg)
      if (msgs){
        for (let msg of msgs) {
          msgCollection = msgCollection.doc(msg).collection(collections.msg)
        }
      }
      unsubscribe = msgCollection.onSnapshot((snapshot)=>{
        let _messages = []
        snapshot.forEach((document)=>{
          _messages.push(document.data())
        })
        setMessages(_messages)
      })
    }
    return unsubscribe
  },[setMessages, contestUUID, programUUID, msgs])
  
  return(messages.length <= 0? null :
    <div>
      {messages.map((message, index)=>(
        <ExpansionPanel square expanded={expanded === index} onChange={handleChange(index)} key={index}>
          <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
            <Grid container>
              <Grid item xs={7}>
                <Typography>
                  {message.msg}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <UserBox userUID={message.from}/>
              </Grid>
              <Grid item xs={12}>
                <MSGWriter contestUUID={contestUUID} programUUID={programUUID} msgs={[...msgs, message.uuid]}/>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <MSGList contestUUID={contestUUID} programUUID={programUUID} msgs={[...msgs, message.uuid]}/>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  )
}
