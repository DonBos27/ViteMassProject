import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import StudentsRegistered from "./charts/StudentsRegistered";
import MaleRegisterd from "./charts/MaleStudent";
import ComparePass from "./charts/ComparePass";

function StatisticsChart() {
  const menu = [
    {
      id: 1,
      title: "Percentage of Students Enrolled",
      description:
        "This describe the number of students enrolled in the department per year",
      data: StudentsRegistered,
    },
    {
      id: 2,
      title: "Percentage of male and female students",
      description:
        "This describe the number of males students and females students in the department per year",
      data: MaleRegisterd,
    },
    {
      id: 3,
      title: "Percentage of students who passed/registered",
      description:
        "This describe the number of students who passed and registered in the department per year",
      data: ComparePass,
    },
  ];
  return (
    <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
      {menu.map((item) => (
        <Card className="" key={item.id}>
          <CardHeader color="white" className="relative h-56">
            <Chart {...item.data} />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {item.title}
            </Typography>
            <Typography>{item.description}</Typography>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default StatisticsChart;
