import { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Settings,
  Shield,
  AlertCircle,
  X
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter
} from 'recharts';
import { toast } from 'react-hot-toast';

const mockData = {
  revenue: [
    { month: 'Jan', value: 12000 },
    { month: 'Feb', value: 15000 },
    { month: 'Mar', value: 18000 },
    { month: 'Apr', value: 16000 },
    { month: 'May', value: 21000 },
    { month: 'Jun', value: 19000 }
  ],
  providers: [
    { month: 'Jan', value: 25 },
    { month: 'Feb', value: 28 },
    { month: 'Mar', value: 32 },
    { month: 'Apr', value: 35 },
    { month: 'May', value: 40 },
    { month: 'Jun', value: 45 }
  ]
};

const mockSecurityLogs = [
  { id: 1, event: 'Login attempt', user: 'admin@example.com', status: 'success', timestamp: '2024-03-05 10:30:00' },
  { id: 2, event: 'Password change', user: 'provider@example.com', status: 'success', timestamp: '2024-03-05 11:15:00' },
  { id: 3, event: 'Failed login', user: 'unknown@example.com', status: 'failed', timestamp: '2024-03-05 12:00:00' }
];

export function AdminDashboard() {
  const [showSecurityLogs, setShowSecurityLogs] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const stats = [
    {
      id: 'providers',
      label: 'Total Providers',
      value: '45',
      change: '+12%',
      icon: <Users className="h-5 w-5" />
    },
    {
      id: 'revenue',
      label: 'Total Revenue',
      value: '$89,240',
      change: '+23%',
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      id: 'bookings',
      label: 'Total Bookings',
      value: '1,234',
      change: '+18%',
      icon: <Calendar className="h-5 w-5" />
    },
    {
      id: 'growth',
      label: 'Monthly Growth',
      value: '15%',
      change: '+5%',
      icon: <TrendingUp className="h-5 w-5" />
    }
  ];

  const SecurityLogsModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl rounded-lg bg-white p-6">
        <button
          onClick={() => setShowSecurityLogs(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold">Security Logs</h2>
        <div className="mt-6">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockSecurityLogs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{log.event}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{log.user}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const SettingsModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-6">
        <button
          onClick={() => setShowSettings(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold">Platform Settings</h2>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium">General Settings</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Platform Name
                </label>
                <input
                  type="text"
                  defaultValue="AppointEase"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Support Email
                </label>
                <input
                  type="email"
                  defaultValue="support@appointease.com"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Security Settings</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                </div>
                <div className="relative inline-block w-10 select-none">
                  <input type="checkbox" className="toggle-checkbox absolute block h-6 w-6 cursor-pointer appearance-none rounded-full border-4 border-gray-300 bg-white checked:right-0 checked:border-blue-500" />
                  <label className="toggle-label block h-6 w-10 cursor-pointer overflow-hidden rounded-full bg-gray-300 checked:bg-blue-500"></label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast.success('Settings saved successfully');
              setShowSettings(false);
            }}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Platform overview and management</p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => setShowSecurityLogs(true)}>
              <Shield className="mr-2 h-4 w-4" />
              Security Logs
            </Button>
            <Button variant="outline" onClick={() => setShowSettings(true)}>
              <Settings className="mr-2 h-4 w-4" />
              Platform Settings
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="rounded-lg border bg-white p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                {stat.icon}
              </div>
              <div className="mt-2 flex items-baseline">
                <div className="text-2xl font-semibold">{stat.value}</div>
                <span className="ml-2 text-sm text-green-600">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Revenue Chart */}
          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-lg font-medium">Revenue Overview</h2>
            <div className="mt-4 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.revenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0088FE" 
                    name="Revenue ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Providers Growth */}
          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-lg font-medium">Service Providers Growth</h2>
            <div className="mt-4 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.providers}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    fill="#00C49F" 
                    name="Active Providers"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="rounded-lg border bg-white">
            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-medium">Recent Activity</h2>
            </div>
            <div className="divide-y">
              <ActivityItem
                icon={<Users className="h-5 w-5" />}
                title="New Service Provider Registration"
                description="Beauty Salon XYZ joined the platform"
                time="5 minutes ago"
                type="success"
              />
              <ActivityItem
                icon={<AlertCircle className="h-5 w-5" />}
                title="Customer Support Ticket"
                description="Payment issue reported by user #12345"
                time="1 hour ago"
                type="warning"
              />
              <ActivityItem
                icon={<DollarSign className="h-5 w-5" />}
                title="Large Transaction"
                description="$500+ booking completed"
                time="2 hours ago"
                type="info"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showSecurityLogs && <SecurityLogsModal />}
      {showSettings && <SettingsModal />}
    </div>
  );
}

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  type: 'success' | 'warning' | 'info';
}

function ActivityItem({ icon, title, description, time, type }: ActivityItemProps) {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-600';
      case 'warning':
        return 'bg-yellow-100 text-yellow-600';
      case 'info':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex items-center px-6 py-4">
      <div className={`rounded-full p-2 ${getTypeStyles()}`}>
        {icon}
      </div>
      <div className="ml-4 flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <span className="text-sm text-gray-500">{time}</span>
    </div>
  );
}