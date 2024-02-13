import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'G:/Projects/SIH 2023/SIH1341_16581_Arogya_Squad/SIH1341_16581_Arogya_Squad/client/src/css/UserProfile/ratio.css'; // Import the CSS file for this component
import Sidebar from "G:/Projects/SIH 2023/SIH1341_16581_Arogya_Squad/SIH1341_16581_Arogya_Squad/client/src/Components/Dashboard/Home/Sidebar.js"
const StudentGuideRatioPage = () => {
  // Hardcoded student and guide counts
  const students = 1000;
  const guides = 200;

  // Data for the chart
  const chartData = {
    labels: ['Students', 'Guides'],
    datasets: [
      {
        data: [students, guides],
        backgroundColor: ['#009245', '#FCEE21'], // Updated colors with the provided gradient
        hoverBackgroundColor: ['#009245', '#FCEE21'],
      },
    ],
  };

  return (
    <div className="student-guide-ratio-page"> {/* Added a class name for the container */}
    <Sidebar />
      <div className="headerx">
        <h2>Student Guide Ratio Chart</h2>
      </div>
      <div style={{ height: '450px', width: '650px', marginTop: '10%' }}>
        <Pie
          data={chartData}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
      <p style={{marginTop: '15px' }}>Current Student Guide Ratio: 5:1</p>
    </div>
  );
};

export default StudentGuideRatioPage;
