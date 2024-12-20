import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'provider'>('customer');
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.redirectTo || '/';
  const bookingData = location.state?.bookingData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, role);
      }
      
      if (bookingData) {
        navigate('/booking-confirmation', { state: { booking: bookingData } });
      } else {
        navigate(redirectTo);
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">{isLogin ? 'Sign In' : 'Create Account'}</h1>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Account Type</label>
              <div className="mt-1 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="customer"
                    checked={role === 'customer'}
                    onChange={(e) => setRole(e.target.value as 'customer' | 'provider')}
                    className="mr-2"
                  />
                  Customer
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="provider"
                    checked={role === 'provider'}
                    onChange={(e) => setRole(e.target.value as 'customer' | 'provider')}
                    className="mr-2"
                  />
                  Service Provider
                </label>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full">
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? 'Create one' : 'Sign in'}
          </button>
        </p>
      </div>
    </main>
  );
}