import React from 'react'
import './Login.css'
import { Button } from '@mui/material'
import logo from './img/discord_logo.svg'
import {auth,provider} from './firebase'
import {signInWithPopup} from 'firebase/auth'

function Login() {

  const signIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        alert("Successfully signed in! Pick a channel or create one.");
        // Handle further actions after successful login if needed
    })
    .catch(error => alert(error.message));
}

  return (
    <div className='login'>
      <div className='login__logo'>
        <img src={logo} alt=''/>
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  )
}

export default Login
