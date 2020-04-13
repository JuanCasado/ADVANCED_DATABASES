
import React from 'react'
import Avatar from '@material-ui/core/Avatar'

import { auth, getUserData, firestore, collections } from '../Firebase'

export default function AvatarIcon (){

  const [img, setImg] = React.useState('')
  const content = img !==''? <Avatar alt={'user'} src={img} /> : null

  React.useEffect(()=>{
    let unsubscribe = auth().onAuthStateChanged((registered)=>{
      if (registered){
        const unsubscribePublic = firestore().collection(collections.users).doc(registered.uid).collection(collections.public).doc(collections.userData).onSnapshot((snapshot)=>{
          try{
            const user = snapshot.data()
            if (user.img!==''){setImg(user.img)}
          }catch{
            unsubscribePublic()
          }
        })
        const unsubscribePrivate = firestore().collection(collections.users).doc(registered.uid).collection(collections.private).doc(collections.userData).onSnapshot((snapshot)=>{
          try{
            const user = snapshot.data()
            if (user.img!==''){setImg(user.img)}
          }catch{
            unsubscribePrivate()
          }
        })
        getUserData(registered.uid).then((user)=>{
          let userImage = ''
          if (user.img!=='')
            userImage = user.img
          else if (registered.photoURL!=='')
            userImage = registered.photoURL
          else
            userImage ='https://source.unsplash.com/random'
          setImg(userImage)
        })
      }else{
        setImg('')
      }
    })
    return unsubscribe
  },[setImg])

  return content
}