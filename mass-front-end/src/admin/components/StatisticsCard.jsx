import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PersonIcon from "@mui/icons-material/Person";

function StatisticsCard() {

  const data = [
    {
      id: 1,
      icon: <PersonIcon />,
      title: "Total Lecturers",
      amount: "20",
      color: "blue",
    },
    {
      id: 2,
      icon: <PersonIcon />,
      title: "Undergraduates Students",
      amount: "661",
      color: "deep-orange",
    },
    {
        id: 3,
        icon: <PersonIcon />,
        title: "Postgraduates Students",
        amount: "315",
        color: "deep-purple",
      },

  ];
  return (
    <div className="mb-12 grid gap-y-10 gap-x-5 md:grid-cols-2 xl:grid-cols-3">
      {data.map((item) => (
        <Card className="" key={item.id}>
          <CardHeader
            variant="gradient"
            color={item.color}
            className="absolute -mt-4 grid h-16 w-16 place-items-center "
          >
            {item.icon}
          </CardHeader>
          <CardBody className="p-4 text-right">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              {item.title}
            </Typography>
            <Typography variant="h4" color="blue-gray">
              {item.amount}
            </Typography>
          </CardBody>
          {/* <CardFooter className="border-t border-blue-gray-50 p-4"></CardFooter> */}
        </Card>
      ))}
    </div>
  );
}

export default StatisticsCard;
