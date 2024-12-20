import { useState } from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const mockNotifications = [
  {
    id: '1',
    title: 'New Booking Request',
    message: 'John Doe requested a haircut appointment for tomorrow at 2 PM',
    time: '5 minutes ago',
    type: 'booking',
    read: false
  },
  {
    id: '2',
    title: 'Review Received',
    message: 'Jane Smith left a 5-star review for your service',
    time: '1 hour ago',
    type: 'review',
    read: false
  },
  {
    id: '3',
    title: 'Payment Received',
    message: 'Payment of $50 received for Haircut service',
    time: '2 hours ago',
    type: 'payment',
    read: true
  }
];

export function NotificationsTab() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <Button variant="outline" onClick={markAllAsRead}>
          <Check className="mr-2 h-4 w-4" />
          Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`rounded-lg border p-4 ${
              notification.read ? 'bg-white' : 'bg-blue-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`mt-1 rounded-full p-2 ${
                  notification.type === 'booking' ? 'bg-blue-100' :
                  notification.type === 'review' ? 'bg-green-100' :
                  'bg-yellow-100'
                }`}>
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                  <span className="mt-2 text-xs text-gray-500">{notification.time}</span>
                </div>
              </div>
              <button
                onClick={() => deleteNotification(notification.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}