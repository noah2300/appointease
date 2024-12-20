import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { ServiceRating } from '../../components/features/ServiceRating';

const mockCustomers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234-567-8900',
    totalBookings: 12,
    totalSpent: 750,
    lastVisit: '2024-03-01',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 234-567-8901',
    totalBookings: 8,
    totalSpent: 520,
    lastVisit: '2024-02-28',
    rating: 4.5
  }
];

export function CustomersTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="recent">Most Recent</option>
            <option value="bookings">Most Bookings</option>
            <option value="spent">Highest Spent</option>
            <option value="rating">Highest Rated</option>
          </select>
          <Button>
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                  <div className="text-sm text-gray-500">{customer.email}</div>
                  <div className="text-sm text-gray-500">{customer.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{customer.totalBookings}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">${customer.totalSpent}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{customer.lastVisit}</div>
                </td>
                <td className="px-6 py-4">
                  <ServiceRating rating={customer.rating} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button variant="outline" size="sm">Message</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}