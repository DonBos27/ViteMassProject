import React, { useEffect, useState } from "react";
import Sidebar from "../global/Sidebar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import NavbarStudent from "../global/NavbarStudent";
import { CalendarMonth } from "@mui/icons-material";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/configFirebase";
import { useAuth } from "../../context/AuthContext";
import {
  Card,
  CardBody,
  CardHeader,
  Dialog,
  Typography,
} from "@material-tailwind/react";
function Calendar({ handleProfile }) {
  const [event, setEvent] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scope, setScope] = useState("");
  const [type, setType] = useState("");
  const [lecturerName, setLecturerName] = useState("");
  const [lecturerEmail, setLecturerEmail] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [open, setOpen] = useState(false);
  const { user: authUser } = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "events", "eventsPosts"), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        // console.log("Fetched data from Firestore:", data);
        const posts = data.allLecturerPost.map((post) => ({
          ...post,
          start: post.start.toDate(), // Convert Firestore Timestamp to JavaScript Date
          end: post.end.toDate(), // Convert Firestore Timestamp to JavaScript Date
        }));

        console.log("Post from all lecturer:", posts);
        setEvent(posts);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleOpen = () => {
    setOpen((cur) => !cur);
    // console.log("Open Modal");
  };

  const handleEventClick = (arg) => {
    const { lecturerEmail } = arg.event.extendedProps;
    // console.log(lecturerEmail);
    const lecturerID = authUser.email;
    // console.log(lecturerID);

    const title = arg.event.title;
    const { uid, description, start, end, scope, type, lecturerName } =
      arg.event.extendedProps;

    console.log(title, description, scope, type, lecturerName);

    const startDate = new Date(arg.event.start);
    const endDate = new Date(arg.event.end);
    console.log(startDate, endDate);

    const year = startDate.getFullYear();
    const month = startDate.getMonth();
    const day = startDate.getDate();
    const hours = startDate.getHours();
    const minutes = startDate.getMinutes();

    const yearEnd = endDate.getFullYear();
    const monthEnd = endDate.getMonth();
    const dayEnd = endDate.getDate();
    const hoursEnd = endDate.getHours();
    const minutesEnd = endDate.getMinutes();

    const formattedDateEnd = `${yearEnd}-${(monthEnd + 1)
      .toString()
      .padStart(2, "0")}-${dayEnd.toString().padStart(2, "0")}T${hoursEnd
      .toString()
      .padStart(2, "0")}:${minutesEnd.toString().padStart(2, "0")}`;

    const formattedDate = `${year}-${(month + 1)
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}T${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    console.log(formattedDate);
    console.log(formattedDateEnd);

    setTitle(title);
    // console.log("Title:", title);
    setDescription(description);
    // console.log("Description:", description);
    setScope(scope);
    // console.log("Scope:", scope);
    setType(type);
    setSelectedStartDate(formattedDate);
    setSelectedEndDate(formattedDateEnd);
    setLecturerName(lecturerName);

    handleOpen();
  };

  const eventContent = (arg) => {
    const title = arg.event.title;
    const { description, start, end, scope, type, lecturerName } =
      arg.event.extendedProps;
    const styles = {
      padding: "3px",
      borderRadius: "5px",
      cursor: "pointer",
      backgroundColor: arg.event.backgroundColor,
      color: "white",
    };
    return (
      <div style={styles} className="text-center w-full">
        <i>
          <span className="font-bold text-lg">{lecturerName}</span> <br />{" "}
          <b>{truncate(title, 25)}</b>
        </i>
        <p className="w-full p-2">{truncate(description, 15)}</p>
      </div>
    );
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  return (
    <div className="flex h-screen">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full mr-4 mb-4 mt-4 h-full">
        <NavbarStudent
          Icon={CalendarMonth}
          title={"Calendar"}
          handleProfile={handleProfile}
        />
        <div className="bg-white mt-4 rounded-lg">
          <div className="flex flex-1">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              weekends={false}
              events={event}
              height="800px"
              eventContent={eventContent}
              eventClick={handleEventClick}
            />
          </div>
        </div>
        <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardHeader
              variant="gradient"
              className="mb-4 grid h-28 place-items-center bg-primary"
            >
              <Typography variant="h3" color="white">
                {title}
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h6" color="gray">
                Description: {description}
              </Typography>
              <Typography variant="h6" color="gray">
                Scope: {scope}
              </Typography>
              <Typography variant="h6" color="gray">
                Type of assessment: {type}
              </Typography>
              <Typography variant="h6" color="gray">
                Lecturer Name : {lecturerName}
              </Typography>
              <Typography variant="h6" color="gray">
                From: {selectedStartDate}
              </Typography>
              <Typography variant="h6" color="gray">
                To: {selectedEndDate}
              </Typography>
            </CardBody>
          </Card>
        </Dialog>
      </div>
    </div>
  );
}

export default Calendar;
