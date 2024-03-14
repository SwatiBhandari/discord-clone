import React, { useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader'
import './Chat.css'
import AddCircleIcon from "@mui/icons-material/AddCircle"
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard"
import GifIcon from "@mui/icons-material/Gif"
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions"
import Message from './Message'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { selectChannelId, selectChannelName } from './features/counter/appSlice'
import { selectUser } from './features/counter/userSlice'
import { collection, query, orderBy, onSnapshot ,addDoc,serverTimestamp} from 'firebase/firestore';
import { db } from './firebase'
import EmojiPicker from 'emoji-picker-react';
import GifPicker from 'gif-picker-react';

function Chat() {
  const channelId= useSelector(selectChannelId);
  const channelName= useSelector(selectChannelName);
  const user = useSelector(selectUser);
  const [input,setInput]=useState("");
  const [messages , setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const [gifurl,setGifurl] =useState(null);
  const messagesEndRef = useRef(null);
  

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  useEffect(() => {
    if (channelId) {
      const q = query(
        collection(db, 'channels', channelId, 'messages'),
        orderBy('timestamp', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });

      return () => unsubscribe();
    }
  }, [channelId]);



  useEffect(() => {
    const handleClickOutside = (event) => {

      if (event.target.closest('.chat__inputIcons') === null) {
        setShowGifPicker(false);
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  


  const sendMessage = async (e) => {
    if (e) {
      e.preventDefault();
    }
    
    try {
      let messageContent = input;
    
      // If a GIF URL is provided, use it as the message content
      if (gifurl) {
        messageContent = gifurl;
      }
    
      const newMessage = {
        timestamp: serverTimestamp(),
        message: messageContent,
        user: user,
      };
      setMessages([...messages, newMessage]);
      setInput("");
      setGifurl(null);
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const handleGifSelection = (url) => {
    setGifurl(url);
  };


  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emoji) => {
    console.log(emoji);
    setInput(input + emoji.emoji); // Append selected emoji to the input field
  };

  const toggleGifPicker = () => {
    setShowGifPicker(!showGifPicker);
  };


  useEffect(() => {
    console.log("GIF URL After Setting:", gifurl);
    sendMessage();
  }, [gifurl]);


  return (
    <div className='chat'>
      <ChatHeader channelName={channelName}/>

      <div className='chat__messages'>
        {messages.map((message) => (
          <Message 
          timestamp={message.timestamp}
          message={message.message}
          user={message.user}/>
        ))}
        <div ref={messagesEndRef} className='extra'></div>
      </div>

      <div className='chat__input'>
        <AddCircleIcon fontSize='large'/>
        <form>
          <input 
          value={input} 
          disabled={!channelId}
          onChange={e => setInput(e.target.value)} 
          placeholder={`Message #${channelName}`}/>
          <button 
          disabled={!channelId}
          className='chat__inputButton' 
          type='submit'
          onClick={sendMessage}>Send Message</button>
        </form>

        <div className='chat__inputIcons'>
          <CardGiftcardIcon className='inputIcons' fontSize='large'/>
          <GifIcon 
          className='inputIcons' 
          fontSize='large'
          onClick={toggleGifPicker}/>

          <EmojiEmotionsIcon
            className="inputIcons"
            fontSize="large"
            onClick={toggleEmojiPicker}
          />
          {showEmojiPicker && 
            <div ref={emojiPickerRef} style={{ position: 'absolute', bottom: '50px', right: '10px' }}>
              <EmojiPicker onEmojiClick={handleEmojiSelect} />
            </div>
          }
          {showGifPicker && (
            <div style={{ position: 'absolute', bottom: '50px', right: '10px' }}>
              {/* Insert GifPicker component here */}
              <GifPicker
                tenorApiKey='AIzaSyBUdAvmGJPUpsW9hn10opsuMhtcCZ05TD4'
                onGifClick={(gif) => {
                console.log("GIF Selected:", gif.url);
                handleGifSelection(gif.url); // Set the GIF URL as the input
                setShowGifPicker(false); // Hide the GIF picker after selecting a GIF
              }} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Chat
