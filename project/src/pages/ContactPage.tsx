import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function ContactPage() {
  return (
    <main className="bg-white">
      <div className="container mx-auto px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Get in Touch</h1>
            <p className="mt-4 text-lg text-gray-600">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            
            <form className="mt-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="lg:pl-12">
            <div className="rounded-lg bg-gray-50 p-8">
              <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
              <div className="mt-6 space-y-4">
                <ContactInfo
                  icon={<Mail className="h-6 w-6" />}
                  title="Email"
                  detail="support@appointease.com"
                />
                <ContactInfo
                  icon={<Phone className="h-6 w-6" />}
                  title="Phone"
                  detail="+1 (555) 123-4567"
                />
                <ContactInfo
                  icon={<MapPin className="h-6 w-6" />}
                  title="Address"
                  detail="123 Business Street, Suite 100, New York, NY 10001"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ContactInfo({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return (
    <div className="flex items-start">
      <div className="text-blue-600">{icon}</div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-gray-600">{detail}</p>
      </div>
    </div>
  );
}