import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import ProfilePic from "../images/profileicon.png";
import { IconButton } from '@material-tailwind/react';
import { Add, ExitToApp, Home, Message, PeopleAlt, SearchOutlined } from '@mui/icons-material';
import SidebarTabCommunity from './SidebarTabCommunity';
import SidebarList from './SidebarList';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
  } from "@material-tailwind/react";

const tabs = [{
    id: 1,
    icon: <Home />,
},
{
    id: 2,
    icon: <Message />
},
{
    id: 3,
    icon: <PeopleAlt />
}
]
function SidebarCommunity({userData}) {
    const [menu, setMenu] = useState(1);
    const [roomName, setRoomName] = useState("");
    const data = [{
        id: 1,
        name: 'John Doe',
        photoUrl: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
    }]
   const [isCreatingRoom, setCreatingRoom] = useState(false)
  return (
    <div className='sidebar'>
        {/* Header */}
        <div className='sidebar__header'>
            <div className='sidebar__header--left'>
                <Avatar src={userData.image ? userData.image : ProfilePic}
                    alt="Profile" />
                    <h4>{userData?.initials} {userData?.name}</h4>
            </div>
            <div className='sidebar__header--right'>
                <IconButton className='bg-primary'>
                    <ExitToApp />
                </IconButton>
            </div>
        </div>
        {/* search */}
        <div className='sidebar__search'>
            <form className='sidebar__search--container'>
                <SearchOutlined />
                <input 
                type="text"
                id='search'
                placeholder='Search for users or rooms'
                 
                 />
            </form>

        </div>
        {/* tabs */}
        <div className='sidebar__menu'>
            {tabs.map(tab =>(
                <SidebarTabCommunity 
                key={tab.id}
                onClick={() => setMenu(tab.id)}
                isActive={menu === tab.id}
                >
                    <div className='sidebar__menu--home'>
                        {tab.icon}
                        <div className='sidebar__menu--line' />
                    </div>
                </SidebarTabCommunity>
            ))}
        </div>

        {menu === 1 ? (
            <SidebarList title="Chats" data={data} />
        ): menu === 2 ? (
            <SidebarList title="Messages" data={data} />
        ): menu === 3 ? (
            <SidebarList title="Group Class" data={data} />
        ) : menu === 4 ? (
            <SidebarList title="Lecture" data={data} />
        ) : null
        }
        {/* create room button */}
        <div className='sidebar__chat--addRoom'>
            <IconButton onClick={() => setCreatingRoom(true)} className='bg-primary'>
                <Add />
            </IconButton>
        </div>
        {/* Create room dialog */}
        <Dialog open={isCreatingRoom} handler={() => setCreatingRoom(false)}>
        <div className="flex items-center justify-between">
          <DialogHeader>Create Room</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody divider>
            {/* text */}
            <p className=' mb-2'>Type the name of your public room. Every user will able to join this room</p>

          <div className="grid gap-6">
            <Input 
            label="Room Name"
            placeholder="Enter room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            id='name'
             />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button onClick={() => setCreatingRoom(false)} variant="outlined" color="red">
            close
          </Button>
          <Button variant="gradient" color="green">
            Add room
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default SidebarCommunity
