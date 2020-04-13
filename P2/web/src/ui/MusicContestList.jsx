

import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { firestore, collections } from './Firebase'


const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function MusicContestList ({actions}) {
  const classes = useStyles()

  const [contests, setContests] = React.useState([])

  React.useState(()=>{
    return firestore().collection(collections.contests).onSnapshot((contests) => {
      setContests(contests.docs.map((doc)=>{return doc.data()}))
    })
  },[setContests])

  return (
    <Grid container spacing={4}>
      {contests.map((contest, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={contest.img!==''?contest.img:'https://source.unsplash.com/random'}
              title={contest.name}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {contest.name}
              </Typography>
              <Typography>
                {contest.description}
              </Typography>
            </CardContent>
            <CardActions>
              {actions.map((action, index)=>(
                <Button key={index} size="small" color="primary" onClick={()=>{action.callback(contest)}}>{action.name}</Button>
              ))}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}