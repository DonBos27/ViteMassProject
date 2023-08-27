import { Breadcrumbs, Card, Typography } from "@material-tailwind/react";
import NavbarStudent from "../global/NavbarStudent";
import Sidebar from "../global/Sidebar";
import HomeIcon from "@mui/icons-material/Home";
import ModulesSstudent from "../components/ModulesSstudent";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  TimelineHeader,
} from "@material-tailwind/react";
import {
  BellIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/configFirebase";
import { useAuth } from "../../context/AuthContext";

function ModuleStudent({ handleProfile }) {
  const data = [
    {
      title: "Developement Software",
      date: "22 Dec 7:20PM",
      descrption: "Test will be based on LU1 to Lu4",
    },
    {
      title: "Business Analysis",
      date: "22 Dec 7:20PM",
      descrption: "Test will be based on LU1 to Lu4",
    },
    {
      title: "Software Engineering",
      date: "22 Dec 7:20PM",
      descrption: "Test will be based on LU1 to Lu4",
    },
  ];
  const [userData, setUserData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const email = user.email;
      console.log("Email:", email);
      const unsubscribe = onSnapshot(doc(db, "users", email), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          console.log("Fetched data from Firestore:", data);
          setUserData(data);
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);
  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full mr-4 mb-4 mt-4 h-full">
        <NavbarStudent
          Icon={HomeIcon}
          title={"Modules"}
          handleProfile={handleProfile}
        />
        {/* <div className="mt-4 rounded-lg">
          <h3 className="m-4 text-5xl text-black font-bold">
            Welcome to MASS {userData.initials} {userData.name}!
          </h3>
        </div> */}
        <Card className="w-full my-4 bg-transparent border-none shadow-none">
          <div className="p-8">
            <Typography variant="h3" color="black">
              Modules
            </Typography>
            {/* <Breadcrumbs className="bg-white">
              <span>current</span>
              <span>Modules</span>
            </Breadcrumbs> */}
          </div>
          <ModulesSstudent />
        </Card>
        {/* <Card className="w-full mt-4"></Card> */}
        <Card>
          <div className="w-full ml-4 mt-4">
            <div>
              <Typography variant="h3" color="black">
                Announcements
              </Typography>
            </div>
            <div>
              {data.map((item) => (
                <Timeline key={item}>
                  <TimelineItem className="h-28">
                    <TimelineConnector className="!w-[78px]" />
                    <TimelineHeader className="relative rounded-xl  py-3 pl-4 pr-8 ">
                      <TimelineIcon className="p-3" variant="ghost">
                        <BellIcon className="h-5 w-5" />
                      </TimelineIcon>
                      <div className="flex flex-col gap-1">
                        <Typography variant="h6" color="blue-gray">
                          {item.title}
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          {item.date}
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          {item.descrption}
                        </Typography>
                      </div>
                    </TimelineHeader>
                  </TimelineItem>
                </Timeline>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ModuleStudent;
