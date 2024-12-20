import { useState } from 'react';
import { Calendar, Clock, Star, CreditCard, User, Settings } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ServiceRating } from '../components/features/ServiceRating';
import { format } from 'date-fns';

const mockUpcomingBookings = [
  {
    id: '1',
    serviceTitle: 'Haircut',
    provider: 'Style Studio',
    date: new Date(),
    time: '10:00',
    price: 50,
    status: 'confirmed'
  },
  {
    id: '2',
    serviceTitle: 'Massage',
    provider: 'Wellness Spa',
    date: new Date(Date.now() + 86400000),
    time: '14:00',
    price: 80,
    status: 'pending'
  }
];

export function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      id: 'bookings',
      label: 'Total Bookings',
      value: '8',
      icon: <Calendar className="h-5 w-5" />
    },
    {
      id: 'spent',
      label: 'Total Spent',
      value: '$420',
      icon: <CreditCard className="h-5 w-5" />
    },
    {
      id: 'rating',
      label: 'Average Rating',
      value: '4.8',
      icon: <Star className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Customer Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's an overview of your bookings and activity.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="rounded-lg border bg-white p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                {stat.icon}
              </div>
              <div className="mt-2 text-2xl font-semibold">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="flex space-x-4 border-b">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 ${
                activeTab === 'overview'
                  ? 'border-b-2 border-blue-500 font-medium text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`pb-2 ${
                activeTab === 'bookings'
                  ? 'border-b-2 border-blue-500 font-medium text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-2 ${
                activeTab === 'profile'
                  ? 'border-b-2 border-blue-500 font-medium text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              Profile
            </button>
          </div>

          <div className="mt-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="rounded-lg border bg-white p-6">
                  <h2 className="text-lg font-medium">Upcoming Appointments</h2>
                  <div className="mt-4 space-y-4">
                    {mockUpcomingBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div>
                          <h3 className="font-medium">{booking.serviceTitle}</h3>
                          <p className="text-sm text-gray-600">{booking.provider}</p>
                          <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>{format(booking.date, 'MMM d, yyyy')}</span>
                            <Clock className="h-4 w-4" />
                            <span>{booking.time}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-medium">${booking.price}</div>
                          <span className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-medium ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      View All Bookings
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border bg-white p-6">
                  <h2 className="text-lg font-medium">Recent Reviews</h2>
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Style Studio</h3>
                        <p className="text-sm text-gray-600">Haircut Service</p>
                      </div>
                      <ServiceRating rating={5} />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      Great service! Very professional and friendly staff.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="rounded-lg border bg-white">
                {/* Bookings content */}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="rounded-lg border bg-white p-6">
                <h2 className="text-lg font-medium">Profile Settings</h2>
                <div className="mt-4 grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
                      defaultValue="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
                      defaultValue="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
                      defaultValue="+1 234-567-8900"
                    />
                  </div>
                  <Button className="mt-4">
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}