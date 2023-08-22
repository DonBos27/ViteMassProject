import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlughin from "@fullcalendar/interaction";
import "./CalendarLecturer.css"

function CalendarLecturer() {
  const events = [
    { title: "event 1", date: "2021-09-01" },
    { title: "event 2", date: "2021-09-02" },
  ];
  return (
    <div className="m-10 bg-white">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlughin]}
        initialView="timeGridWeek"
        weekends={false}
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        titleFormat={{ year: "numeric", month: "long", day: "numeric" }}
        height={"500px"}
      />
    </div>
  );
}

export default CalendarLecturer;
