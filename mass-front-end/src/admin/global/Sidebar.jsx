import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Alert,
} from "@material-tailwind/react";
import { CubeTransparentIcon } from "@heroicons/react/24/solid";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import CampaignIcon from "@mui/icons-material/Campaign";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, useNavigate } from "react-router-dom";
import LogoUJ from "../images/uj.png";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css"
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/configFirebase";

function Sidebar() {
  const [openAlert, setOpenAlert] = React.useState(true);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  
  const menuItem = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      name: "Lecturer",
      icon: <AssignmentIndIcon />,
      path: "/lecturer",
    },

    {
      name: "Programmes",
      icon: <ViewModuleIcon />,
      path: "/programmes",
    },
    {
      name: "Announcements",
      icon: <CampaignIcon />,
      path: "/announcements",
    },
      // {
      //   name: "Timetables",
      //   icon: <EventRepeatIcon />,
      //   path: "/timetable",
      // },
    {
      name: "Settings",
      icon: <SettingsIcon />,
      path: "/settings",
    },
  ];

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logOut();
      if (user) {
        const userDocRef = doc(db, "users", user.email);
        console.log(userDocRef);
        await updateDoc(userDocRef, {
          timeOut: Timestamp.fromDate(new Date()),
        });
      }
      navigate("/");
      console.log("Logout");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="fixed inset-0 z-50  h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 m-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 mx-auto flex items-center gap-4 p-4">
        <img src={LogoUJ} alt="UJ LOGO" className="h-24 w-24 " />
      </div>
      <List className="">
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className=""
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
          Log Out
        </ListItem>
      </List>
      <Alert
        open={openAlert}
        className="mt-auto bg-primary"
        onClose={() => setOpenAlert(false)}
      >
        <CubeTransparentIcon className="mb-4 h-12 w-12" />
        <Typography variant="h6" className="mb-1">
          Welcome back, Nomusa!
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
  );
}

export default Sidebar;
