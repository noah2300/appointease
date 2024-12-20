import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'provider' | 'admin';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, role: 'customer' | 'provider' | 'admin') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let role: 'customer' | 'provider' | 'admin';
      if (email.includes('admin')) {
        role = 'admin';
      } else if (email.includes('provider')) {
        role = 'provider';
      } else {
        role = 'customer';
      }

      const user = {
        id: '1',
        name: 'John Doe',
        email,
        role
      };

      setIsAuthenticated(true);
      setUser(user);

      const state = location.state as { from?: Location; redirectTo?: string; bookingData?: any };
      
      if (state?.bookingData) {
        navigate('/booking-confirmation', { 
          state: { booking: state.bookingData },
          replace: true
        });
      } else if (state?.redirectTo) {
        navigate(state.redirectTo, { replace: true });
      } else {
        const defaultPath = role === 'provider' 
          ? '/provider-dashboard'
          : role === 'admin'
          ? '/admin-dashboard'
          : '/customer-dashboard';
        navigate(defaultPath, { replace: true });
      }

      toast.success('Successfully logged in!');
    } catch (error) {
      toast.error('Failed to login. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate('/', { replace: true });
    toast.success('Successfully logged out!');
  };

  const register = async (email: string, password: string, role: 'customer' | 'provider' | 'admin') => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = {
        id: '1',
        name: 'John Doe',
        email,
        role
      };

      setIsAuthenticated(true);
      setUser(user);

      const state = location.state as { redirectTo?: string; bookingData?: any };
      
      if (state?.bookingData) {
        navigate('/booking-confirmation', { 
          state: { booking: state.bookingData },
          replace: true
        });
      } else {
        const defaultPath = role === 'provider' 
          ? '/provider-dashboard'
          : role === 'admin'
          ? '/admin-dashboard'
          : '/customer-dashboard';
        navigate(defaultPath, { replace: true });
      }

      toast.success('Successfully registered!');
    } catch (error) {
      toast.error('Failed to register. Please try again.');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};