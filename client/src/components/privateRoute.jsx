import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  // If user is not admin, redirect to login
  if (userRole !== 'admin') {
    return <Navigate to="/" />;
  }

  return children; // Render the route if user is an admin
};

export default PrivateRoute;
