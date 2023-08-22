import React from "react";
import Sidebar from "../global/Sidebar";
import NavbarLecturer from "../global/NavbarLecturer";

function Bookings() {
  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full mx-5 mt-4">
        <NavbarLecturer title={"Bookings"} />
      </div>
    </div>
  );
}

export default Bookings;
