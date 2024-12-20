import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, X, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
  price: number;
}

export function BookingModal({ isOpen, onClose, serviceTitle, price }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [duration, setDuration] = useState(60);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const timeSlots = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
  ];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTime || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        id: Math.random().toString(36).substr(2, 9),
        serviceTitle,
        date: selectedDate,
        time: selectedTime,
        duration,
        price,
        status: 'pending',
        notes,
        customerName: user?.name || 'Guest',
        customerEmail: user?.email || '',
        createdAt: new Date().toISOString()
      };

      if (!isAuthenticated) {
        navigate('/auth', { 
          state: { 
            redirectTo: '/booking-confirmation',
            bookingData
          }
        });
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate to confirmation page with booking details
      navigate('/booking-confirmation', { 
        state: { booking: bookingData },
        replace: true 
      });

      toast.success('Booking confirmed successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold">Book Appointment</h2>
        <p className="mt-2 text-gray-600">{serviceTitle}</p>

        <form onSubmit={handleBooking} className="mt-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              <CalendarIcon className="mr-2 inline-block h-5 w-5" />
              Select Date
            </label>
            <input
              type="date"
              value={format(selectedDate, 'yyyy-MM-dd')}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
              min={format(new Date(), 'yyyy-MM-dd')}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              <Clock className="mr-2 inline-block h-5 w-5" />
              Select Time
            </label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  type="button"
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`rounded-md border p-2 text-sm ${
                    selectedTime === time
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-500'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
              required
            >
              <option value={30}>30 minutes</option>
              <option value={60}>60 minutes</option>
              <option value={90}>90 minutes</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <div className="mt-1 flex items-center rounded-md border border-gray-300 px-4 py-2">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <span className="ml-2">{price.toFixed(2)}</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
              rows={3}
              placeholder="Any special requests or notes for the service provider"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !selectedTime}
          >
            {isSubmitting ? 'Processing...' : 'Confirm Booking'}
          </Button>
        </form>
      </div>
    </div>
  );
}