import React from "react";
import Sidebar from "../global/Sidebar";
import NavigationBar from "../global/NavigationBar";

function LogsReports() {
  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full mx-5 mt-4">
        <NavigationBar title={"Logs & Reports"} />
      </div>
    </div>
  );
}

export default LogsReports;