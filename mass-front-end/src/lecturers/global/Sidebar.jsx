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
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import SettingsIcon from "@mui/icons-material/Settings";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, useNavigate } from "react-router-dom";
import LogoUJ from "../images/uj.png";
import Logout from "../images/logout.png";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const [openAlert, setOpenAlert] = React.useState(true);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const menuItem = [
    {
      name: "Home",
      icon: <HomeIcon />,
      path: "/homelecturer",
    },
    {
      name: "Modules",
      icon: <ViewModuleIcon />,
      path: "/moduleslecturer",
    },

    {
      name: "Bookings",
      icon: <MeetingRoomIcon />,
      path: "/bookingslecturerfromstudent",
    },
    {
      name: "Settings",
      icon: <SettingsIcon />,
      path: "/settingslecturer",
    },
  ];

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
    <Card className="fixed inset-0 z-50  h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 m-4 shadow-xl shadow-blue-gray-900/5">
      <div className="my-auto mx-auto flex items-center gap-4 p-4">
        <img src={LogoUJ} alt="UJ LOGO" className="h-24 w-24 " />
      </div>
      <List className="my-auto ">
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="">
            <ListItem className="p-4 hover:bg-primary hover:text-white ">
              <ListItemPrefix className="">{item.icon}</ListItemPrefix>
              {item.name}
            </ListItem>
          </NavLink>
        ))}

        <ListItem
          className="mt-32 p-4 hover:bg-secondary hover:text-white "
          onClick={handleLogout}
        >
          <ListItemPrefix>
            <LogoutIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
        <div className=" gap-4 pt-2">
          <img src={Logout} alt="UJ LOGO" className="" />
        </div>
      </List>
      {/* <Alert
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
      </Alert> */}
    </Card>
  );
}

export default Sidebar;
