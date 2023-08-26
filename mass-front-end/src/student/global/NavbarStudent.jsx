import React from 'react'
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
  Breadcrumbs,
} from "@material-tailwind/react";
import {
  BellIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

function NavbarStudent({title, Icon, handleProfile}) {
  
  return (
    <div className="m-0 max-h-auto w-full">
        <Navbar className="top-0 z-10 h-[80px] max-w-full flex items-center rounded-lg bg-transparent shadow-transparent border-transparent">
        <div className="w-full flex items-center justify-between gap-y-4 text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="cursor-pointer py-1.5"
          >
            <div className='flex flex-col gap-3'>
            <Breadcrumbs className='bg-gray-300'>
      
              <Icon />
      
      
              <span>{title}</span>
      
                </Breadcrumbs>
                <div className=' text-2xl'>{title}</div>
            </div>
            
            
          </Typography>
          <div className=" flex gap-1 md:mr-4">
            <IconButton variant="text" color="blue-gray">
              <Cog6ToothIcon className="h-6 w-6" />
            </IconButton>
            <IconButton variant="text" color="blue-gray">
              <BellIcon className="h-6 w-6" />
            </IconButton>
            <IconButton variant="text" color="blue-gray" onClick={handleProfile}>
              <UserCircleIcon className="h-10 w-10" />
            </IconButton>
          </div>
        </div>
      </Navbar>
    </div>
  )
}

export default NavbarStudent
