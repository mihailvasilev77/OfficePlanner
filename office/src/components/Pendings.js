import React, { useState, useEffect } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const PENDING_URL = '/pending'

const Pendings = () => {
  const [pendingData, setPendingData] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(PENDING_URL);
        setPendingData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [axiosPrivate]);

  const goToEditPage = (index) => {
    navigate('/edit', { state : {data: pendingData, id: index} });
  };

  return (
    <div>
      <h1>Pending List</h1>
      <ul>
        {pendingData?.length ? (
            pendingData.map((item, index) => (
                <li key={index}>
                        Username: {item.username}<br/>
                        Start date: {moment(item.startDate).format("DD MMM YYYY, ddd")}<br/>
                        End date: {moment(item.endDate).format("DD MMM YYYY, ddd")}<br/>
                        Status: {item.status}
                    <br/>
                        <button onClick={() => goToEditPage(index)}>
                        Change Status
                        </button>
                </li>
                ))
            ) : <p>No pending vacations to display</p>
        }
      </ul>
    </div>
  );
};

export default Pendings;
