import { useState } from 'react';
import { 
  BarChart2,
  Calendar,
  Users,
  MessageSquare,
  Bell,
  FileText,
  Gift,
  Wrench,
  HelpCircle,
  Settings,
  DollarSign,
  Star
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { BookingsTab } from './dashboard/BookingsTab';
import { CustomersTab } from './dashboard/CustomersTab';
import { AnalyticsTab } from './dashboard/AnalyticsTab';
import { MessagesTab } from './dashboard/MessagesTab';
import { NotificationsTab } from './dashboard/NotificationsTab';
import { DocumentsTab } from './dashboard/DocumentsTab';
import { PromotionsTab } from './dashboard/PromotionsTab';
import { ServicesTab } from './dashboard/ServicesTab';
import { SupportTab } from './dashboard/SupportTab';
import { SettingsTab } from './dashboard/SettingsTab';

type TabId = 'overview' | 'bookings' | 'customers' | 'analytics' | 'messages' | 
             'notifications' | 'documents' | 'promotions' | 'services' | 'support' | 'settings';

interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

const tabs: TabConfig[] = [
  { id: 'overview', label: 'Overview', icon: <BarChart2 className="h-5 w-5" /> },
  { id: 'bookings', label: 'Bookings', icon: <Calendar className="h-5 w-5" />, count: 12 },
  { id: 'customers', label: 'Customers', icon: <Users className="h-5 w-5" />, count: 856 },
  { id: 'analytics', label: 'Analytics', icon: <BarChart2 className="h-5 w-5" /> },
  { id: 'messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" />, count: 3 },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" />, count: 5 },
  { id: 'documents', label: 'Documents', icon: <FileText className="h-5 w-5" /> },
  { id: 'promotions', label: 'Promotions', icon: <Gift className="h-5 w-5" /> },
  { id: 'services', label: 'Services', icon: <Wrench className="h-5 w-5" /> },
  { id: 'support', label: 'Support', icon: <HelpCircle className="h-5 w-5" /> },
  { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> }
];

export function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const stats = [
    { 
      id: 'bookings',
      label: 'Total Bookings',
      value: '1,234',
      change: '+12.5%',
      icon: <Calendar className="h-5 w-5" />
    },
    {
      id: 'customers',
      label: 'Active Customers',
      value: '856',
      change: '+5.2%',
      icon: <Users className="h-5 w-5" />
    },
    {
      id: 'revenue',
      label: 'Revenue',
      value: '$12,345',
      change: '+8.1%',
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      id: 'rating',
      label: 'Average Rating',
      value: '4.8',
      change: '+0.3%',
      icon: <Star className="h-5 w-5" />
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.id} className="rounded-lg border bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                    {stat.icon}
                  </div>
                  <div className="mt-2 flex items-baseline">
                    <div className="text-2xl font-semibold">{stat.value}</div>
                    <span className={`ml-2 text-sm ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <AnalyticsTab />
          </div>
        );
      case 'bookings':
        return <BookingsTab />;
      case 'customers':
        return <CustomersTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'messages':
        return <MessagesTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'documents':
        return <DocumentsTab />;
      case 'promotions':
        return <PromotionsTab />;
      case 'services':
        return <ServicesTab />;
      case 'support':
        return <SupportTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Provider Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span className="ml-2">Online</span>
            </Button>
            <Button>
              Add New Service
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Sidebar Navigation */}
          <nav className="mb-8 w-full lg:mb-0 lg:w-64 lg:flex-shrink-0">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center">
                    {tab.icon}
                    <span className="ml-3">{tab.label}</span>
                  </div>
                  {tab.count && (
                    <span className={`rounded-full px-2 py-1 text-xs ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 lg:pl-8">
            {renderTabContent()}
          </main>
        </div>
      </div>
    </div>
  );
}