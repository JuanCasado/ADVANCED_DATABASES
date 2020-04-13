
import React from 'react'
import Ranking from './Ranking'
import Typography from '@material-ui/core/Typography';

import { firestore, collections} from '../Firebase'

export default function RankingContestants ({contest}) {

  const [contestants, setContestants] = React.useState([])

  React.useEffect(()=>{
    const unsubscribe = firestore().collection(collections.contests).doc(contest.uuid).collection(collections.contestants).onSnapshot((snapshot)=>{
      const _contestants = []
      snapshot.docs.sort((user1, user2)=>{
        return user1.data().votes < user2.data().votes
      }).forEach((contestantRef)=>{
        const contestant = contestantRef.data()
        _contestants.push(
          <div>
            <Typography>Votes: {contestant.votes}</Typography>
            <Typography>Name: {contestant.name}</Typography>
            <Typography>Description: {contestant.description}</Typography>
            <Typography>Age: {contestant.age}</Typography>
          </div>
        )
      })
      setContestants(_contestants)
    })
    return unsubscribe
  },[contest.uuid, setContestants])

  return (
    <div>
      {contestants.length<=0? null:
        <Ranking sorted={contestants}/>
      }
    </div>
  )
}