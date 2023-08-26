import React from 'react'
import Sidebar from '../global/Sidebar'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import NavbarStudent from '../global/NavbarStudent';
import { CalendarMonth } from '@mui/icons-material';
function Calendar({handleProfile}) {
  return (
    
    <div className="flex">
    <div className="w-1/4">
      <Sidebar />
    </div>
    <div className="flex flex-col w-full mr-4 mb-4 mt-4 h-full">
      <NavbarStudent Icon={CalendarMonth} title={"Calendar"} handleProfile={handleProfile} />
      <div className='bg-white mt-4 rounded-lg'>
      <div className="flex flex-1">

        <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        weekends={false}
        events={[
        { title: 'event 1', date: '2019-04-01' },
        { title: 'event 2', date: '2019-04-02' }
        ]}
                        
        />
        </div>
      </div>
      
    </div>
  </div>
  )
}

export default Calendar
