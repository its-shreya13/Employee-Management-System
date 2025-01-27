import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/employee-list"); 
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    };

    fetchEmployees();
  }, []);

 
  const handleDelete = async (empId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/employee/${empId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete employee");
        }

       
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.empId !== empId)
        );

        alert("Employee deleted successfully.");
      } catch (error) {
        console.error("Error deleting employee:", error.message);
        alert("Failed to delete employee. Please try again.");
      }
    }
  };

  return (
    <div>
      <h4>Employee List</h4>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Date of Joining</th>
            <th>Department</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="7">No employees found.</td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.empId}>
                <td>{employee.empId}</td>
                <td>{employee.fullName}</td>
                <td>{employee.emailId}</td>
                <td>{employee. phoneNo}</td>
                <td>{new Date(employee.dateOfJoining).toLocaleDateString()}</td>
                <td>{employee.department}</td>
                <td>
                 
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(employee.empId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button
        className="add-button"
        onClick={() => navigate("/create-employee")}
      >
        Add New Employee
      </button>
    </div>
  );
}
