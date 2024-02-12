import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  // State variables to store data
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalFaculties, setTotalFaculties] = useState(0);
  const [totalPublications, setTotalPublications] = useState(0);

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    // Simulating API calls to fetch data
    // You would replace this with actual API calls to your server
    const fetchData = async () => {
      try {
        // Fetch total students
        const studentsResponse = await fetch('/api/students');
        const studentsData = await studentsResponse.json();
        setTotalStudents(studentsData.totalStudents);

        // Fetch total faculties
        const facultiesResponse = await fetch('/api/faculties');
        const facultiesData = await facultiesResponse.json();
        setTotalFaculties(facultiesData.totalFaculties);

        // Fetch total publications
        const publicationsResponse = await fetch('/api/publications');
        const publicationsData = await publicationsResponse.json();
        setTotalPublications(publicationsData.totalPublications);
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  // return (
  //   <div>
  //     <h1>Dashboard</h1>
  //     <div>
  //       <h2>Total Students: {totalStudents}</h2>
  //     </div>
  //     <div>
  //       <h2>Total Faculties: {totalFaculties}</h2>
  //     </div>
  //     <div>
  //       <h2>Total Publications: {totalPublications}</h2>
  //     </div>
  //   </div>
  // );
};

export default Dashboard;
