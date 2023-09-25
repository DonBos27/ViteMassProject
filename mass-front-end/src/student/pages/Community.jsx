import SidebarCommunity from '../components/SidebarCommunity';
import NavbarStudent from '../global/NavbarStudent';
import Sidebar from '../global/Sidebar'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/configFirebase";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import './Community.css'
function Community({handleProfile}) {
  const [userData, setUserData] = useState([]);
  const { user, logOut } = useAuth();
  useEffect(() => {
    if (user) {
      const email = user.email;
      //console.log("Email:", email);
      const unsubscribe = onSnapshot(doc(db, "users", email), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          console.log("Fetched data from Firestore:", data);
          setUserData(data);
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);
  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full mr-4 mb-4 mt-4 h-screen">
        <NavbarStudent Icon={PeopleAltIcon} title={"Community"} handleProfile={handleProfile} />
        <div className="app">
          <div className='app__body'>
            <SidebarCommunity user={userData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
