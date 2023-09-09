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
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/configFirebase";

import "./Modules.css";

function ModulesSstudent() {
  const [open, setOpen] = useState(false);
  const [modulesData, setModulesData] = useState([]);

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

  const handleOpen = () => setOpen(!open);
  return (
    <div>
      <div className="mb-12 grid gap-y-10 gap-x-5 md:grid-cols-2 xl:grid-cols-4 ">
        {modulesData.map((item) => (
          <div key={item}>
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
                <Typography color="gray">
                  {item.lecturerName}
                </Typography>
              </CardBody>
              <CardFooter className="pt-3">
                <Button
                  onClick={handleOpen}
                  className="bg-primary"
                  size="lg"
                  fullWidth={true}
                >
                  Read more
                </Button>
              </CardFooter>
            </Card>
            <Dialog tabIndex={item} open={open} handler={handleOpen}>
              <DialogHeader>{item.title}</DialogHeader>
              <DialogBody divider className="h-[40rem] overflow-scroll">
                <Typography className="font-normal">
                  I always felt like I could do anything. That&apos;s the main
                  thing people are controlled by! Thoughts- their perception of
                  themselves! They&apos;re slowed down by their perception of
                  themselves. If you&apos;re taught you can&apos;t do anything,
                  you won&apos;t do anything. I was taught I could do
                  everything. As we live, our hearts turn colder. Cause pain is
                  what we go through as we become older. We get insulted by
                  others, lose trust for those others. We get back stabbed by
                  friends. It becomes harder for us to give others a hand. We
                  get our heart broken by people we love, even that we give them
                  all we have. Then we lose family over time. What else could
                  rust the heart more over time? Blackgold. We&apos;re not
                  always in the position that we want to be at. We&apos;re
                  constantly growing. We&apos;re constantly making mistakes.
                  We&apos;re constantly trying to express ourselves and
                  actualize our dreams. If you have the opportunity to play this
                  game of life you need to appreciate every moment. A lot of
                  people don&apos;t appreciate the moment until it&apos;s
                  passed. There&apos;s nothing I really wanted to do in life
                  that I wasn&apos;t able to get good at. That&apos;s my skill.
                  I&apos;m not really specifically talented at anything except
                  for the ability to learn. That&apos;s what I do. That&apos;s
                  what I&apos;m here for. Don&apos;t be afraid to be wrong
                  because you can&apos;t learn anything from a compliment.
                </Typography>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button variant="outlined" color="red" onClick={handleOpen}>
                  close
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModulesSstudent;
