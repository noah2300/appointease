import { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface BusinessHours {
  day: string;
  start: string;
  end: string;
  closed: boolean;
}

const initialBusinessHours: BusinessHours[] = [
  { day: 'Monday', start: '09:00', end: '17:00', closed: false },
  { day: 'Tuesday', start: '09:00', end: '17:00', closed: false },
  { day: 'Wednesday', start: '09:00', end: '17:00', closed: false },
  { day: 'Thursday', start: '09:00', end: '17:00', closed: false },
  { day: 'Friday', start: '09:00', end: '17:00', closed: false },
  { day: 'Saturday', start: '10:00', end: '15:00', closed: false },
  { day: 'Sunday', start: '10:00', end: '15:00', closed: true },
];

export function SettingsTab() {
  const [businessName, setBusinessName] = useState('My Business');
  const [email, setEmail] = useState('business@example.com');
  const [phone, setPhone] = useState('+1 234-567-8900');
  const [address, setAddress] = useState('123 Business St, City, State');
  const [businessHours, setBusinessHours] = useState<BusinessHours[]>(initialBusinessHours);

  const handleSave = () => {
    // Handle saving settings
    console.log('Settings saved');
  };

  const handleBusinessHourChange = (index: number, field: keyof BusinessHours, value: string | boolean) => {
    const newHours = [...businessHours];
    newHours[index] = { ...newHours[index], [field]: value };
    setBusinessHours(newHours);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Settings</h2>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="space-y-6">
        {/* Business Information */}
        <div className="rounded-lg border bg-white p-6">
          <h3 className="text-lg font-medium">Business Information</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="rounded-lg border bg-white p-6">
          <h3 className="text-lg font-medium">Business Hours</h3>
          <div className="mt-4 space-y-4">
            {businessHours.map((hours, index) => (
              <div key={hours.day} className="flex items-center space-x-4">
                <div className="w-24">
                  <span className="font-medium">{hours.day}</span>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={hours.closed}
                    onChange={(e) => handleBusinessHourChange(index, 'closed', e.target.checked)}
                    className="mr-2"
                  />
                  Closed
                </label>
                {!hours.closed && (
                  <>
                    <input
                      type="time"
                      value={hours.start}
                      onChange={(e) => handleBusinessHourChange(index, 'start', e.target.value)}
                      className="rounded-md border border-gray-300 px-2 py-1"
                    />
                    <span>to</span>
                    <input
                      type="time"
                      value={hours.end}
                      onChange={(e) => handleBusinessHourChange(index, 'end', e.target.value)}
                      className="rounded-md border border-gray-300 px-2 py-1"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}