import { Building, Users, Target } from 'lucide-react';

export function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              About AppointEase
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              We're on a mission to simplify appointment booking for businesses and customers alike.
              Our platform connects service providers with clients, making scheduling seamless and efficient.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <ValueCard
              icon={<Users className="h-8 w-8" />}
              title="Customer First"
              description="We prioritize user experience and satisfaction in everything we do."
            />
            <ValueCard
              icon={<Building className="h-8 w-8" />}
              title="Reliability"
              description="Our platform is built on trust and consistent performance."
            />
            <ValueCard
              icon={<Target className="h-8 w-8" />}
              title="Innovation"
              description="We continuously improve our platform with the latest technology."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="text-blue-600">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}