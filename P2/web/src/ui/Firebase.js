
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'

import { v4 as uuid } from 'uuid'
export const createUuid = () => {return uuid()}

export const collections = {
  contests: 'Contests',
  program: 'Programs',
  users: 'Users',
  public: 'Public',
  private: 'Private',
  userData: 'Data',
  msg: 'Messages',
  contestants: 'Contestants',
}

const configuration = {
  apiKey: "AIzaSyBHmYGKgIyWZg4p5CFbMPtsjeOeeBt-m88",
  authDomain: "advancedfirebase-2e194.firebaseapp.com",
  databaseURL: "https://advancedfirebase-2e194.firebaseio.com",
  projectId: "advancedfirebase-2e194",
  storageBucket: "advancedfirebase-2e194.appspot.com",
  messagingSenderId: "347041649722",
  appId: "1:347041649722:web:45b8f0f5e8a613a55f1103",
  measurementId: "G-1Q483P3HF0"
};

firebase.initializeApp(configuration)

export const auth = ()=>{return firebase.auth()}
export const database = ()=>{return firebase.database()}
export const firestore = ()=>{return firebase.firestore()}
export const storage = ()=>{return firebase.storage()}
const provider = new firebase.auth.GoogleAuthProvider()

export const signUp = async (name, email, password) => {
  return auth().createUserWithEmailAndPassword(email, password)
  .then((response)=>{
    const unsubscribe = auth().onAuthStateChanged(()=>{
      setUserData({
        displayName: name,
        email: email,
        img: 'https://source.unsplash.com/random',
        description: 'Hi there!',
      })
      .then(console.log)
      .catch(console.log)
      unsubscribe()
    })
    return response
  })
}

export const logIn = async (email, password) => {
  return auth().signInWithEmailAndPassword(email, password)
}

export const logOut = async () => {
  return auth().signOut()
}

export const linkWithGoogle = () => {
  auth().currentUser.linkWithPopup(provider)
  .then((response)=>{
    if (response.operationType === "link"){
      const user = response.user.providerData.filter((provider)=>{return provider.providerId === "google.com"})[0]
      setUserData({
        displayName: user.displayName,
        email: user.email,
        img: user.photoURL,
        description: 'Hi there!',
      }).catch(console.log)
      auth().currentUser.updateProfile({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }).catch(console.log)
    }
  })
  .catch(console.log)
}
export const logInWithGoogle = () => {
  auth().signInWithPopup(provider)
  .then((response)=>{
    if (response.additionalUserInfo.isNewUser){
      getUserData((userData)=>{
        setUserData({
          displayName: response.user.displayName,
          email: response.user.email,
          img: response.user.photoURL,
          description: userData.description,
        }).catch(console.log)
      }).catch(console.log)
    }
  })
  .catch(console.log)
}
export const isLoggedWithGoogle = () => {
  return auth().currentUser.providerData.reduce((prev, data)=>{return prev || data.providerId==='google.com'},false)
}

export const createContest = (contest, contestants) => {
  contest.programs = 0
  if (contest.name === '') {
    contest.name = 'Contest '+contest.uuid
  }
  if (contest.description === '') {
    contest.description = 'Description '+contest.uuid
  }
  if (contest.img === '') {
    contest.img = 'https://source.unsplash.com/random'
  }
  contestants.forEach((contestant, index) => {
    if (contestant.name === '') {
      contestant.name = 'Contestant '+ index
    }
    if (contestant.description === '') {
      contestant.description = 'Description '+index
    }
    contestant.votes = 0
    contestant.uuid = index+''
  })
  firestore().collection(collections.contests).doc(contest.uuid).set(contest).catch(console.log)
  contestants.forEach((contestant, index) => {
    firestore().collection(collections.contests).doc(contest.uuid).collection(collections.contestants).doc(index+'').set(contestant).catch(console.log)
  })
}

export const createProgram = (contest, program) => {
  program.number = contest.programs
  if (program.name === '') {
    program.name = 'Contest '+program.uuid
  }
  if (program.description === '') {
    program.description = 'Description '+program.uuid
  }
  firestore().collection(collections.contests).doc(contest.uuid).collection(collections.program).doc(program.uuid).set(program)
  .then(()=>{
    firestore().collection(collections.contests).doc(contest.uuid).update({programs: firebase.firestore.FieldValue.increment(1)})
  }).catch(console.log)
}

export const uploadFile = (file, callback=null, uuid=null) => {
  const [type, extension] = file.type.split('/')
  if (type === 'image' && extension !== null) {
    const metadata = { 
      contentType: file.type,
      customMetadata: {
        'public': 'true',
      }
    }
    const fileName = uuid===null?'Profiles/'+auth().currentUser.uid:'Contests/'+uuid
    storage().ref().child(fileName).put(file, metadata)
    .then(async (snapshot)=>{
      if (snapshot.state === 'success'){
        const fileURL = await snapshot.ref.getDownloadURL()
        if (callback !== null) {
          callback(fileURL+'?alt=media')
        } else {
          console.log(fileURL)
        }
      }
    })
    .catch(console.log)
  }
}

export const setUserData = (user, publicData=true) => {
  const visibility = publicData?collections.public:collections.private
  user.uid = auth().currentUser.uid
  auth().currentUser.updateProfile({
    displayName: user.displayName,
    email: user.email,
    photoURL: user.img,
  }).catch(console.log)
  return firestore().collection(collections.users).doc(auth().currentUser.uid)
  .collection(visibility).doc(collections.userData).set(user)
}

export const getUserData = async () => {
  let publicData = null
  let privateData = null
  try {
    publicData = await firestore().collection(collections.users).doc(auth().currentUser.uid).collection(collections.public).doc(collections.userData).get()
    privateData = await firestore().collection(collections.users).doc(auth().currentUser.uid).collection(collections.private).doc(collections.userData).get()
  } finally {
    if (publicData!==null && publicData.exists) 
      publicData = publicData.data()
    else
      publicData = {uid:'',displayName:'',description:'',img:'',email:''}
    if (privateData!==null && privateData.exists) 
      privateData = privateData.data() 
    else
      privateData = {uid:'',displayName:'',description:'',img:'',email:''}
    return {
      uid: publicData.uid!==''?publicData.uid:privateData.uid!==''?privateData.uid:'',
      displayName: publicData.displayName!==''?publicData.displayName:privateData.displayName!==''?privateData.displayName:'',
      description: publicData.description!==''?publicData.description:privateData.description!==''?privateData.description:'',
      img: publicData.img!==''?publicData.img:privateData.img!==''?privateData.img:'https://source.unsplash.com/random',
      email: publicData.email!==''?publicData.email:privateData.email!==''?privateData.email:'',
      visibility:{
        displayName: publicData.displayName!=='',
        description: publicData.description!=='',
        img: publicData.img!=='',
        email:publicData.email!=='',
      }
    }
  }
}

export const setUserVisibility = (visibility, value, valueName) => {
  const from = visibility? collections.public:collections.private
  const to =  !visibility? collections.public:collections.private
  const fromDoc = {};fromDoc[valueName] = value
  const toDoc = {};toDoc[valueName] = ''
  return Promise.all([
    firestore().collection(collections.users).doc(auth().currentUser.uid).collection(from).doc(collections.userData).update(fromDoc),
    firestore().collection(collections.users).doc(auth().currentUser.uid).collection(to).doc(collections.userData).update(toDoc)
  ])
}
