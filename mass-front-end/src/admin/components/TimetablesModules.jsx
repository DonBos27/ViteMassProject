import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlughin from "@fullcalendar/interaction";

import { getTimetableForDay } from "./getTimetableForDay";

function TimetablesModules() {
  const events = [
    { title: "event 1", date: "2021-09-01" },
    { title: "event 2", date: "2021-09-02" },
  ];

  const referenceDate = "2023-08-28"; // A reference date (e.g., this week's Monday)
  const [event, setEvents] = useState([]);

  useEffect(() => {
    async function fetchTimetable() {
      const modules = await getTimetableForDay(referenceDate);
      // Format modules data into events array
      const formattedEvents = modules.map((module) => ({
        title: module.name,
        start: `${referenceDate}T${module.startTime}:00`,
        end: `${referenceDate}T${module.endTime}:00`,
      }));
      setEvents(formattedEvents);
      console.log(formattedEvents);
    }

    fetchTimetable();
  }, [referenceDate]);

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

export default TimetablesModules;
