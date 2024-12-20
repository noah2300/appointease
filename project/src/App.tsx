import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AuthPage } from './pages/AuthPage';
import { BookingsPage } from './pages/BookingsPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
import { ProviderDashboard } from './pages/ProviderDashboard';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PageTransition } from './components/ui/PageTransition';
import { Toast } from './components/ui/Toast';

export function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
              <Route path="/search" element={<PageTransition><SearchPage /></PageTransition>} />
              <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
              <Route path="/auth" element={<PageTransition><AuthPage /></PageTransition>} />
              
              {/* Protected Customer Routes */}
              <Route 
                path="/customer-dashboard" 
                element={
                  <ProtectedRoute role="customer">
                    <PageTransition><CustomerDashboard /></PageTransition>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/bookings" 
                element={
                  <ProtectedRoute role="customer">
                    <PageTransition><BookingsPage /></PageTransition>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/booking-confirmation" 
                element={
                  <ProtectedRoute role="customer">
                    <PageTransition><BookingConfirmationPage /></PageTransition>
                  </ProtectedRoute>
                } 
              />

              {/* Protected Provider Routes */}
              <Route 
                path="/provider-dashboard" 
                element={
                  <ProtectedRoute role="provider">
                    <PageTransition><ProviderDashboard /></PageTransition>
                  </ProtectedRoute>
                } 
              />

              {/* Protected Admin Routes */}
              <Route 
                path="/admin-dashboard" 
                element={
                  <ProtectedRoute role="admin">
                    <PageTransition><AdminDashboard /></PageTransition>
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </AnimatePresence>
          <Toast />
        </div>
      </AuthProvider>
    </Router>
  );
}