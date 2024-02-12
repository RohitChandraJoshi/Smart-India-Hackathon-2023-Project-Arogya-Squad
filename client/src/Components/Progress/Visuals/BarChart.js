import { Bar, ArcElement } from "react-chartjs-2";
import "chart.js/auto";
import { useEffect } from "react";
const BarChart = (props) => {
  useEffect(() => {
  });
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "Grade",
        backgroundColor: "#C43EF3",
        borderColor: "#C43EF3",
        borderWidth: 2,
        hoverBackgroundColor: "#000000",
        hoverBorderColor: "#000000",
        data: props.values, // Replace with your data values
        barThickness: 30, // Adjust the bar width as needed
      },
    ],
  };
  const options = {
    maintainAspectRatio: false, // Disable the aspect ratio to set custom width and height
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        barPercentage: 0.5, // Adjust the width of the bars relative to the x-axis
        categoryPercentage: 0.5, // Adjust the width of the bars relative to the category width
      },
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
    width: 400, // Replace with your desired width
    height: 400, // Replace with your desired height
  };

  // Options for the bar chart

  return <Bar options={options} data={data} />;
};

export default BarChart;
