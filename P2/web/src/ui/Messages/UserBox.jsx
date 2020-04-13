
import React from 'react'
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'

import { firestore, collections } from '../Firebase'

export default function UserBox ({userUID}) {

  const [user, setUser] = React.useState(null)
  React.useEffect(()=>{
    const unsubscribe = firestore().collection(collections.users).doc(userUID).collection(collections.public).doc(collections.userData)
    .onSnapshot((snapshot)=>{
      setUser(snapshot.data())
    })
    return unsubscribe
  })

  return (user===null?null:
    <Grid container>
      <Grid item xs={10}>
        <Typography>{user.displayName}</Typography>
        <Typography>{user.email}</Typography>
      </Grid>
      {user.img&&user.img!==''?
        <Grid item xs={2}>
          <Avatar alt={'user'} src={user.img} />
        </Grid>:null
      }
      <Grid item xs={12}>
        {user.description}
      </Grid>
    </Grid>
  )
}
