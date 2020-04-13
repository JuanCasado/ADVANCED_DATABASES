
import React from 'react';
import GoogleButton from './GoogleButton'
import { logInWithGoogle } from '../Firebase'

export default function LogInWithGoogle () {
  return <GoogleButton text={'Log In with Google'} action={logInWithGoogle}/>
}