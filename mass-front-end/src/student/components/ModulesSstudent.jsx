import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../../context/AuthContext";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/configFirebase";
import BayPDF from "../files/Bay.pdf";

import "./Modules.css";

function ModulesSstudent() {
  const [open, setOpen] = useState(null);
  const [modulesData, setModulesData] = useState([]);
  const { user } = useAuth();
  const [targetUserId] = useState(user.uid);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      async (snapshot) => {
        const users = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Users:", users);

        const targetUser = users.find((user) => user.id === targetUserId);
        if (!targetUser) {
          console.log("Target user not found");
          return;
        }

        console.log("Target User:", targetUser);

        const enrolledModulesData = [];
        if (Array.isArray(targetUser.enrolled_modules)) {
          for (const moduleReference of targetUser.enrolled_modules) {
            try {
              const moduleDoc = await getDoc(moduleReference);
              if (moduleDoc.exists()) {
                enrolledModulesData.push({
                  id: moduleReference.id,
                  ...moduleDoc.data(),
                });
              } else {
                console.log("Module not found:", moduleReference.id);
              }
            } catch (error) {
              console.error("Error fetching module:", error);
            }
          }
        } else {
          console.log(
            "enrolled_modules is not an array:",
            targetUser.enrolled_modules
          );
        }

        console.log("Enrolled Modules Data:", enrolledModulesData);
        setModulesData(enrolledModulesData);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [targetUserId]); // Add targetUserId to the dependencies array if it changes

  const handleOpen = (moduleCode) => {
    setOpen(moduleCode);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <div>
      <div className="mb-12 grid gap-y-10 gap-x-5 md:grid-cols-2 xl:grid-cols-4 ">
        {modulesData.map((item) => (
          <div key={item.moduleCode}>
            <Card className="w-full h-96 shadow-lg">
              <CardHeader floated={false} color="blue-gray">
                <img src={item.image} alt="ui/ux review check" />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              </CardHeader>
              <CardBody>
                <div className="mb-3 flex items-center justify-between">
                  <Typography
                    variant="h4"
                    color="black"
                    className="font-medium"
                  >
                    {item.moduleName}
                  </Typography>
                </div>
                <Typography color="gray">{item.lecturerName}</Typography>
              </CardBody>
              <CardFooter className="pt-3">
                <Button
                  onClick={() => handleOpen(item.moduleCode)}
                  className="bg-primary"
                  size="lg"
                  fullWidth={true}
                >
                  Read more
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
        {modulesData.map((item) => (
          <Dialog
            key={item.moduleCode}
            open={open === item.moduleCode}
            handler={handleClose}
          >
            <DialogHeader>{item.moduleCode}</DialogHeader>
            <DialogBody divider className="h-[40rem] overflow-scroll">
              <iframe
                src={item.moduleInfo ? item.moduleInfo : "nothing"}
                width="100%"
                height="100%"
                title="PDF Viewer"
              />
            </DialogBody>
            <DialogFooter className="space-x-2">
              <Button variant="outlined" color="red" onClick={handleClose}>
                close
              </Button>
            </DialogFooter>
          </Dialog>
        ))}
      </div>
    </div>
  );
}

export default ModulesSstudent;
