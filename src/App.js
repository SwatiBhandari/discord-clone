import React, { useEffect } from 'react';
import './App.css';
import SideBar from './SideBar';
import Chat from './Chat'
import { useDispatch, useSelector } from 'react-redux';
import {login, selectUser} from './features/counter/userSlice'
import Login from './Login';
import { auth } from './firebase';
import {logout} from './features/counter/userSlice'

function App() {
  const dispatch=useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(
          login({
          uid:authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        }))
      }else{
        dispatch(logout());
      }
    });
  },[dispatch]);

  return (
    <div className="app">
      {user ? (
        <>
          <SideBar/>
          <Chat />
        </>
      ) : (
        <Login/>
      )}
    </div>
  );
}

export default App;
