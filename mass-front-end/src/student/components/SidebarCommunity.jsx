import { Avatar } from '@mui/material'
import React from 'react'
import ProfilePic from "../images/profileicon.png";
import { IconButton } from '@material-tailwind/react';
import { ExitToApp } from '@mui/icons-material';
function SidebarCommunity({userData}) {
  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <div className='sidebar__header--left'>
            <Avatar src={userData.image ? userData.image : ProfilePic}
                  alt="Profile" />
                  <h4>{userData?.initials} {userData?.name}</h4>
        </div>
        <div className='sidebar__header--right'>
            <IconButton>
                <ExitToApp />
            </IconButton>
        </div>
      </div>
    </div>
  )
}

export default SidebarCommunity
