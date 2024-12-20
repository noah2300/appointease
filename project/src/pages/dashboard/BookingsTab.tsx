import { useState } from 'react';
import { Search, Plus, Eye, Edit2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { format } from 'date-fns';
import { BookingDetailsModal } from '../../components/features/BookingDetailsModal';

const mockBookings = [
  {
    id: '1',
    serviceTitle: 'Haircut',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    date: new Date(),
    time: '10:00',
    duration: 60,
    price: 50,
    status: 'confirmed',
    notes: 'First time customer'
  },
  {
    id: '2',
    serviceTitle: 'Massage',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    date: new Date(),
    time: '14:00',
    duration: 90,
    price: 80,
    status: 'pending',
    notes: 'Prefers female therapist'
  }
];

export function BookingsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const filteredBookings = mockBookings.filter(booking => 
    (filterStatus === 'all' || booking.status === filterStatus) &&
    booking.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Booking
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{booking.serviceTitle}</div>
                  <div className="text-sm text-gray-500">${booking.price}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{booking.customerName}</div>
                  <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{format(booking.date, 'MMM d, yyyy')}</div>
                  <div className="text-sm text-gray-500">{booking.time}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : booking.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewBooking(booking)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBooking && (
        <BookingDetailsModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          booking={selectedBooking}
        />
      )}
    </div>
  );
}