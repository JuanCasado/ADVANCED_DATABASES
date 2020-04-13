
import React from 'react';
import GoogleButton from './GoogleButton'
import { linkWithGoogle } from '../Firebase'

export default function LinkWithGoogle () {
  return <GoogleButton text={'Link with Google'} action={linkWithGoogle}/>
}