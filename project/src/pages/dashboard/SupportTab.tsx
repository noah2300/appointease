import { useState } from 'react';
import { MessageCircle, HelpCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const faqs = [
  {
    question: 'How do I set up online payments?',
    answer: 'Go to Settings > Payments to configure your payment methods and preferences.'
  },
  {
    question: 'How can I manage my calendar availability?',
    answer: 'Navigate to Settings > Calendar to set your working hours and blocked times.'
  },
  {
    question: 'How do I handle cancellations?',
    answer: 'You can set your cancellation policy in Settings > Policies.'
  }
];

export function SupportTab() {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission
    console.log('Ticket submitted:', { ticketSubject, ticketMessage });
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Support Ticket Form */}
        <div className="rounded-lg border bg-white p-6">
          <h2 className="flex items-center text-lg font-semibold">
            <MessageCircle className="mr-2 h-5 w-5" />
            Contact Support
          </h2>
          <form onSubmit={handleSubmitTicket} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Brief description of your issue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Detailed description of your issue"
              />
            </div>
            <Button type="submit" className="w-full">
              Submit Ticket
            </Button>
          </form>
        </div>

        {/* FAQs */}
        <div className="rounded-lg border bg-white p-6">
          <h2 className="flex items-center text-lg font-semibold">
            <HelpCircle className="mr-2 h-5 w-5" />
            Frequently Asked Questions
          </h2>
          <div className="mt-4 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <h4 className="font-medium">{faq.question}</h4>
                <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}