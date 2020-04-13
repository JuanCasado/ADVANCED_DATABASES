
import axios from 'axios'
import { auth } from './Firebase'

const functionsURL = 'https://us-central1-advancedfirebase-2e194.cloudfunctions.net/'
const isAdminURL = 'isAdmin'
const addAdminURL = 'addAdmin'
const removeAdminURL = 'removeAdmin'
const listUsersURL = 'listUsers'
const voteURL = 'vote'

const adminMSG = 'ADMIN'

const functions = axios.create({
  baseURL: functionsURL,
  timeout: 1000,
});

export const isAdmin = async () => {
  const idToken = await getToken()
  return functions.post(isAdminURL, {
    idToken: idToken,
  }).then((response)=>{
    return response.data === adminMSG
  }).catch(()=>{
    return false
  })
}

export const addAdmin = async (newAdmin) => {
  const idToken = await getToken()
  return functions.post(addAdminURL, {
    idToken: idToken,
    newAdminUid: newAdmin,
  }).then((response)=>{
    return response.data === adminMSG
  }).catch(()=>{
    return false
  })
}

export const removeAdmin = async (oldAdmin) => {
  const idToken = await getToken()
  return functions.post(removeAdminURL, {
    idToken: idToken,
    oldAdminUid: oldAdmin,
  }).then((response)=>{
    return response.data === adminMSG
  }).catch(()=>{
    return false
  })
}

export const listUsers = async () => {
  const idToken = await getToken()
  return functions.post(listUsersURL, {
    idToken: idToken,
  }).then((response)=>{
    return response.data.users
  }).catch(async ()=>{
    return await listUsers()
  })
}

export const getToken = async () => {
  return auth().currentUser.getIdToken(true)
}

export const vote = async (idToken, contestUuid, programUuid, votes) => {
  return functions.post(voteURL, {
    idToken: idToken, 
    contestUuid: contestUuid, 
    programUuid: programUuid, 
    votes: votes
  }).then((response)=>{
    return response.data === 'OK'
  }).catch(()=>{
    return false
  })
}
