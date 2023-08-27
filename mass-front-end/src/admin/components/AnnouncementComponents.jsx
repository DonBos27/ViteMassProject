import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
  Textarea,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
} from "@material-tailwind/react";
import { useAuth } from "../../context/AuthContext";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/configFirebase";
import UJLogo from "../images/uj.png";

const radio = [
  { id: 1, value: "everyone", color: "blue" },
  { id: 2, value: "lecturer", color: "green" },
  { id: 3, value: "student", color: "red" },
];

function AnnouncementComponents() {
  const { user: authUser } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [recipient, setRecipient] = useState("");
  const [userData, setUserData] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    if (authUser) {
      const email = authUser.email;
      console.log("Email:", email);
      const unsubscribe = onSnapshot(
        doc(db, "users", email), // Assuming your collection is "users" and the document ID is the email
        (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            console.log("Fetched data from Firestore:", data);
            // const dataModules = data.modules;
            // console.log("Modules:", dataModules);
            // setUserData(dataModules);
            setName(data.name);
            console.log("Lecturer ID:", name);
          }
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, [authUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = authUser.email;
      const userRole = email.endsWith("@uj.ac.za") ? "lecturer" : "student";

      let announcementsCollection;

      if (recipient === "everyone") {
        // Create announcements in both lecturer and student collections
        announcementsCollection = collection(db, `announcements_lecturer`);
        await addDoc(announcementsCollection, {
          title,
          content,
          recipient: recipient,
          timestamp: serverTimestamp(),
          name: name,
        });

        announcementsCollection = collection(db, `announcements_student`);
        await addDoc(announcementsCollection, {
          title,
          content,
          recipient: recipient,
          timestamp: serverTimestamp(),
          name: name,
        });
        console.log("Announcement created successfully for everyone!");
      } else {
        // Create announcement in the corresponding collection
        announcementsCollection = collection(db, `announcements_${recipient}`);
        await addDoc(announcementsCollection, {
          title,
          content,
          recipient,
          timestamp: serverTimestamp(),
          name: name,
        });
        console.log(`Announcement created successfully for ${recipient}!`);
      }

      // Clear form after successful announcement creation
      setTitle("");
      setContent("");
      setRecipient("");
      //   alert("Announcement created successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to create announcement!");
    }
  };

  return (
    <div>
      <Card className="w-full max-w-[50rem] mb-5">
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
        >
          <div className="mb-4 rounded-full border border-white/10 bg-white/10 text-white">
            <img src={UJLogo} alt="UJ Logo" className="rounded-full" />
          </div>
          <Typography variant="h4" color="white">
            Announcements
          </Typography>
        </CardHeader>
        <CardBody className="w-[700px]">
          <form className="mt-12 flex flex-col ">
            <div>
              <Typography
                variant="small"
                color="gray"
                className="my-5 font-normal"
              >
                Title of Announcement
              </Typography>
              <Input
                type="text"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="my-6">
              <Typography
                variant="small"
                color="gray"
                className="my-5 font-normal"
              >
                Description of Announcement
              </Typography>
              <Textarea
                label="Description"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="mb-5">
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
                          checked={recipient === item.value}
                          onChange={() => setRecipient(item.value)}
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
            </div>
            <Button size="lg" className="bg-primary" onClick={handleSubmit}>
              <Typography color="white">Submit</Typography>
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default AnnouncementComponents;
