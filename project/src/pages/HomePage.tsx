import { ArrowRight, Calendar, Shield, Bell } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate('/search');
  };

  const handleJoinAsProvider = () => {
    navigate('/auth', { state: { isProvider: true } });
  };

  return (
    <main>
      <section className="relative bg-white">
        <div className="container mx-auto px-4 py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Book Appointments Anytime, Anywhere!
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Connect with local service providers in just a few clicks. Schedule appointments
                with ease and manage your time efficiently.
              </p>
              <div className="mt-8 flex gap-4">
                <Button size="lg" onClick={handleBookAppointment}>
                  Book an Appointment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" onClick={handleJoinAsProvider}>
                  Join as Provider
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Booking Platform"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            Why Choose AppointEase?
          </h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Calendar className="h-8 w-8 text-blue-600" />}
              title="Real-time Calendar"
              description="See available slots instantly and book appointments that work for your schedule."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-blue-600" />}
              title="Secure Payments"
              description="Your transactions are protected with bank-level security measures."
            />
            <FeatureCard
              icon={<Bell className="h-8 w-8 text-blue-600" />}
              title="Smart Reminders"
              description="Never miss an appointment with automated email and SMS reminders."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-lg bg-white p-8 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}