import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from 'react-router-dom';

const localizer = momentLocalizer(moment);

function PersonalCalendar() {
  const [pendingData, setPendingData] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { userId } = useParams();
  console.log(userId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(`/vacation/${userId}`);
        console.log(response.data)
        setPendingData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [axiosPrivate]);
  
    return (
      <div>
        <h1>Calendar</h1>
        <Calendar
          localizer={localizer}
          events={pendingData.map(item => ({
            title: item.username,
            start: new Date(item.startDate),
            end: new Date(item.endDate),
          }))}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
        />
      </div>
    );
};

export default PersonalCalendar;
