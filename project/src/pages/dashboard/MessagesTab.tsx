import { useState } from 'react';
import { Search, Send } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const mockMessages = [
  {
    id: '1',
    sender: 'John Doe',
    content: 'Hi, I need to reschedule my appointment.',
    timestamp: '10:30 AM',
    unread: true
  },
  {
    id: '2',
    sender: 'Jane Smith',
    content: 'Thanks for the great service!',
    timestamp: 'Yesterday',
    unread: false
  }
];

export function MessagesTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  return (
    <div className="h-[calc(100vh-12rem)] rounded-lg border bg-white">
      <div className="flex h-full">
        {/* Messages List */}
        <div className="w-1/3 border-r">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="divide-y">
            {mockMessages.map((message) => (
              <button
                key={message.id}
                onClick={() => setSelectedMessage(message.id)}
                className={`w-full p-4 text-left hover:bg-gray-50 ${
                  selectedMessage === message.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{message.sender}</span>
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600 truncate">{message.content}</p>
                {message.unread && (
                  <span className="mt-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Message Content */}
        <div className="flex flex-1 flex-col">
          {selectedMessage ? (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                {/* Message history would go here */}
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="rounded-lg bg-gray-100 px-4 py-2">
                      <p className="text-sm">Hi, I need to reschedule my appointment.</p>
                      <span className="mt-1 text-xs text-gray-500">10:30 AM</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="rounded-lg bg-blue-100 px-4 py-2">
                      <p className="text-sm">Sure, I can help you with that. When would you like to reschedule?</p>
                      <span className="mt-1 text-xs text-gray-500">10:35 AM</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  />
                  <Button>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}