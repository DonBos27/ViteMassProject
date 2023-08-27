import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import Background from "./images/background.gif";
import { useAuth } from "../context/AuthContext";
import { Timestamp, updateDoc } from "firebase/firestore";
import { db, usersCollection } from "../firebase/configFirebase";

function Login() {
  // story months into an array
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // getting the current the date
  const current = new Date();
  // Displaying the day and the month
  const date = `${current.getDate()} ${month[current.getMonth()]}`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, logIn, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Login");
    console.log(user);
    handleLogout();
    // handleLogin();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      // Log the timeIn when the user logs in
      if (email.endsWith("@admin.uj.ac.za")) {
        navigate("/dashboard");
      } else if (email.endsWith("@uj.ac.za")) {
        navigate("/homelecturer");
      }
      console.log("Login");
      // navigate("/dashboard");
    } catch (err) {
      console.log(err);
      console.log("Failed to Login");
    }
  };

  const handleLogout = async () => {
    
    try {
      // await logOut();
      if (user) {
        const userDocRef = doc(db, "users", user.email);
        console.log(userDocRef);
        await updateDoc(userDocRef, {
          timeIn: Timestamp.fromDate(new Date()),
        });
      }
      // navigate("/");
      console.log("Logout");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <img
        src={Background}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader className="mb-4 flex justify-around h-28 place-items-center bg-[#2E1A46]">
            <Typography variant="h3" color="white">
              MASS
            </Typography>
            <Typography variant="h6" color="white">
              {date}
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Typography variant="small">
              Please enter your credentials:
            </Typography>
            <Input
              type="text"
              color="deep-orange"
              label="Login ID"
              size="lg"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              type="password"
              color="deep-orange"
              label="Password"
              size="lg"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              fullWidth
              className="bg-secondary hover:bg-primary"
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Login;
