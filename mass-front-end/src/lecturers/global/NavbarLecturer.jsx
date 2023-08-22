import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import {
  BellIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

function NavbarLecturer({title}) {
  return (
    <div className="m-0 max-h-auto w-full">
      <Navbar className="top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-transparent border-transparent shadow-transparent">
        <div className="w-full flex items-center justify-between gap-y-4 text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 ml-2 cursor-pointer py-1.5"
          >
            {title}
          </Typography>
          <div className=" flex gap-1 md:mr-4">
            <IconButton variant="text" color="blue-gray">
              <Cog6ToothIcon className="h-6 w-6" />
            </IconButton>
            <IconButton variant="text" color="blue-gray">
              <BellIcon className="h-6 w-6" />
            </IconButton>
            <IconButton variant="text" color="blue-gray">
              <UserCircleIcon className="h-6 w-6" />
            </IconButton>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default NavbarLecturer;
