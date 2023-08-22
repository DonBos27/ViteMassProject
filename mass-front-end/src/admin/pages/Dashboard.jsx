import React, { useEffect, useState } from "react";
import Sidebar from "../global/Sidebar";
import NavigationBar from "../global/NavigationBar";
import StatisticsCard from "../components/StatisticsCard";
import StatisticsChart from "../components/StatisticsChart";
import WelcomeCard from "../components/WelcomeCard";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { db, usersCollection } from "../../firebase/configFirebase";

function Dashboard() {
  const { user, logIn } = useAuth();
  // fetch data from firestore
  const [userData, setUserData] = useState(null);

  const unsub = onSnapshot(doc(usersCollection, `${user.email}`), (doc) => {
    console.log("Current data: ", doc.data());
    console.log(user.email);
    console.log(doc.data().data[0].name);
});

// useEffect(()=>{
//   unsub()
// },[])

  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full mx-5 mt-4">
        <NavigationBar title={"Dashboard"}/>
        <div>
          <WelcomeCard />
        </div>
        <div className="mt-12">
          <StatisticsCard />
        </div>
        <StatisticsChart />
      </div>
    </div>
  );
}

export default Dashboard;
