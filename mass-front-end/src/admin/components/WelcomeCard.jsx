import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

function WelcomeCard() {
  return (
    <div className="mt-6">
      <Card className="w-full flex-row">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none"
        >
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="card-image"
            className=" w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            Mass
          </Typography>
          <Typography variant="h2" color="blue-gray" className="mb-2">
            Welcome to your Dashboard
          </Typography>
          <Typography color="gray" className="mb-8 font-normal text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam,
            voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam,
            voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
            
          </Typography>
          {/* <a href="#" className="inline-block">
            <Button variant="text" className="flex items-center gap-2">
              View Profile
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a> */}
        </CardBody>
      </Card>
    </div>
  );
}

export default WelcomeCard;
