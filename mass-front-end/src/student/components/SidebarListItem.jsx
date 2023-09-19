import { Avatar } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

function SidebarListItem({item}) {
  return (
    <Link className='link' hrefLang={`/?roomId=${item.id}`}>
      <div className='sidebar__chat'>
        <div className='avatar__container'>
            <Avatar 
            src={item.photoURL || `https://avatars.dicebear.com/api/jdenticon/${item.id}.svg`}
            alt={item.name}
            style={{width: 45, height: 45}}
             />
        </div>
        <div className='sidebar__chat--info'>
            <h4>{item.name}</h4>
            <p>{item.lastMessage}</p>
            </div>
      </div>
    </Link>
  )
}

export default SidebarListItem
