import { useAuth } from '../../context/FakeAuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  });

  return children;
};

export default ProtectedRoute;
