import React from 'react'
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { CalendarMonth } from '@mui/icons-material';
import { useAuth } from "../../context/AuthContext";
import UJLOGO from "../images/uj.png"
import { NavLink, useNavigate } from "react-router-dom";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Alert,
  } from "@material-tailwind/react";
import { CubeTransparentIcon } from "@heroicons/react/24/solid";
function Sidebar() {
    const [openAlert, setOpenAlert] = React.useState(true);
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const menuItem = [
        {
            name: "Modules",
            icon: <HomeIcon />,
            path: "/modules",
    
        },
        {
            name: "Calendar",
            icon: <CalendarMonth />,
            path: "/calendar",
    
        },
        
    
        {
            name: "Chart",
            icon: <LeaderboardIcon />,
            path: "/chart"
        },
        {
            name: "Bookings",
            icon: <LibraryBooksIcon />,
            path: "/bookings",
        },
        
    
    ]
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
          await logOut();
          navigate("/");
          console.log("Logout");
        } catch (err) {
          console.log(err);
        }
      };
  return (
    <div>
        <Card className="fixed inset-0 z-50  h-[calc(100vh-2rem)] w-full max-w-[18rem] p-4 m-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 mx-auto flex items-center gap-4 p-4">
            <img src={UJLOGO} alt="UJ LOGO" className="h-24 w-24 " />
        </div>
        <List className="">
            {menuItem.map((item, index) => (
            <NavLink
                to={item.path}
                key={index}
                className="text-xl"
            >
                <ListItem className="p-4 hover:bg-primary hover:text-white ">
                <ListItemPrefix className="">{item.icon}</ListItemPrefix>
                {item.name}
                </ListItem>
            </NavLink>
            ))}
            <ListItem className="mt-10 p-4 hover:bg-primary hover:text-white " onClick={handleLogout}>
            <ListItemPrefix>
                <LogoutIcon className="h-5 w-5" />
            </ListItemPrefix>
                <span className='text-xl'>Log Out</span>
            </ListItem>
        </List>
        <Alert
            open={openAlert}
            className="mt-auto bg-primary"
            onClose={() => setOpenAlert(false)}
        >
            <CubeTransparentIcon className="mb-4 h-12 w-12" />
            <Typography variant="h6" className="mb-1">
            Welcome back, John!
            </Typography>
            <Typography variant="small" className="font-normal opacity-80">
            Hope you are having a great day! Keep up the good work!
            </Typography>
            <div className="mt-4 flex gap-3">
            <Typography
                as="a"
                href="#"
                variant="small"
                className="font-medium opacity-80"
                onClick={() => setOpenAlert(false)}
            >
                Dismiss
            </Typography>
            </div>
        </Alert>
    </Card>
    </div>
  )
}

export default Sidebar
