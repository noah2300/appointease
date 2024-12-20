import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Home, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { NotificationBell } from '../features/NotificationBell';

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleProviderSignUp = () => {
    navigate('/auth', { state: { isProvider: true } });
  };

  const handleSignIn = () => {
    navigate('/auth', { state: { redirectTo: location.pathname } });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    switch (user?.role) {
      case 'provider':
        return '/provider-dashboard';
      case 'admin':
        return '/admin-dashboard';
      default:
        return '/customer-dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">AppointEase</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => handleNavigation('/')}
              className={`flex items-center space-x-1 transition-colors ${
                isActive('/') 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>
            <button 
              onClick={() => handleNavigation('/search')}
              className={`transition-colors ${
                isActive('/search') 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Find Services
            </button>
            <button 
              onClick={() => handleNavigation('/about')}
              className={`transition-colors ${
                isActive('/about') 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation('/contact')}
              className={`transition-colors ${
                isActive('/contact') 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Contact
            </button>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <NotificationBell />
              <button 
                onClick={() => handleNavigation(getDashboardLink())}
                className={`flex items-center space-x-1 transition-colors ${
                  isActive(getDashboardLink())
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Dashboard</span>
              </button>
              <div className="flex items-center space-x-4 border-l pl-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.name}
                  <span className="ml-1 text-xs text-gray-500">
                    ({user?.role})
                  </span>
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={handleSignIn}>
                <User className="mr-2 h-4 w-4" />
                Sign In
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={handleProviderSignUp}
              >
                Join as Provider
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}