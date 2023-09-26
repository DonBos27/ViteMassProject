import React, { useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import useRoom from '../utils/useRoom';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { AddPhotoAlternate, MoreVert } from '@mui/icons-material';
import MediaPreview from './MediaPreview';
import ChatFooter from './ChatFooter';
function Chat({user}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [image, setImage] = useState(null)
    const [src, setSrc] = useState("")
  // Get the query parameter 'roomId' from the location object
    const roomId = new URLSearchParams(location.search).get("roomId");
    const userId = user.userId
    const room = useRoom(roomId, userId)
    console.log(src)
    function showPreview(event){
        const file = event.target.files[0]
        if(file){
            setImage(file)
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                setSrc(reader.result)
            } 
        }
    }
    function closePreview(){
        setImage(null)
        setSrc("")
    }
    //   If there is no room with that ID then redirect to home page
    if(!room) return null;
  return (
    <div className='chat'>
      <div className='chat__background'>
        {/* chat header */}
        <div className='chat__header'>
            <div className='avatar__container'>
                <Avatar src={room.photoUrl} alt={room.name} />
            </div>
            <div className='chat__header--info'>
                <h1 className='text-xl font-semibold'>{room.name}</h1>
            </div>
            <div className='chat__header--right'>
                <input 
                id='image'
                style={{display: 'none'}}
                accept='image/*'
                type="file"
                onChange={showPreview}
                />
                <IconButton >
                    <label className='flex justify-center items-center' style={{cursor: "pointer", height: 24}} htmlFor='image'>
                        <AddPhotoAlternate  />
                    </label>
                </IconButton>
                <IconButton >
                    <MoreVert  />
                </IconButton>
                <Menu id='menu' keepMounted open={false}>
                    <MenuItem>Delete menu</MenuItem>
                </Menu>
            </div>
        </div>
      </div>
      <MediaPreview src={src} closePreview={closePreview} />
      <ChatFooter />
    </div>
  )
}

export default Chat
