
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require("cors");
admin.initializeApp()

const userMSG = 'USER'
const adminMSG = 'ADMIN'
const notRegisteredMSG = 'NOT REGISTERED'
const isAdmin = 'isAdmin/'

const admins = [
  'jcb7777777@gmail.com',
]
const customClaims = {
  admin: true,
  groupId: 'admin',
}

async function getUser(idToken) {
  console.log(idToken)
  return admin.auth().verifyIdToken(idToken)
  .then((decodedToken) => {
    return decodedToken
  }).catch((error) => {
    console.log(error)
    return null
  })
}

async function wannaCall (request, response, call) {
  console.log({headers:request.headers,body:request.body})
  response.set('Access-Control-Allow-Origin', request.headers.origin)
  response.set('Access-Control-Allow-Credentials', 'true')
  getUser(request.body.idToken)
  .then((user)=>{
    if (user !== null) {
      if (admins.includes(user.email)){
        console.log({adminMSG,user})
        call(user)
      }else {
        response.send(userMSG)
        console.log({userMSG,user})
      }
    }else {
      response.status(401)
      response.send(notRegisteredMSG)
      console.log(notRegisteredMSG)
    }
    return
  }).catch((error) => {
    response.status(401)
    response.send(error)
    console.log(error)
  })
}

function updateAdmin (uid, value) {
  const updateRef = admin.database().ref(isAdmin + uid)
  updateRef.set(value)
}

exports.isAdmin = functions.https.onRequest((request, response) => {
  const corsFn = cors()
  corsFn(request, response, () => {wannaCall(request, response, (adminUser)=>{
    response.send(adminMSG)
  })})
})

exports.addAdmin = functions.https.onRequest((request, response) => {
  const corsFn = cors()
  const uid = request.body.newAdminUid
  corsFn(request, response, () => {wannaCall(request, response, (adminUser) => {
    admin.auth().setCustomUserClaims(uid, customClaims)
    .then(() => {
      updateAdmin(uid, true)
      response.send(adminMSG)
      return
    }).catch((error)=>{
      console.log(error)
      response.status(405)
      response.send(error)
    })
  })})
})

exports.removeAdmin = functions.https.onRequest((request, response) => {
  const corsFn = cors()
  const uid = request.body.oldAdminUid
  corsFn(request, response, () => {wannaCall(request, response, (adminUser)=>{
    admin.auth().setCustomUserClaims(uid, null)
    .then(() => {
      updateAdmin(uid, false)
      response.send(adminMSG)
      return
    }).catch((error)=>{
      console.log(error)
      response.status(405)
      response.send(error)
    })
  })})
})

exports.listUsers = functions.https.onRequest((request, response) => {
  const corsFn = cors()
  corsFn(request, response, () => {wannaCall(request, response, (adminUser)=>{
    admin.auth().listUsers(1000).then((userList)=>{
      response.send(userList)
      return
    }).catch((error)=>{
      console.log(error)
      response.status(405)
      response.send(error)
    })
  })})
})



exports.vote = functions.https.onRequest((request, response) => {
  const corsFn = cors()
  corsFn(request, response, () => {
    console.log({headers:request.headers,body:request.body})
    response.set('Access-Control-Allow-Origin', request.headers.origin)
    response.set('Access-Control-Allow-Credentials', 'true')
    getUser(request.body.idToken).then( async (user)=>{
      if (user !== null) {
        const contestRef = await admin.firestore().collection('Contests').doc(request.body.contestUuid).get()
        const programRef = await admin.firestore().collection('Contests').doc(request.body.contestUuid).collection('Programs').doc(request.body.programUuid).get()
        if (!programRef.exists || !contestRef.exists) {
          response.status(401)
          response.send('invalid data')
          return
        }
        const contestUserRef = await admin.firestore().collection('Contests').doc(request.body.contestUuid).collection('Users').doc(user.uid).get()
        if (!contestUserRef.exists) {
          await contestUserRef.ref.set({uid: user.uid, votesLeft: 50, points: 0})
        }
        const programUserRef = await contestUserRef.ref.collection(request.body.programUuid).get()
        if (programUserRef.exists) {
          response.status(401)
          response.send('already voted')
          return
        }
        let points = 0
        let single = 0
        let duet = 0
        let votesID = []
        let votesContestants = []
        for (let vote of request.body.votes) {
          const contestant =  programRef.data().contestants[Number(vote)]
          points += contestant.points
          votesContestants.push(contestant)
          if (contestant.type === 'single'){
            ++single
            votesID.push(contestant.uuid)
          }else{
            ++duet
            for (let innerContestant of contestant.contestants) {
              votesID.push(innerContestant.uuid)
            }
          }
        }
        if (single < 2 || duet < 1 || (single + duet) >= 5) {
          response.status(401)
          response.send('votes are not correct')
          return
        }
        contestUserRef.ref.update({votesLeft: admin.firestore.FieldValue.increment(-(single+duet)), points: admin.firestore.FieldValue.increment(points)})
        for (let vote of votesID) {
          contestRef.ref.collection('Contestants').doc(vote).update({votes: admin.firestore.FieldValue.increment(1)})
        }
        for (let vote of votesContestants) {
          contestUserRef.ref.collection(request.body.programUuid).add(vote)
        }
        response.send('OK')
        return
      } else {
        response.status(401)
        response.send(notRegisteredMSG)
        console.log(notRegisteredMSG)
      }
      return
    }).catch((error) => {
      response.status(401)
      response.send(error)
      console.log(error)
    })
  })
})
