import React, { useState, useRef, useEffect } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from '../hooks/useAuth';

const REQUEST_URL = "/request";

const Request = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [user, setUser] = useState('');

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    document.title = "Request a vacation"
  }, []);
  
  useEffect(() => {
    setUser(auth?.username || auth?.user);
  }, [auth?.username, auth?.user]);

  const handleSubmit  = async (e) =>{
    e.preventDefault();
    try {
        const response = await axiosPrivate.post(REQUEST_URL,
            JSON.stringify({user, startDate, endDate}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        console.log(JSON.stringify(response?.data));
        setStartDate('');
        setEndDate('');
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No server response.');
        } else {
            setErrMsg('Request failed.')
        }
        errRef.current.focus();
    }
  };

  return (
    <form className='requestForm' onSubmit={handleSubmit}>
      <h1>Create a request for vacation.</h1>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
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
            onChange={(e) => setStartDate(e.target.value)}
            required
        />
      </label>
      <label htmlFor="endDate">
        End Date:&nbsp;
        <input 
            type="date" 
            id="endDate"
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)}
            required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Request;
