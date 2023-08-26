import NavbarStudent from '../global/NavbarStudent';
import Sidebar from '../global/Sidebar'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
function Community({handleProfile}) {
  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full mr-4 mb-4 mt-4 h-screen">
        <NavbarStudent Icon={PeopleAltIcon} title={"Community"} handleProfile={handleProfile} />
        <div className="">
          Modules
        </div>
      </div>
    </div>
  )
}

export default Community
