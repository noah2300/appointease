import { useState } from 'react';
import { 
  BarChart, 
  LineChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Scatter,
  ScatterChart
} from 'recharts';

const monthlyData = [
  { month: 'Jan', revenue: 4000, bookings: 24 },
  { month: 'Feb', revenue: 3000, bookings: 18 },
  { month: 'Mar', revenue: 5000, bookings: 29 },
  { month: 'Apr', revenue: 4500, bookings: 26 },
  { month: 'May', revenue: 6000, bookings: 35 },
  { month: 'Jun', revenue: 5500, bookings: 32 }
];

const serviceData = [
  { name: 'Haircut', value: 400 },
  { name: 'Massage', value: 300 },
  { name: 'Spa', value: 200 },
  { name: 'Facial', value: 100 }
];

const scatterData = [
  { bookings: 20, revenue: 3000, date: '2024-01' },
  { bookings: 25, revenue: 3500, date: '2024-02' },
  { bookings: 30, revenue: 4000, date: '2024-03' },
  { bookings: 35, revenue: 4500, date: '2024-04' },
  { bookings: 40, revenue: 5000, date: '2024-05' }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function AnalyticsTab() {
  const [timeRange, setTimeRange] = useState('6months');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Analytics Overview</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Chart */}
        <div className="rounded-lg border bg-white p-4">
          <h3 className="mb-4 text-lg font-medium">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#0088FE" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bookings Chart */}
        <div className="rounded-lg border bg-white p-4">
          <h3 className="mb-4 text-lg font-medium">Bookings Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Service Distribution */}
        <div className="rounded-lg border bg-white p-4">
          <h3 className="mb-4 text-lg font-medium">Service Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue vs Bookings Scatter Plot */}
        <div className="rounded-lg border bg-white p-4">
          <h3 className="mb-4 text-lg font-medium">Revenue vs Bookings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bookings" name="Bookings" />
              <YAxis dataKey="revenue" name="Revenue" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Revenue vs Bookings" data={scatterData} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}