import { useLoaderData } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { axiosPrivate } from '../api/axios';
import { useEffect } from 'react';

const localizer = momentLocalizer(moment);

/**
 * Router loader — fetches vacations filtered by username from the URL param.
 *
 * The old code fetched ALL vacations and filtered client-side using a
 * convoluted ID-to-username lookup. Now the backend provides a dedicated
 * /vacation/user/:username endpoint so we only transfer the data we need.
 */
export const personalCalendarLoader = async ({ params }) => {
  try {
    const { data } = await axiosPrivate.get(`/vacation/user/${params.username}`);
    return data ?? [];
  } catch {
    return [];
  }
};

const PersonalCalendar = () => {
  const vacations = useLoaderData();

  useEffect(() => {
    document.title = 'Personal Calendar';
  }, []);

  const events = vacations.map((item) => ({
    title: item.username,
    start: new Date(item.startDate),
    end: new Date(item.endDate),
  }));

  return (
    <div className="calendar-container">
      <h1>Personal Calendar</h1>
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

export default PersonalCalendar;
