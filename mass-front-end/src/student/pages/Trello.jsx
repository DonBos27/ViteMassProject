import React from 'react'
import Sidebar from '../global/Sidebar'
import NavbarStudent from '../global/NavbarStudent'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Avatar, Typography } from '@material-tailwind/react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ProfilePic from '../images/profileicon.png';
import AddIcon from '@mui/icons-material/Add';
import TrelloCards from '../components/TrelloCards';
function Trello({handleProfile}) {

    const users = [
        {
            name: "John",
        },
        {
            name: "John",
        },
        {
            name: "John",
        },
    ]
  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full mr-4 mb-4 mt-4 h-full">
        <NavbarStudent Icon={PeopleAltIcon} title={"Community"} handleProfile={handleProfile} />
        <div className='flex justify-between'>
        <div className="flex items-center">
          <Typography className="text-2xl font-bold text-black">Study Board</Typography>
            <KeyboardArrowDownIcon className="w-10 h-10 bg-white rounded-full ml-2 shadow-xl cursor-pointer " />
        </div>
        <div className='flex space-x-3'>

            {
                users.map((user) => (
                    
                <div key={user}>
                    <Avatar className='w-9 h-9' src={ProfilePic} alt='pic'/>
                </div>
                    
                ))
            }
            <button className='border border-dashed border-gray-900 flex items-center justify-center w-9 h-9 rounded-full'>
                <AddIcon className='w-5 h-5' />
            </button>
            
        </div>
      </div>
      <TrelloCards />
      </div>
    </div>
  )
}

export default Trello
