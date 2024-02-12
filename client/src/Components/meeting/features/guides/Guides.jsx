import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorComponent from '../../Components/DoctorComponent';
import guides from '../../data/guides';

const Guides = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = () => {
    setLoading(true);
    const dataPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(guides);
      }, 1000);
    });
    dataPromise
      .then((doctors) => {
        setData(doctors);
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []); // No need to return an empty cleanup function if you don't have any subscriptions or intervals to clear

  const handleListItemClick = (id, firstName, lastName) => {
    console.log(`Navigating to book with ID: ${id}`);
    navigate(`book`, {
      state: {
        data: {
          id,
          firstName,
          lastName,
        },
      },
    });
  };

  return (
    <DoctorComponent
      handleListItemClick={handleListItemClick}
      data={data}
      loading={loading}
    />
  );
};

export default Guides;
