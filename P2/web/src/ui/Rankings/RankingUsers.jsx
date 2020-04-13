
import React from 'react'
import Ranking from './Ranking'
import UserBox from '../Messages/UserBox'

import { firestore, collections} from '../Firebase'

export default function RankingUsers ({contest}) {

  const [users, setUsers] = React.useState([])

  React.useEffect(()=>{
    let unsubscribeUser = ()=>{}
    const unsubscribeContest = firestore().collection(collections.contests).doc(contest.uuid).collection(collections.users).onSnapshot((snapshot)=>{
      const _users = []
      snapshot.docs.sort((user1, user2)=>{
        return user1.data().points < user2.data().points
      }).forEach((userRef)=>{
        const user = userRef.data()
        _users.push(
          <div>
            Points: {user.points}
            <UserBox userUID={user.uid}/>
          </div>
        )
      })
      setUsers(_users)
    })
    const unsubscribe = ()=>{unsubscribeContest(); unsubscribeUser()}
    return unsubscribe
  }, [setUsers, contest.uuid])

  return (
    <div>
      {users.length<=0? null:
        <Ranking sorted={users}/>
      }
    </div>
  )
}