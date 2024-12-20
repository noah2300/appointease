import { X, Calendar, Clock, DollarSign, User, Mail, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
}

export function BookingDetailsModal({ isOpen, onClose, booking }: BookingDetailsModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleDownloadReceipt = () => {
    // Create receipt content
    const receiptContent = `
      AppointEase Receipt
      ------------------
      Service: ${booking.serviceTitle}
      Date: ${format(new Date(booking.date), 'MMMM d, yyyy')}
      Time: ${booking.time}
      Duration: ${booking.duration} minutes
      Price: $${booking.price}
      Status: ${booking.status}
      
      Customer: ${booking.customerName}
      Booking ID: ${booking.id}
      
      Thank you for your business!
    `;

    // Create blob and download
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${booking.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success('Receipt downloaded successfully!');
  };

  const handleSendReminder = () => {
    toast.success('Reminder sent to customer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold">Booking Details</h2>
        <div className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-medium">Service Information</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center text-gray-600">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{format(new Date(booking.date), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{booking.time} ({booking.duration} min)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span>${booking.price}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium">Customer Information</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center text-gray-600">
                  <User className="mr-2 h-4 w-4" />
                  <span>{booking.customerName}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>{booking.customerEmail}</span>
                </div>
              </div>
            </div>
          </div>

          {booking.notes && (
            <div>
              <h3 className="font-medium">Notes</h3>
              <div className="mt-2 rounded-md bg-gray-50 p-3">
                <div className="flex items-start">
                  <FileText className="mr-2 h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-600">{booking.notes}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={handleDownloadReceipt}>
              Download Receipt
            </Button>
            <Button onClick={handleSendReminder}>
              Send Reminder
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}