import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Analysis() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/employee-list")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  const chartData = {
    labels: employees.map((employee) => employee.fullName),
    datasets: [
      {
        label: "Quality of Work",
        data: employees.map((employee) => parseFloat(employee.quality) || 0),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Collaboration",
        data: employees.map((employee) => parseFloat(employee.collaboration) || 0),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Productivity",
        data: employees.map((employee) => parseFloat(employee.productivity) || 0),
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
      {
        label: "Time Management",
        data: employees.map((employee) => parseFloat(employee.timeManagement) || 0),
        backgroundColor: "rgba(255, 159, 64, 0.5)",
      },
      {
        label: "Adaptability & Innovation",
        data: employees.map((employee) => parseFloat(employee.adaptability) || 0),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="container">
      <h3 style={{ fontSize: "2.5rem" }}>Employee Performance Analysis</h3>
      <div className="chart-container" style={{ height: "500px", width: "85%" }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Performance Analysis Across KPIs",
              },
            },
            scales: {
              x: {
                stacked: false,  
                barPercentage: 1,  
                categoryPercentage: 1,  
              },
              y: {
                stacked: false,  
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Analysis;
