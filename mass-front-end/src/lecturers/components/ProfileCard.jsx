import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Avatar,
} from "@material-tailwind/react";
import Profile from "../images/profileicon.png";
import UJLogo from "../images/uj.png";


export default function ProfileCard() {
  return (
    <Card
      shadow={false}
      className="w-96 mt-0 justify-center overflow-hidden text-center"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="relative h-56 bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
        <Avatar
          size="xxl"
          alt="avatar"
          src={
            Profile
          }
          className="border shadow-xl shadow-green-900/20 mt-10 mx-auto "
        />
      </CardHeader>

      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          Mabokela
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          Senior Lecturer
        </Typography>
      </CardBody>
      {/* <CardFooter className="flex justify-center gap-7 pt-2">
        <Tooltip content="Like">
          <Typography
            as="a"
            href="#facebook"
            variant="lead"
            color="blue"
            textGradient
          >
            <i className="fab fa-facebook" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#twitter"
            variant="lead"
            color="light-blue"
            textGradient
          >
            <i className="fab fa-twitter" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#instagram"
            variant="lead"
            color="purple"
            textGradient
          >
            <i className="fab fa-instagram" />
          </Typography>
        </Tooltip>
      </CardFooter> */}
    </Card>
  );
}
