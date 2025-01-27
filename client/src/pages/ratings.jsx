import React, { useEffect, useState } from "react";

export default function Ratings() {
  const [employees, setEmployees] = useState([]);
  const [ratings, setRatings] = useState({});

 
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/employee-list");
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = await response.json();
        setEmployees(data);
        const initialRatings = {};
        data.forEach((employee) => {
          initialRatings[employee._id] = {
            quality: 0,
            productivity: 0,
            timeManagement: 0,
            adaptability: 0,
            collaboration: 0,
          };
        });
        setRatings(initialRatings);
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    };

    fetchEmployees();
  }, []);

 
  const handleInputChange = (e, employeeId, field) => {
    const value = parseInt(e.target.value, 10);
    setRatings((prevRatings) => ({
      ...prevRatings,
      [employeeId]: {
        ...prevRatings[employeeId],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/save-ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratings),
      });
      if (!response.ok) {
        throw new Error("Failed to save ratings");
      }
      alert("Ratings saved successfully!");
    } catch (error) {
      console.error("Error saving ratings:", error.message);
    }
  };

  return (
    <div>
      <h4>Performance Rating</h4>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Quality of Work</th>
            <th>Productivity</th>
            <th>Time Management</th>
            <th>Adaptability & Innovation</th>
            <th>Collaboration</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="8">No employees found.</td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.empId}</td>
                <td>{employee.fullName}</td>
                <td>{employee.department}</td>
                {["quality", "productivity", "timeManagement", "adaptability", "collaboration"].map(
                  (field) => (
                    <td key={field}>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={ratings[employee._id]?.[field] || ""}
                        onChange={(e) => handleInputChange(e, employee._id, field)}
                        style={{
                           backgroundColor: "#F8F8FF",
                           border: "1px solid #000080", 
                           borderRadius: "4px", 
                           padding: "5px", 
                         }}
                      />
                    </td>
                  )
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button className="add-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}
