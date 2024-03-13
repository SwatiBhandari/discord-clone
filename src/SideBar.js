import React, { useEffect, useState } from 'react';
import './SideBar.css';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SidebarChannel from './SidebarChannel';
import SingnalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CallIcon from "@mui/icons-material/Call";
import { Avatar } from '@mui/material';
import MicIcon from "@mui/icons-material/Mic";
import HeadsetIcon from "@mui/icons-material/Headphones";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector } from 'react-redux';
import { selectUser } from './features/counter/userSlice';
import { auth, db } from './firebase';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';

function SideBar() {
  const user = useSelector(selectUser);
  const [channelsFromFirestore, setChannelsFromFirestore] = useState([]);
  const [temporaryChannels, setTemporaryChannels] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'channels'), (snapshot) => {
      setChannelsFromFirestore(snapshot.docs.map((doc) => ({
        id: doc.id,
        channel: doc.data().channelName, // Assuming the channel name is stored under 'channelName' field
      })));
    });

    return () => unsubscribe();
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new Channel name");
    if (channelName) {
      // Add the new channel to the temporary channels array
      setTemporaryChannels(prevChannels => [...prevChannels, channelName]);
    }
  };

  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <h3>Swati's Grand Gala</h3>
        <ExpandMoreIcon />
      </div>
      <div className='sidebar__channels'>
        <div className='sidebar__channelsHeader'>
          <div className='sidebar__header'>
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          <AddIcon onClick={handleAddChannel} className='sidebar__addChannel' />
        </div>
        <div className='sidebar__channelsList'>
          {/* Display channels from Firestore */}
          {channelsFromFirestore.map(({ id, channel }) => (
            <SidebarChannel
              key={id}
              id={id}
              channelName={channel}
            />
          ))}
          {/* Display temporary channels */}
          {temporaryChannels.map((channel, index) => (
            <SidebarChannel
              key={`temp-${index}`}
              id={`temp-${index}`}
              channelName={channel}
            />
          ))}
        </div>
      </div>

      <div className='sidebar__voice'>
        <SingnalCellularAltIcon
          className='sidebar__voiceIcon'
          fontSize='large'
        />
        <div className='sidebar__voiceInfo'>
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className='sidebar__voiceIcons'>
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>

      <div className='sidebar__profile'>
        <Avatar onClick={() => auth.signOut()}
          src={user.photo} />
        <div className='sidebar__profileInfo'>
          <h3>{user.displayName}</h3>
          <p>{user.uid.substring(0, 5)}</p>
        </div>
        <div className='sidebar__profileIcons'>
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
