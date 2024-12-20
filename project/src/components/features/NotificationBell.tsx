import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '../ui/Button';

interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
}

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      message: 'Upcoming appointment in 1 hour',
      time: '1 hour ago',
      read: false
    },
    {
      id: '2',
      message: 'Your booking has been confirmed',
      time: '2 hours ago',
      read: false
    }
  ]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900"
      >
        <Bell className="h-6 w-6" />
        {notifications.some(n => !n.read) && (
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-lg border bg-white p-4 shadow-lg">
          <h3 className="font-semibold">Notifications</h3>
          <div className="mt-2 space-y-2">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`rounded-md p-2 ${
                  notification.read ? 'bg-gray-50' : 'bg-blue-50'
                }`}
              >
                <p className="text-sm">{notification.message}</p>
                <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 w-full"
            onClick={() => setIsOpen(false)}
          >
            Mark all as read
          </Button>
        </div>
      )}
    </div>
  );
}