import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Page from "./pages/login-page";
import TaskAssignPage from "./pages/task-assign";
import TaskListPage from "./pages/task-list";
import DashBoard from "./pages/dashboard";
import CreateEmployee from "./pages/create-employee";
import EmployeeList from "./pages/employee-list";
import { useAuth } from './contexts/AuthContext';
import Ratings from "./pages/ratings"; 
import Analysis from "./pages/analysis";
import "./index.css"; 

export const AuthContext = createContext();


function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();  
  
  if (!user) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}


function App() {
  const [user, setUser] = useState(() => {
   
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <div  className=" app-container">
        <Routes>

          <Route path="/" element={<Page />} />

          <Route
            path="/task-assign"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <TaskAssignPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/task-list"
            element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <TaskListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee-list"
            element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <EmployeeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-employee"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <CreateEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ratings"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Ratings/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analysis"
            element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <Analysis/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <div>About Page</div>
              </ProtectedRoute>
            }
          />
          
        </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
