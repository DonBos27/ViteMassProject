import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlughin from "@fullcalendar/interaction";
import "./CalendarLecturer.css";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Dialog,
  DialogHeader,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useAuth } from "../../context/AuthContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase/configFirebase";
import { addDoc, serverTimestamp } from "firebase/firestore";

const radio = [
  { id: 1, value: "Assignment", color: "blue" },
  { id: 2, value: "Exam", color: "red" },
  { id: 3, value: "Test", color: "green" },
];

function CalendarPost() {
  const { user: authUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [lecturerId, setLecturerId] = useState("");
  const [scope, setScope] = useState("");

  const handleOpen = () => {
    setOpen((cur) => !cur);
    // console.log("Open Modal");
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "events", "eventsPosts"), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        console.log("Fetched data from Firestore:", data);
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

  const handleDateClick = (arg) => {
    const currentDate = new Date(arg.date); // Create a new Date object from the clicked date
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    const formattedDate = `${year}-${(month + 1)
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

    const selectedDateTime = new Date(formattedDate + "T00:00"); // Convert to Date object

    if (selectedDateTime < new Date()) {
      alert("You cannot post an event in the past!");
    } else {
      setSelectedStartDate(formattedDate + "T00:00"); // Set selected start date and time
      //   console.log("Selected Date:", formattedDate + "T00:00");
      setSelectedEndDate(formattedDate + "T00:00"); // Set selected end date and time
      handleOpen();
    }
  };

  const handleEventClick = (arg) => {
    const { id } = arg.event;
    const title = id.title;
    const { description, start, end, scope, type } =
      arg.event.extendedProps;
    console.log(title, description, start, end, scope, type);
    // const formattedStartDate = start.toISOString().replace("Z", "");
    // const formattedEndDate = end.toISOString().replace("Z", "");

    setTitle(title);
    console.log("Title:", title);
    setDescription(description);
    console.log("Description:", description);
    setScope(scope);
    console.log("Scope:", scope);
    setType(type);
    console.log("Type:", type);
    handleOpen();
  };

  const handleEventPost = async (eventObject) => {
    const lecturerID = authUser.email;
    // const eventsCollectionRef = collection(db, "events");

    try {
      const docRef = doc(db, "calendarPost", lecturerID);
      const eventsCollectionRef = doc(db, "events", "eventsPosts");
      const eventSnapshot = await getDoc(eventsCollectionRef);
      const existingDataEvent = eventSnapshot.data();
      const docSnapshot = await getDoc(docRef);
      const existingData = docSnapshot.data();

      if (!eventSnapshot.exists()) {
        await setDoc(eventsCollectionRef, {
          allLecturerPost: [eventObject],
        });
      } else {
        const updatedEventsPost = [
          ...existingDataEvent.allLecturerPost,
          eventObject,
        ];
        await setDoc(
          eventsCollectionRef,
          { allLecturerPost: updatedEventsPost },
          { merge: true }
        );
      }

      if (!docSnapshot.exists()) {
        await setDoc(docRef, {
          lecturerPost: [eventObject],
        });
      } else {
        const updatedLecturerPost = [...existingData.lecturerPost, eventObject];

        // Update the Firestore document with the new array of events
        await setDoc(
          docRef,
          { lecturerPost: updatedLecturerPost },
          { merge: true }
        );

        // Fetch the updated data after posting the event
        const updatedEventData = updatedLecturerPost.map((post) => ({
          ...post,
          start: post.start.toDate(),
          end: post.end.toDate(),
        }));

        setEvent(updatedEventData);
      }

      console.log("Event posted successfully!");
    } catch (error) {
      console.error("Error posting event:", error);
    }
  };

  const handlePost = async () => {
    const startTimestamp = Timestamp.fromDate(new Date(selectedStartDate)); // Convert to Timestamp
    const endTimestamp = Timestamp.fromDate(new Date(selectedEndDate)); // Convert to Timestamp
    // const lecturerID = authUser.email;

    const getColorForEventType = (eventType) => {
      switch (eventType) {
        case "Assignment":
          return "blue";
        case "Test":
          return "green";
        case "Exam":
          return "red";
        default:
          return "purple"; // Default color or fallback
      }
    };

    const eventObject = {
      // id: lecturerID,
      title: title,
      description: description,
      start: startTimestamp,
      end: endTimestamp,
      scope: scope,
      type: type,
      color: getColorForEventType(type),
    };

    const eventsCollectionRef = doc(db, "events", "eventsPosts");
    const eventSnapshot = await getDoc(eventsCollectionRef);
    const existingDataEvent = eventSnapshot.data();
    const existingEvents = existingDataEvent.allLecturerPost;
    const existingEventsType = existingEvents.filter(
      (event) => event.type === type
    );

    // Filter existing events of the same type and on the same day as the new event
    const existingEventsTypeDate = existingEventsType.filter(
      (event) =>
        event.start.toDate().toDateString() ===
        startTimestamp.toDate().toDateString()
    );

    // Filter existing events of the same type and starting 2 days before the new event
    const existingEventsTypeDateBefore = existingEventsType.filter(
      (event) =>
        event.start.toDate().toDateString() ===
          new Date(
            startTimestamp.toDate().getTime() - 1 * 24 * 60 * 60 * 1000
          ).toDateString() ||
        event.start.toDate().toDateString() ===
          new Date(
            startTimestamp.toDate().getTime() - 2 * 24 * 60 * 60 * 1000
          ).toDateString()
    );

    const existingEventsTypeDateAfter = existingEventsType.filter(
      (event) =>
        event.start.toDate().toDateString() ===
          new Date(
            startTimestamp.toDate().getTime() + 1 * 24 * 60 * 60 * 1000
          ).toDateString() ||
        event.start.toDate().toDateString() ===
          new Date(
            startTimestamp.toDate().getTime() + 2 * 24 * 60 * 60 * 1000
          ).toDateString()
    );

    if (type === "Test") {
      if (existingEventsTypeDate.length > 0) {
        alert("You cannot post a test on the same day as another test!");
      } else if (existingEventsTypeDateBefore.length > 0) {
        alert("You cannot post a test 2 days before another test!");
      } else if (existingEventsTypeDateAfter.length > 0) {
        alert("You cannot post a test 2 days after another test!");
      } else {
        alert("Test posted successfully!");
        await handleEventPost(eventObject);
      }
    } else {
      alert("Event posted successfully!");
      await handleEventPost(eventObject);
    }

    // await handleEventPost(eventObject);
    setTitle("");
    setDescription("");
    setScope("");
    setType("");
    setSelectedStartDate("");
    setSelectedEndDate("");

    handleOpen();
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlughin]}
        initialView="dayGridMonth"
        weekends={false}
        events={event}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        titleFormat={{ year: "numeric", month: "long", day: "numeric" }}
        height={"700px"}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        // dayCellContent={dateContent}
      />
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            // color="deep-orange"
            className="mb-4 grid h-28 place-items-center bg-primary"
          >
            <Typography variant="h3" color="white">
              Fill in the form
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
            />
            <Input
              type="text"
              placeholder="Scope"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
            />
            <Textarea
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
            />
            <Input
              type="datetime-local"
              label="Start Date and Time"
              value={selectedStartDate}
              onChange={(e) => setSelectedStartDate(e.target.value)}
              containerProps={{ className: "min-w-[100px]" }}
            />
            <Input
              type="datetime-local"
              label="End Date and Time"
              value={selectedEndDate}
              onChange={(e) => setSelectedEndDate(e.target.value)}
              containerProps={{ className: "min-w-[100px]" }}
            />
            <List className="flex-row w-full">
              {radio.map((item) => (
                <ListItem className="p-0" key={item.id}>
                  <label
                    htmlFor="horizontal-list-react"
                    className="flex w-full cursor-pointer items-center px-0 py-2"
                  >
                    <ListItemPrefix className="mr-3">
                      <Radio
                        name="horizontal-list"
                        id="horizontal-list-react"
                        ripple={false}
                        checked={type === item.value}
                        onChange={() => setType(item.value)}
                        value={item.value}
                        className="hover:before:opacity-0"
                        containerProps={{
                          className: "p-0",
                        }}
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-medium">
                      {item.value}
                    </Typography>
                  </label>
                </ListItem>
              ))}
            </List>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handlePost} fullWidth>
              Post
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
}

export default CalendarPost;
