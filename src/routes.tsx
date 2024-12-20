import { Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import BookingConfirmationPage from './pages/BookingConfirmationPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
    </Routes>
  )
}

export default AppRoutes
