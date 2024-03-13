import {React,useState,useEffect,useRef} from 'react'
import './ChatHeader.css'
import NotificationsIcon from "@mui/icons-material/Notifications"
import PushPinIcon from "@mui/icons-material/PushPin"
import SentimentVeryDissatisfied from "@mui/icons-material/SentimentVeryDissatisfied"
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import Inbox from "@mui/icons-material/Inbox"
import HelpRoundedIcon from "@mui/icons-material/HelpRounded"

function ChatHeader({channelName}) {

    const [showNotification, setShowNotification] = useState(false); // State for toggling dropdown visibility
    const [showPinned, setShowPinned] = useState(false);
    const [showInbox,setShowInbox] = useState(false);
    const notificationRef = useRef(null);
    const pinnedRef = useRef(null);
    const inboxRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotification(false); // Close bell options if clicked outside
            }

            if(pinnedRef.current && !pinnedRef.current.contains(event.target)){
                setShowPinned(false);
            }

            if(inboxRef.current && !inboxRef.current.contains(event.target)){
                setShowInbox(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [notificationRef]);


    const toggleNotifications = () => {
        setShowNotification(!showNotification); // Toggle dropdown visibility
    };

    const togglePinned = () => {
        setShowPinned(!showPinned); // Toggle dropdown visibility
    };

    const toggleInbox = () => {
        setShowInbox(!showInbox);
    };

    

  return (
    <div className='ChatHeader'>
        <div className='ChatHeader__left'>
            <h3>
                <span className='ChatHeader__hash'>#</span>
                {channelName}
            </h3>
        </div>
        <div className='ChatHeader__right'>
                <NotificationsIcon ref={notificationRef} onClick={toggleNotifications} className='ChatHeader__Logo'/>
                        {showNotification && (
                        <div className='bell_options'>
                            <p>Mute Channel</p>
                            <hr className="hr-custom"/>
                            <div className='bell_option_single'>
                                <label htmlFor="option1">All messages</label>
                                <input
                                    type="radio"
                                    id="option1"
                                    name="options"
                                    value="option1"
                                />
                            </div>
                            <div className='bell_option_single'>
                                <label htmlFor="option1">Only @mentions</label>
                                <input
                                    type="radio"
                                    id="option1"
                                    name="options"
                                    value="option1"
                                />
                            </div>
                            <div className='bell_option_single'>
                                <label htmlFor="option1">Nothing</label>
                                <input
                                    type="radio"
                                    id="option1"
                                    name="options"
                                    value="option1"
                                />
                            </div>
                        </div>
                    )}
                <PushPinIcon onClick={togglePinned} ref={pinnedRef} className='ChatHeader__Logo'/>
                {showPinned && (
                    <div className='Pinned'>
                        <div className='Pinned_1'>
                            <p>Pinned Messages</p>
                        </div>
                        <div className='Pinned_2'>
                            <SentimentVeryDissatisfied style={{ fontSize: 60 }} />
                            <p>This channel doesn't have any pinned messages... yet</p>
                        </div>
                        <div className='Pinned_3'>
                            <p className='pro'>Protip:</p>
                            <p>Users with 'Manage Messages' permission can pin a message from its context menu.</p>
                        </div>
                    </div>
                )}
                <Inbox onClick={toggleInbox} ref={inboxRef} className='ChatHeader__Logo'/>
                {showInbox && (
                    <div className='Inbox'>
                        <div className='Inbox_1'>
                            <Inbox/>
                            <p>Inbox</p>
                        </div>
                        <div className='Pinned_2'>
                            <SentimentVeryDissatisfied style={{ fontSize: 60 }} />
                            <p>No messages...</p>
                        </div>
                    </div>
                )}

                <div className='chatHeader__search'>
                    <input placeholder='Search'/>
                    <SearchRoundedIcon className='ChatHeader__Logo'/>
                </div>
                <PeopleAltRoundedIcon className='ChatHeader__Logo'/>
                <HelpRoundedIcon className='ChatHeader__Logo'/>
        </div>
        
      
    </div>
  )
}

export default ChatHeader
