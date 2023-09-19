import React, { useEffect, useState } from "react";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { CalendarMonth } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import UJLOGO from "../images/uj.png";
import GoodMorning from "../images/goodmorning.gif";
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
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/configFirebase";
function Sidebar() {
  const [openAlert, setOpenAlert] = React.useState(true);
  const [userData, setUserData] = useState([]);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  // Navigation Bar for students
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
      name: "Trello",
      icon: <BookmarkIcon />,
      path: "/trello",
    },
    {
      name: "Community",
      icon: <PeopleIcon />,
      path: "/community",
    },
    {
      name: "Chart",
      icon: <LeaderboardIcon />,
      path: "/chart",
    },
    {
      name: "Bookings",
      icon: <LibraryBooksIcon />,
      path: "/bookings",
    },
    // {
    //   name: "Trello",
    //   icon: <FormatListBulletedIcon />,
    //   path: "/trello",
    // }
  ];

  useEffect(() => {
    if (user) {
      const email = user.email;
      //console.log("Email:", email);
      const unsubscribe = onSnapshot(doc(db, "users", email), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          //console.log("Fetched data from Firestore:", data);
          setUserData(data);
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

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

  const date = new Date();
  const hour = date.getHours();
  let greeting = "";
  let image = "";
  let desciption = "";
  if (hour < 12) {
    greeting = "Good Morning";
    image = GoodMorning;
    desciption = "Hope you are having a great day! Keep up the good work!";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
    image = "https://media.giphy.com/media/fWOk3E9VjiM2IccBFr/giphy.gif";
  } else {
    greeting = "Good Evening";
    image = "https://media.giphy.com/media/1hMmAbOE57QaVgCgc1/giphy.gif";
  }
  return (
    <div>
      <Card className="fixed inset-0 z-50  h-[calc(100vh-2rem)] w-full max-w-[18rem] p-4 m-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-12 mx-auto flex items-center gap-4 p-4">
          <img src={UJLOGO} alt="UJ LOGO" className="h-24 w-24 " />
        </div>
        <List className="">
          {menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="text-xl">
              <ListItem className="p-4 hover:bg-primary hover:text-white ">
                <ListItemPrefix className="">{item.icon}</ListItemPrefix>
                {item.name}
              </ListItem>
            </NavLink>
          ))}
          <ListItem
            className="mt-10 p-4 hover:bg-primary hover:text-white "
            onClick={handleLogout}
          >
            <ListItemPrefix>
              <LogoutIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className="text-xl">Log Out</span>
          </ListItem>
        </List>
        <Alert
          open={openAlert}
          className="mt-auto "
          onClose={() => setOpenAlert(false)}
        >
          <img
            src={image}
            alt="Good Morning"
            className="mb-4 h-20 w-20 rounded-lg"
          />
          {/* <CubeTransparentIcon className="mb-4 h-12 w-12" /> */}
          <Typography variant="h6" className="mb-1">
            {greeting}, {userData.initials} {userData.name} !
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
  );
}

export default Sidebar;
