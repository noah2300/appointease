import { useLocation, Navigate } from 'react-router-dom';
import { Check, Calendar, Clock, DollarSign, Download, Share } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

export function BookingConfirmationPage() {
  const location = useLocation();
  const booking = location.state?.booking;
  const { user } = useAuth();

  if (!booking) {
    return <Navigate to="/" replace />;
  }

  const handleDownloadReceipt = () => {
    // Create receipt content
    const receiptContent = `
      AppointEase Receipt
      ------------------
      Service: ${booking.serviceTitle}
      Date: ${format(new Date(booking.date), 'MMMM d, yyyy')}
      Time: ${booking.time}
      Duration: ${booking.duration} minutes
      Price: $${booking.price}
      Status: ${booking.status}
      
      Customer: ${user?.name || 'Guest'}
      Booking ID: ${booking.id}
      
      Thank you for your business!
    `;

    // Create blob and download
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${booking.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success('Receipt downloaded successfully!');
  };

  const handleAddToCalendar = () => {
    const startTime = new Date(`${format(new Date(booking.date), 'yyyy-MM-dd')}T${booking.time}`);
    const endTime = new Date(startTime.getTime() + booking.duration * 60000);
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(booking.serviceTitle)}&dates=${startTime.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${endTime.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&details=${encodeURIComponent(`Appointment at AppointEase\nPrice: $${booking.price}`)}`;
    
    window.open(calendarUrl, '_blank');
    toast.success('Opening calendar...');
  };

  const handleViewDashboard = () => {
    const dashboardPath = user?.role === 'provider' ? '/provider-dashboard' : '/customer-dashboard';
    window.location.href = dashboardPath;
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-lg border bg-white p-8 shadow-sm">
        <div className="flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
        </div>
        
        <h1 className="mt-4 text-center text-2xl font-bold text-gray-900">
          Booking Confirmed!
        </h1>
        
        <p className="mt-2 text-center text-gray-600">
          Your appointment has been successfully scheduled
        </p>

        <div className="mt-8 space-y-4 rounded-lg bg-gray-50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="ml-2">Date</span>
            </div>
            <span className="font-medium">
              {format(new Date(booking.date), 'MMMM d, yyyy')}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="ml-2">Time</span>
            </div>
            <span className="font-medium">{booking.time} ({booking.duration} min)</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <span className="ml-2">Price</span>
            </div>
            <span className="font-medium">${booking.price}</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={handleDownloadReceipt}>
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </Button>
          <Button variant="outline" onClick={handleAddToCalendar}>
            <Calendar className="mr-2 h-4 w-4" />
            Add to Calendar
          </Button>
        </div>

        <div className="mt-8 flex justify-center">
          <Button onClick={handleViewDashboard}>
            View My Dashboard
          </Button>
        </div>
      </div>
    </main>
  );
}