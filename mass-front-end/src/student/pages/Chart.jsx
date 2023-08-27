import StatisticsChart from '../components/StatisticsChart';
import NavbarStudent from '../global/NavbarStudent'
import Sidebar from '../global/Sidebar'
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import TimeSpandChart from '../components/TimeSpandChart';
function Chart({handleProfile}) {
  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full mr-4 mb-4 mt-4 h-full">
        <NavbarStudent Icon={LeaderboardIcon} title={"Chart"} handleProfile={handleProfile} />
        <div className="mt-4">
          <h2 className='text-3xl font-bold'>Your Semester Progress</h2><br/>
          <div className='mt-4'>
            <StatisticsChart />
          </div>
          <div>
          <Card className="">
          <CardHeader
            variant="gradient"
            color=""
            className="absolute -mt-4 grid h-16 w-16 place-items-center "
          >
            <LeaderboardIcon />
          </CardHeader>
          <CardBody className="p-4 ">
            <div className='ml-20'>
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                chart
              </Typography>
              <Typography variant="h4" color="blue-gray">
              Time spend on MASS
              </Typography>
            </div>
            <div className=''>
              <TimeSpandChart />
            </div>
          </CardBody>
          {/* <CardFooter className="border-t border-blue-gray-50 p-4"></CardFooter> */}
        </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chart
