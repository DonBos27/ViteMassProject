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
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  Textarea,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { useAuth } from "../../context/AuthContext";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase/configFirebase";
import { v4 as uuidv4 } from "uuid";
import WarningIcon from "@mui/icons-material/Warning";
import UJ from "../images/uj.png";

const radio = [
  { id: 1, value: "Assignment", color: "blue" },
  { id: 2, value: "Labs/Exercises", color: "green" },
  { id: 3, value: "Test", color: "red" },
];

function CalendarPost() {
  const { user: authUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [event, setEvent] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedUpdateStartDate, setSelectedUpdateStartDate] = useState("");
  const [selectedUpdateEndDate, setSelectedUpdateEndDate] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [scope, setScope] = useState("");
  const [titleUpdate, setTitleUpdate] = useState("");
  const [descriptionUpdate, setDescriptionUpdate] = useState("");
  const [typeUpdate, setTypeUpdate] = useState("");
  const [scopeUpdate, setScopeUpdate] = useState("");
  const [markweight, setMarkweight] = useState("");
  const [markweightUpdate, setMarkweightUpdate] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [dateBefore, setDateBefore] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [minorError, setMinorError] = useState(false);
  const [minorErrorText, setMinorErrorText] = useState("");

  const handleOpen = () => {
    setOpen((cur) => !cur);
    setMinorError(false);
    setErrorAlert(false);
    // console.log("Open Modal");
  };

  const handleUpdateModal = () => {
    setOpenUpdateModal((cur) => !cur);
    setMinorError(false);
    setErrorAlert(false);
    // console.log("Open Modal");
  };

  const preventErrors = () => {
    setErrorModal((cur) => !cur);
  };
  const handleDateBefore = () => {
    setDateBefore((cur) => !cur);
  };

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

        // console.log("Post from all lecturer:", posts);
        setEvent(posts);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "modules"), (snapshot) => {
      const courses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Courses:", courses);
      setModulesData(courses);
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

    // console.log("formattedDate:", formattedDate);

    const selectedDateTime = new Date(formattedDate + "T00:00"); // Convert to Date object

    // console.log("selectedDateTime:", selectedDateTime)

    if (selectedDateTime < new Date()) {
      // alert("You cannot post an event in the past!");
      handleDateBefore();
    } else {
      setTitle("");
      setDescription("");
      setScope("");
      setType("");
      setSelectedStartDate(formattedDate + "T00:00"); // Set selected start date and time
      setSelectedEndDate(formattedDate + "T23:59"); // Set selected end date and time
      setMarkweight("");
      setErrorAlert(false);

      console.log("Selected Date start ", formattedDate + "T00:00");
      handleOpen();
    }
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const handleEventClick = (arg) => {
    const { lecturerEmail } = arg.event.extendedProps;
    // console.log(lecturerEmail);
    const lecturerID = authUser.email;
    // console.log(lecturerID);

    if (lecturerID === lecturerEmail) {
      const title = arg.event.title;
      const { uid, description, start, end, scope, type } =
        arg.event.extendedProps;
      console.log(uid);

      // console.log(title, description, start, end, scope, type);

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
      setTitleUpdate(title);
      // console.log("Title:", title);
      setDescriptionUpdate(description);
      // console.log("Description:", description);
      setScopeUpdate(scope);
      // console.log("Scope:", scope);
      setTypeUpdate(type);
      setId(uid);
      setSelectedUpdateStartDate(formattedDate);
      setSelectedUpdateEndDate(formattedDateEnd);
      handleUpdateModal();
    } else {
      // alert("You cannot edit other lecturer's post!");
      // preventErrors();
      setErrorModal(true);
    }
  };

  const eventContent = (arg) => {
    const { lecturerEmail } = arg.event.extendedProps;
    // console.log(lecturerEmail);
    const lecturerID = authUser.email;
    // console.log(lecturerID);
    const title = arg.event.title;
    const { description, start, end, scope, type, lecturerName } =
      arg.event.extendedProps;
    if (lecturerID === lecturerEmail) {
      const styles = {
        padding: "5px",
        borderRadius: "5px",
        cursor: "pointer",
        backgroundColor: arg.event.backgroundColor,
        color: "white",
      };
      return (
        <div style={styles} className="text-center w-full">
          <i>
            {lecturerName} <br /> <b>{truncate(title, 25)}</b>
          </i>
          <p className="w-full">{truncate(description, 15)}</p>
        </div>
      );
    } else {
      const styles = {
        padding: "5px",
        borderRadius: "5px",
        cursor: "not-allowed",
        backgroundColor: "gray",
        color: "white",
      };
      return (
        <div style={styles} className="text-center w-full">
          <i>
            {lecturerName} <br /> <b>{truncate(title, 25)}</b>
          </i>
          {/* <p className="w-full">{truncate(description, 15)}</p> */}
        </div>
      );
    }
  };

  const handleEventPost = async (eventObject) => {
    const lecturerID = authUser.email;
    // const id = uuidv4();
    try {
      // Fetch lecturer's name and email from the users collection
      const usersCollectionRef = doc(db, "users", lecturerID);
      const userSnapshot = await getDoc(usersCollectionRef);

      const userData = userSnapshot.data();
      console.log("userData:", userData);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const lecturerName = userData.name;
        const lecturerEmail = lecturerID;
        const modules = userData.modules;
        const moduleCode = modules.map((item) => item.moduleCode);
        // const eventID = id;

        // Add lecturer's name and email to the eventObject
        const updatedEventObject = {
          ...eventObject,
          lecturerName: lecturerName,
          lecturerEmail: lecturerEmail,
          moduleCode: moduleCode,
          // id: eventID,
        };

        // Add the updated eventObject to the events collection
        const eventsCollectionRef = doc(db, "events", "eventsPosts");
        const eventSnapshot = await getDoc(eventsCollectionRef);
        const existingDataEvent = eventSnapshot.data();
        const updatedGlobalEvents = [
          ...existingDataEvent.allLecturerPost,
          updatedEventObject,
        ];
        await setDoc(eventsCollectionRef, {
          allLecturerPost: updatedGlobalEvents,
        });

        // Update the lecturer's events array
        const lecturerDocRef = doc(db, "calendarPost", lecturerID);
        const lecturerDocSnapshot = await getDoc(lecturerDocRef);

        if (lecturerDocSnapshot.exists()) {
          const existingLecturerData = lecturerDocSnapshot.data();
          const updatedLecturerEvents = [
            ...existingLecturerData.lecturerPost,
            updatedEventObject,
          ];
          await setDoc(
            lecturerDocRef,
            { lecturerPost: updatedLecturerEvents },
            { merge: true }
          );
        } else {
          // If lecturer document doesn't exist, create it
          await setDoc(lecturerDocRef, {
            lecturerName: lecturerName,
            email: lecturerID,
            moduleCode: moduleCode,
            lecturerPost: [updatedEventObject],
          });
        }

        // Update the state with the new event data
        const updatedEventData = [
          ...event,
          {
            ...updatedEventObject,
            start: eventObject.start.toDate(),
            end: eventObject.end.toDate(),
          },
        ];
        setEvent(updatedEventData);

        console.log("Event posted successfully!");
      } else {
        console.error("User data not found.");
      }
    } catch (error) {
      console.error("Error posting event:", error);
    }
  };

  const handleEventUpdate = async (eventObject) => {
    const lecturerID = authUser.email;
    // const eventID = eventObject.uid;
    // console.log("eventID:", eventID);
    try {
      // Update the event in the events collection
      const eventsCollectionRef = doc(db, "events", "eventsPosts");
      const eventSnapshot = await getDoc(eventsCollectionRef);
      const existingDataEvent = eventSnapshot.data();
      const existingEvents = existingDataEvent.allLecturerPost;
      console.log("existingEvents:", existingEvents);
      const updatedEvents = existingEvents.map((event) =>
        event.uid === eventObject.uid ? eventObject : event
      );

      await setDoc(eventsCollectionRef, { allLecturerPost: updatedEvents });

      // Update the event in the user's calendarPost collection
      const userEventDocRef = doc(db, "calendarPost", lecturerID);
      const userEventSnapshot = await getDoc(userEventDocRef);
      const existingUserEvents = userEventSnapshot.data().lecturerPost;
      const updatedUserEvents = existingUserEvents.map((event) =>
        event.uid === eventObject.uid ? eventObject : event
      );

      await setDoc(userEventDocRef, { lecturerPost: updatedUserEvents });

      console.log("Event updated successfully!");
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handlePost = async (arg) => {
    const startTimestamp = Timestamp.fromDate(new Date(selectedStartDate)); // Convert to Timestamp
    const endTimestamp = Timestamp.fromDate(new Date(selectedEndDate)); // Convert to Timestamp
    const lecturerID = authUser.email;
    const today = new Date();

    if (!type) {
      setErrorAlert(true);
      // handleOpen();
      return;
      // preventErrors();
    }

    if (startTimestamp.toDate() < today) {
      setMinorError(true);
      setMinorErrorText(
        "You cannot post an event in the past! Check the start date."
      );
      return;
    }

    if (endTimestamp.toDate() < today) {
      setMinorError(true);
      setMinorErrorText(
        "You cannot post an event in the past! Check the end date."
      );
      return;
    }

    if (endTimestamp.toDate() < startTimestamp.toDate()) {
      setMinorError(true);
      setMinorErrorText(
        "You cannot post an event with end date before start date!"
      );
      return;
    }

    // check regex for mark weight input field to only allow numbers and decimals
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (!regex.test(markweight)) {
      setMinorError(true);
      setMinorErrorText(
        "Mark weight must be a number between 1 and 99 and cannot be empty or null!"
      );
      return;
    }

    if (markweight > 100 || markweight < 0 || markweight === "") {
      setMinorError(true);
      setMinorErrorText(
        "You cannot post an event with mark weight more than 99% or less than 0%  or null!"
      );
      return;
    }

    const getColorForEventType = (eventType) => {
      switch (eventType) {
        case "Assignment":
          return "lightblue";
        case "Test":
          return "red";
        case "Labs/Exercises":
          return "green";
        default:
          return "";
      }
    };

    // setId(uuidv4())

    const eventObject = {
      uid: uuidv4(),
      title: title,
      weight: markweight,
      description: description,
      start: startTimestamp,
      end: endTimestamp,
      scope: scope,
      type: type,
      color: getColorForEventType(type),
    };

    // retrieve student emails from the database
    const studentsCollectionRef = collection(db, "users");
    const studentsSnapshot = await getDocs(studentsCollectionRef);
    const studentsData = studentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const studentsEmail = studentsData.map((student) => student.email);
    console.log("studentsEmail:", studentsEmail);

    // check if student email finished with @student and add to array if true and send email to students in the array 
    const studentEmail = studentsEmail.filter((email) => { 
      if (email && email.endsWith("@student.uj.ac.za")) {
        return email;
      }
    });
    console.log("studentEmail:", studentEmail);

    // Email notificaion to students
    try {
      const docRef = await addDoc(collection(db, "mail"), {
        to: studentEmail,
        message: {
          subject: `${type} Notifications`,
          html: `
          <div style="background-color: #f2f2f2; padding: 5px; height: 100%">
            <div style="padding:30px; background-color: #ffffff">
              <div style="height: 100%; padding-right: 10%; padding-left: 20%;">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/af/University_of_Johannesburg_Logo.svg/1200px-University_of_Johannesburg_Logo.svg.png" alt="University Logo" style="max-width: 50px; max-height: 50px; padding-right: 0%; padding-left: 30%;" /> <br/>
                <h2 style="color: #333; font-size: 25px" className:"text-red-700" >Mass Notification</h2>
              </div>
              <p style=" padding-right: 0%; padding-left: 0%;">A new ${type} has been posted on the calendar by ${lecturerID}.</p>
              <p style=" padding-right: 0%; padding-left: 0%;">Please check the calendar for more details.</p>
            </div>
          </div> 
          <div>
            <p style="color: #888; font-size: 10px">This email was sent to you by MASS. Please do not reply to this email.</p>
          </div>
        `,
        },
      });
      console.log("Document written with ID: ", docRef.id);
      console.log("Email sent successfully!: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setId(eventObject.uid);

    console.log(eventObject.uid);
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
        setMinorError(true);
        setMinorErrorText(
          "You cannot post a test on the same day as another test!"
        );
        // alert("You cannot post a test on the same day as another test!");
      } else if (existingEventsTypeDateBefore.length > 0) {
        setMinorError(true);
        setMinorErrorText("You cannot post a test 2 days before another test!");
        // alert("You cannot post a test 2 days before another test!");
      } else if (existingEventsTypeDateAfter.length > 0) {
        setMinorError(true);
        setMinorErrorText("You cannot post a test 2 days after another test!");
        // alert("You cannot post a test 2 days after another test!");
      } else {
        // alert("Test posted successfully!");
        // await handleEventPost(eventObject);
        handleOpen();
      }
    } else {
      // alert("Event posted successfully!");
      // await handleEventPost(eventObject);
      handleOpen();
    }

    // await handleEventPost(eventObject);
    setTitle("");
    setDescription("");
    setScope("");
    setType("");
    setSelectedStartDate("");
    setSelectedEndDate("");
    setMarkweight("");
    setErrorAlert(false);
    // handleOpen();
  };
  const handleUpdate = async (arg) => {
    const startTimestamp = Timestamp.fromDate(
      new Date(selectedUpdateStartDate)
    ); // Convert to Timestamp
    const endTimestamp = Timestamp.fromDate(new Date(selectedUpdateEndDate)); // Convert to Timestamp
    const lecturerID = authUser.email;
    const usersCollectionRef = doc(db, "users", lecturerID);
    const userSnapshot = await getDoc(usersCollectionRef);

    const userData = userSnapshot.data();
    console.log("userData:", userData);

    const lecturerName = userData.name;
    const lecturerEmail = lecturerID;

    const today = new Date();

    if (startTimestamp.toDate() < today) {
      setMinorError(true);
      setMinorErrorText(
        "You cannot post an event in the past! Check the start date."
      );
      return;
    }

    if (endTimestamp.toDate() < today) {
      setMinorError(true);
      setMinorErrorText(
        "You cannot post an event in the past! Check the end date."
      );
      return;
    }

    if (endTimestamp.toDate() < startTimestamp.toDate()) {
      setMinorError(true);
      setMinorErrorText(
        "You cannot post an event with end date before start date!"
      );
      return;
    }

    const regex = /^[0-9]*\.?[0-9]*$/;
    if (!regex.test(markweightUpdate)) {
      setMinorError(true);
      setMinorErrorText(
        "Mark weight must be a number between 1 and 99 and cannot be empty or null!"
      );
      return;
    }

    if (
      markweightUpdate > 100 ||
      markweightUpdate < 0 ||
      markweightUpdate === ""
    ) {
      setMinorError(true);
      setMinorErrorText(
        "You cannot post an event with mark weight more than 99% or less than 0% or null!"
      );
      return;
    }

    const getColorForEventType = (eventType) => {
      switch (eventType) {
        case "Assignment":
          return "lightblue";
        case "Test":
          return "red";
        case "Labs/Exercises":
          return "green";
        default:
          return "purple";
      }
    };

    const eventObject = {
      uid: id,
      title: titleUpdate,
      weight: markweightUpdate,
      description: descriptionUpdate,
      start: startTimestamp,
      end: endTimestamp,
      scope: scopeUpdate,
      type: typeUpdate,
      color: getColorForEventType(typeUpdate),
      lecturerEmail: lecturerEmail,
      lecturerName: lecturerName,
    };

    const eventsCollectionRef = doc(db, "events", "eventsPosts");
    const eventSnapshot = await getDoc(eventsCollectionRef);
    const existingDataEvent = eventSnapshot.data();
    const existingEvents = existingDataEvent.allLecturerPost;
    const existingEventsType = existingEvents.filter(
      (event) => event.type === typeUpdate
    );

    console.log(id);

    // check if the id is the same as the event id in the database
    const existingEventsId = existingEvents.filter((event) => event.uid);

    console.log(existingEventsId);

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

    if (typeUpdate === "Test") {
      if (existingEventsTypeDate.length > 0) {
        setMinorError(true);
        setMinorErrorText(
          "You cannot post a test on the same day as another test!"
        );
        // alert("You cannot post a test on the same day as another test!");
        preventErrors();
      } else if (existingEventsTypeDateBefore.length > 0) {
        setMinorError(true);
        setMinorErrorText("You cannot post a test 2 days before another test!");
        // alert("You cannot post a test 2 days before another test!");
        // preventErrors();
      } else if (existingEventsTypeDateAfter.length > 0) {
        setMinorError(true);
        setMinorErrorText("You cannot post a test 2 days after another test!");
        // alert("You cannot post a test 2 days after another test!");
        // preventErrors();
      } else {
        // alert("Test posted successfully!");
        await handleEventUpdate(eventObject);
      }
    } else {
      // alert("Event posted successfully!");
      await handleEventUpdate(eventObject);
    }

    // await handleEventUpdate(eventObject);

    // console.log(handleEventUpdate(eventObject));
    setTitleUpdate("");
    setDescriptionUpdate("");
    setScopeUpdate("");
    setTypeUpdate("");
    setSelectedUpdateStartDate("");
    setSelectedUpdateEndDate("");
    setMarkweightUpdate("");
    handleUpdateModal();
  };
  const handleDelete = async (arg) => {
    const lecturerID = authUser.email;
    const eventsCollectionRef = doc(db, "events", "eventsPosts");
    const eventSnapshot = await getDoc(eventsCollectionRef);
    const existingDataEvent = eventSnapshot.data();
    const existingEvents = existingDataEvent.allLecturerPost;
    const existingEventsType = existingEvents.filter(
      (event) => event.uid !== id
    );

    await setDoc(eventsCollectionRef, { allLecturerPost: existingEventsType });

    const userEventDocRef = doc(db, "calendarPost", lecturerID);
    const userEventSnapshot = await getDoc(userEventDocRef);
    const existingUserEvents = userEventSnapshot.data().lecturerPost;
    const existingUserEventsType = existingUserEvents.filter(
      (event) => event.uid !== id
    );

    await setDoc(userEventDocRef, { lecturerPost: existingUserEventsType });

    console.log("Event deleted successfully!");
    setTitleUpdate("");
    setDescriptionUpdate("");
    setScopeUpdate("");
    setTypeUpdate("");
    setSelectedUpdateStartDate("");
    setSelectedUpdateEndDate("");
    setMarkweightUpdate("");
    handleUpdateModal();
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
        eventContent={eventContent}
      />

      {/* // error when clicking on days beforer */}

      <Dialog
        open={dateBefore}
        handler={handleDateBefore}
        size="xs"
        color="red"
      >
        <DialogHeader>
          <Typography className="text-xl font-bold">
            <WarningIcon className="text-red-700 mr-2" />
            Error Message!
          </Typography>
        </DialogHeader>
        <DialogBody divider>
          <Typography color="black">
            You cannot post an event in the past
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            // color="red"
            buttonType="link"
            onClick={handleDateBefore}
            // ripple={true}
            className="bg-red-700"
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>

      {/* // error message when click on events not selected  */}
      <Dialog open={errorModal} size="xs" handler={preventErrors} color="red">
        <DialogHeader>
          <Typography color="blue-gray" className="text-xl font-bold">
            <WarningIcon className="text-red-500 mr-2" />
            Error Message !
          </Typography>
        </DialogHeader>
        <DialogBody divider>
          <Typography color="blue-gray">
            You cannot edit other lecturer's post!
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            color="red"
            buttonType="link"
            onClick={preventErrors}
            // ripple="dark"
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>

      {/* // Update Modal for Lecturer Post when click on the date in calendar  */}
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
              maxLength="2"
              placeholder="Weight in %"
              icon={<p>%</p>}
              value={markweight}
              onChange={(e) => setMarkweight(e.target.value)}
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
            {errorAlert && (
              <Alert
                color="red"
                className=""
                icon={<WarningIcon className="text-white mr-2" />}
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 100 },
                }}
                onClose={() => setErrorAlert(false)}
              >
                Please select the assessment!
              </Alert>
            )}
            {minorError && (
              <Alert
                color="red"
                className=""
                icon={<WarningIcon className="text-white mr-2" />}
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 100 },
                }}
                onClose={() => setMinorError(false)}
              >
                {minorErrorText}
              </Alert>
            )}
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
                        color={item.color}
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

      {/* // Update Modal for Lecturer Post when click on the date in calendar  */}
      <Dialog
        size="xs"
        open={openUpdateModal}
        handler={handleUpdateModal}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            // color="deep-orange"
            className="mb-4 grid h-28 place-items-center bg-primary"
          >
            <Typography variant="h3" color="white">
              Update the form
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Title"
              value={titleUpdate}
              onChange={(e) => setTitleUpdate(e.target.value)}
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
            />
            <Input
              type="text"
              maxLength="2"
              placeholder="Weight in %"
              icon={<p>%</p>}
              value={markweightUpdate}
              onChange={(e) => setMarkweightUpdate(e.target.value)}
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
            />
            <Input
              type="text"
              placeholder="Scope"
              value={scopeUpdate}
              onChange={(e) => setScopeUpdate(e.target.value)}
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
            />
            <Textarea
              type="text"
              placeholder="Description"
              value={descriptionUpdate}
              onChange={(e) => setDescriptionUpdate(e.target.value)}
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
            />
            <Input
              type="datetime-local"
              label="Start Date and Time"
              value={selectedUpdateStartDate}
              onChange={(e) => setSelectedUpdateStartDate(e.target.value)}
              containerProps={{ className: "min-w-[100px]" }}
            />
            <Input
              type="datetime-local"
              label="End Date and Time"
              value={selectedUpdateEndDate}
              onChange={(e) => setSelectedUpdateEndDate(e.target.value)}
              containerProps={{ className: "min-w-[100px]" }}
            />
            {errorAlert && (
              <Alert
                color="red"
                className=""
                icon={<WarningIcon className="text-white mr-2" />}
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 100 },
                }}
                onClose={() => setErrorAlert(false)}
              >
                Please select the assessment!
              </Alert>
            )}
            {minorError && (
              <Alert
                color="red"
                className=""
                icon={<WarningIcon className="text-white mr-2" />}
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 100 },
                }}
                onClose={() => setMinorError(false)}
              >
                {minorErrorText}
              </Alert>
            )}
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
                        checked={typeUpdate === item.value}
                        onChange={() => setTypeUpdate(item.value)}
                        value={item.value}
                        color={item.color}
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
            <Button variant="gradient" onClick={handleUpdate} fullWidth>
              Update
            </Button>
            <Button
              variant="gradient"
              color="red"
              onClick={handleDelete}
              fullWidth
              className="mt-2"
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
}

export default CalendarPost;
