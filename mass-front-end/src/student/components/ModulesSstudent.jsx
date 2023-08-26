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
  } from "@material-tailwind/react"
import PersonIcon from "@mui/icons-material/Person";

import './Modules.css'

function ModulesSstudent() {
    const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);
    const data = [
        {
          id: 1,
          icon: <PersonIcon />,
          title: "Business Analysis",
          lecturer: "Dr Shoppe",
          image: "https://img.freepik.com/free-photo/business-people-shaking-hands-together_53876-30568.jpg",
        },
        {
          id: 2,
          icon: <PersonIcon />,
          title: "Developement Software",
          lecturer: "Dr Luca",
          image: "https://media.istockphoto.com/id/1311598658/photo/businessman-trading-online-stock-market-on-teblet-screen-digital-investment-concept.jpg?s=612x612&w=0&k=20&c=HYlIJ1VFfmHPwGkM3DtVIFNLS5ejfMMzEQ81ko534ak=",
        },
        {
            id: 3,
            icon: <PersonIcon />,
            title: "Communication network",
            lecturer: "Prof Siyabonga",
            image: "https://nsfgradfellows.org/wp-content/uploads/2021/07/AdobeStock_67901546-2-750x400.jpg",
          },

          {
            id: 3,
            icon: <PersonIcon />,
            title: "Information System",
            lecturer: "Dr Patrick",
            image: "https://static.javatpoint.com/blog/images/mis-management-information-systems.png",
          },
    
      ];
  return (
    <div>
    <div className="mb-12 ml-4 mr-4 grid gap-y-10 gap-x-5 md:grid-cols-2 xl:grid-cols-4">
      {data.map((item) => (
        <div key={item}>
        <Card  className="w-full max-w-[20rem] shadow-lg">
        <CardHeader floated={false} color="blue-gray">
          <img
            src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="ui/ux review check"
          />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
          
        </CardHeader>
        <CardBody>
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h4" color="black" className="font-medium">
              {item.title}
            </Typography>
            
          </div>
          <Typography variant="p" color="gray">{item.lecturer}</Typography>
        </CardBody>
        <CardFooter className="pt-3">
          <Button onClick={handleOpen} className="bg-primary" size="lg" fullWidth={true}>
            Read more
          </Button>
        </CardFooter>
      </Card>
      <Dialog  tabIndex={item} open={open} handler={handleOpen}>
        <DialogHeader>{item.title}</DialogHeader>
        <DialogBody divider className="h-[40rem] overflow-scroll">
          <Typography className="font-normal">
            I always felt like I could do anything. That&apos;s the main thing
            people are controlled by! Thoughts- their perception of themselves!
            They&apos;re slowed down by their perception of themselves. If
            you&apos;re taught you can&apos;t do anything, you won&apos;t do
            anything. I was taught I could do everything. As we live, our hearts
            turn colder. Cause pain is what we go through as we become older. We
            get insulted by others, lose trust for those others. We get back
            stabbed by friends. It becomes harder for us to give others a hand.
            We get our heart broken by people we love, even that we give them
            all we have. Then we lose family over time. What else could rust the
            heart more over time? Blackgold.
            We&apos;re not always in the position that we want to be at.
            We&apos;re constantly growing. We&apos;re constantly making
            mistakes. We&apos;re constantly trying to express ourselves and
            actualize our dreams. If you have the opportunity to play this game
            of life you need to appreciate every moment. A lot of people
            don&apos;t appreciate the moment until it&apos;s passed.
            There&apos;s nothing I really wanted to do in life that I
            wasn&apos;t able to get good at. That&apos;s my skill. I&apos;m not
            really specifically talented at anything except for the ability to
            learn. That&apos;s what I do. That&apos;s what I&apos;m here for.
            Don&apos;t be afraid to be wrong because you can&apos;t learn
            anything from a compliment.
            
            
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
  )
}

export default ModulesSstudent



