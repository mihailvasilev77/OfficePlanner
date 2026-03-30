import { useLoaderData, useParams } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { axiosPrivate } from '../api/axios';
import { useEffect } from 'react';

const localizer = momentLocalizer(moment);

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
  const { username } = useParams();

  useEffect(() => {
    document.title = `${username}'s Calendar`;
  }, [username]);

  const events = vacations.map((item) => ({
    title: item.username,
    start: new Date(item.startDate),
    end: new Date(item.endDate),
  }));

  return (
    <div className="calendar-container">
      <h1>{username}'s Vacations</h1>
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
