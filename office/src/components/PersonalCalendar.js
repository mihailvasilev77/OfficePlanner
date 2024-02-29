import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from 'react-router-dom';

const localizer = momentLocalizer(moment);
const VACATION_URL = '/vacation'

function PersonalCalendar() {
  const [pendingData, setPendingData] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(VACATION_URL);
        console.log(response.data)
        setPendingData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [axiosPrivate]);
  
  function getUsername(objects, userInputId) {
    let obj = objects.find(object => object._id.toString() === userInputId);
  
    if (obj) {
      return obj.username;
    }

    return 'No object found with the provided ID';
  }

  let filteredObjects = pendingData.filter(obj => obj.username === getUsername(pendingData, userId));

    return (
      <div className="calendar-container">
        <h1>Calendar</h1>
        <br/>
        <div className="calendar">
        <Calendar
          localizer={localizer}
          events={filteredObjects.map(item => ({
            title: item.username,
            start: new Date(item.startDate),
            end: new Date(item.endDate),
          }))}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
        />
         </div>
      </div>
    );
};

export default PersonalCalendar;
