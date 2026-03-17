import React, { useState, useRef, useEffect } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from 'react-router-dom';
import moment from 'moment';

const EDIT_URL = "/vacation";

const Edit = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [user, setUser] = useState('');
  const [status, setStatus] = useState('Pending');
  const location = useLocation();
  const { data, id } = location.state || {};

  const axiosPrivate = useAxiosPrivate();
  
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    document.title = "Edit a request"
  }, []);

  useEffect(() => {
    setUser(data[id].username);
    setStartDate(moment(data[id].startDate).format("YYYY-MM-DD"));
    setEndDate(moment(data[id].endDate).format("YYYY-MM-DD"));
  }, [data, id]);

  const handleSubmit  = async (e) =>{
    e.preventDefault();
    try {
        if (status === 'Approved') {
            const response = await axiosPrivate.post(EDIT_URL,
                JSON.stringify({user, startDate, endDate}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const deleteResponse = await axiosPrivate.delete(`/pending/${data[id]._id}`, {
                withCredentials: true,
              });
            console.log(JSON.stringify(deleteResponse?.data));
    
        }else if (status === 'Denied') {
            const deleteResponse = await axiosPrivate.delete(`/pending/${data[id]._id}`, {
                withCredentials: true,
              });
            console.log(JSON.stringify(deleteResponse?.data));
          }
          setUser('');
          setStartDate('');
          setEndDate('');
          setStatus('Pending');
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No server response.');
        } else {
            setErrMsg('Edit failed.')
        }
        errRef.current.focus();
    }
  };

  return (
    <form className='editForm' onSubmit={handleSubmit}>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>Edit the request for a vacation.</h1>
      <label htmlFor="username">
        Username:&nbsp;
        <input
          type="text"
          value={user}
          readOnly
        />
      </label>
      <label htmlFor="startDate">
        Start Date:&nbsp;
        <input
            type="date" 
            id="startDate"
            value={startDate}
            readOnly
        />
      </label>
      <label htmlFor="endDate">
        End Date:&nbsp;
        <input 
            type="date" 
            id="endDate"
            value={endDate} 
            readOnly
        />
      </label>
      <label htmlFor="status">
        Status:&nbsp;
        <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
        >
        <option value="Pending" disabled>Pending</option>
        <option value="Denied">Denied</option>
        <option value="Approved">Approved</option>
      </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Edit;
