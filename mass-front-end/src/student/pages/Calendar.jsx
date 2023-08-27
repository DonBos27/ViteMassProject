import React, { useEffect, useState } from "react";
import Sidebar from "../global/Sidebar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import NavbarStudent from "../global/NavbarStudent";
import { CalendarMonth } from "@mui/icons-material";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/configFirebase";
import { useAuth } from "../../context/AuthContext";
function Calendar({ handleProfile }) {
  const [event, setEvent] = useState([]);
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
