import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import ProfilePic from "../images/profileicon.png";
import { IconButton } from '@material-tailwind/react';
import { Add, ExitToApp, Home, Message, PeopleAlt, SearchOutlined } from '@mui/icons-material';
import SidebarTabCommunity from './SidebarTabCommunity';

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
    const data = [{
        id: 1,
        name: 'John Doe',
        photoUrl: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
    }]
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
        {/* create room button */}
        <div className='sidebar__chat--addRoom'>
            <IconButton className='bg-primary'>
                <Add />
            </IconButton>
        </div>
    </div>
  )
}

export default SidebarCommunity
