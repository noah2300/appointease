import { useState } from 'react';
import { Calendar, Clock, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../components/ui/Button';
import type { BookingDetails } from '../types/booking';

// Mock data - replace with actual API call
const mockBookings: BookingDetails[] = [
  {
    id: '1',
    serviceTitle: 'Haircut',
    date: new Date(),
    time: '10:00',
    duration: 60,
    price: 50,
    status: 'confirmed'
  },
  {
    id: '2',
    serviceTitle: 'Massage',
    date: new Date(Date.now() + 86400000),
    time: '14:00',
    duration: 90,
    price: 80,
    status: 'pending'
  }
];

export function BookingsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [bookings] = useState<BookingDetails[]>(mockBookings);

  const filteredBookings = bookings.filter(booking => {
    const isUpcoming = new Date(`${format(booking.date, 'yyyy-MM-dd')} ${booking.time}`) > new Date();
    return activeTab === 'upcoming' ? isUpcoming : !isUpcoming;
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">My Bookings</h1>

      <div className="mt-6 flex space-x-4 border-b">
        <button
          className={`pb-2 ${
            activeTab === 'upcoming'
              ? 'border-b-2 border-blue-500 font-medium text-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`pb-2 ${
            activeTab === 'past'
              ? 'border-b-2 border-blue-500 font-medium text-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('past')}
        >
          Past
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {filteredBookings.map(booking => (
          <div
            key={booking.id}
            className="rounded-lg border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{booking.serviceTitle}</h3>
              <span className={`rounded-full px-3 py-1 text-sm ${
                booking.status === 'confirmed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm">
                  {format(booking.date, 'MMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm">
                  {booking.time} ({booking.duration}min)
                </span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm">${booking.price}</span>
              </div>
            </div>

            {activeTab === 'upcoming' && (
              <div className="mt-4 flex space-x-4">
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                  Cancel
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}