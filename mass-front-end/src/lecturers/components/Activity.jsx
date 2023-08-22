import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

function Activity() {
  return (
    <div>
      <Card
        color="gray"
        variant="gradient"
        className="w-full p-12 bg-primary text-white"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
        >
          <Typography
            variant="small"
            color="white"
            className="font-normal uppercase"
          >
            Activities
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <ArrowRightAltIcon />
              </span>
              <Typography className="font-normal">25 Aug: </Typography>
              <Typography className="font-normal">Assignment 1</Typography>
            </li>
          </ul>
        </CardBody>
        <CardFooter className="mt-12 p-0">
          {/* <Button
            size="lg"
            color="white"
            className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            ripple={false}
            fullWidth={true}
          >
            Buy Now
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}

export default Activity;
