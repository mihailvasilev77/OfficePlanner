import { useLoaderData } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { axiosPrivate } from '../api/axios';
import { useEffect } from 'react';

const localizer = momentLocalizer(moment);

/**
 * Router loader — fetches all approved vacations for the shared calendar.
 */
export const calendarLoader = async () => {
  try {
    const { data } = await axiosPrivate.get('/vacation');
    return data ?? [];
  } catch {
    return [];
  }
};

const LeaveCalendar = () => {
  const vacations = useLoaderData();

  useEffect(() => {
    document.title = 'Leave Calendar';
  }, []);

  const events = vacations.map((item) => ({
    title: item.username,
    start: new Date(item.startDate),
    end: new Date(item.endDate),
  }));

  return (
    <div className="calendar-container">
      <h1>Calendar</h1>
      <br />
      <div className="calendar">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
        />
      </div>
    </div>
  );
};

export default LeaveCalendar;
