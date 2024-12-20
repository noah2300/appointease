import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: 'customer' | 'provider' | 'admin';
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (role && user?.role !== role) {
    const redirectPath = user?.role === 'provider' 
      ? '/provider-dashboard'
      : user?.role === 'admin'
      ? '/admin-dashboard'
      : '/customer-dashboard';
    
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}