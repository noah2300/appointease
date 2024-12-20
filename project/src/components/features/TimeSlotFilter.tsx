import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { format, addDays } from 'date-fns';

interface TimeSlotFilterProps {
  onSelectionChange: (slots: string[]) => void;
}

export function TimeSlotFilter({ onSelectionChange }: TimeSlotFilterProps) {
  const [selectedDate, setSelectedDate] = useState<string>('today');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  const dates = [
    { id: 'today', label: 'Today', date: new Date() },
    { id: 'tomorrow', label: 'Tomorrow', date: addDays(new Date(), 1) },
    { id: 'next2days', label: format(addDays(new Date(), 2), 'EEE, MMM d'), date: addDays(new Date(), 2) },
    { id: 'next3days', label: format(addDays(new Date(), 3), 'EEE, MMM d'), date: addDays(new Date(), 3) }
  ];

  const timeSlots = [
    { id: 'morning', label: 'Morning', time: '6:00 - 12:00' },
    { id: 'afternoon', label: 'Afternoon', time: '12:00 - 17:00' },
    { id: 'evening', label: 'Evening', time: '17:00 - 22:00' }
  ];

  const handleDateChange = (dateId: string) => {
    setSelectedDate(dateId);
    onSelectionChange([dateId, selectedTimeSlot]);
  };

  const handleTimeSlotChange = (slotId: string) => {
    setSelectedTimeSlot(slotId);
    onSelectionChange([selectedDate, slotId]);
  };

  return (
    <div className="border-b border-gray-200 py-4">
      <h3 className="font-semibold text-gray-900">Availability</h3>
      
      <div className="mt-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="mr-2 h-4 w-4" />
          <span>Select Date</span>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {dates.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleDateChange(id)}
              className={`rounded-md border p-2 text-sm transition-colors ${
                selectedDate === id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-blue-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="mr-2 h-4 w-4" />
          <span>Select Time</span>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {timeSlots.map(({ id, label, time }) => (
            <button
              key={id}
              onClick={() => handleTimeSlotChange(id)}
              className={`rounded-md border p-2 text-sm transition-colors ${
                selectedTimeSlot === id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-blue-500'
              }`}
            >
              <div className="font-medium">{label}</div>
              <div className="text-xs text-gray-500">{time}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}